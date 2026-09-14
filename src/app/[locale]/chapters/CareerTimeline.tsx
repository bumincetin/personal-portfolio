'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform, type MotionStyle, type MotionValue } from 'motion/react';
import { ArrowDown, ArrowLeft, ArrowRight, MapPin, MoveHorizontal } from 'lucide-react';
import type { Chapter } from '@/lib/story';
import type { ExperienceCopy } from '@/lib/experience-copy';
import CareerArt from './CareerArt';

const ACCENTS = ['#d0b58a', '#88bbb5', '#aabf98', '#b4a1ca', '#d1a17f'];

function ChapterMedia({ chapter, index, position, step, enhanced, ready, reduced, active, copy, onSelect }: {
  chapter: Chapter; index: number; position: MotionValue<number>; step: number;
  enhanced: boolean; ready: boolean; reduced: boolean; active: boolean; copy: ExperienceCopy; onSelect: () => void;
}) {
  const x = useTransform(position, value => (index - value) * step);
  const depth = useTransform(position, value => -Math.min(Math.abs(index - value), 3) * 150);
  const scale = useTransform(position, value => 1 - Math.min(Math.abs(index - value), 2) * .09);
  const rotateY = useTransform(position, value => Math.max(-9, Math.min(9, (value - index) * 8)));
  const lift = useTransform(position, value => Math.min(Math.abs(index - value), 2) * 22);
  const dim = useTransform(position, value => Math.min(Math.abs(index - value) * .64, .88));
  const zIndex = useTransform(position, value => 20 - Math.round(Math.abs(index - value) * 4));
  const artX = useTransform(position, value => Math.max(-16, Math.min(16, (value - index) * 14)));

  return <motion.div id={`chapter-${chapter.numeral}`} className="career-card-slot" data-active={active}
    style={{ x: enhanced ? x : 0, zIndex, '--scene-accent': ACCENTS[index] } as MotionStyle}>
    <motion.div className="career-media" data-scene={index}
      style={ready && !reduced ? { z: depth, scale, rotateY, y: lift } : { z: 0, scale: 1, rotateY: 0, y: 0 }}>
      <div className="career-media-content" aria-hidden="true">
        <div className="career-media-top"><span>{copy.chapters} {chapter.numeral}</span><span>{chapter.years}</span></div>
        <span className="career-media-numeral">{chapter.numeral}</span>
        <motion.div className="career-media-art" style={{ x: ready && !reduced ? artX : 0 }}><CareerArt index={index} /></motion.div>
        <div className="career-media-title"><span className="career-media-kicker">{copy.sceneLabels[index]}</span><h2>{copy.scenes[index]}</h2><span className="career-media-institution">{chapter.institution}</span></div>
        <span className="career-media-location"><MapPin size={11} />{chapter.place}</span>
      </div>
      <motion.div className="career-card-shade" aria-hidden="true" style={{ opacity: ready ? (reduced ? (active ? 0 : .5) : dim) : 0 }} />
      <button type="button" className="career-card-select" onClick={onSelect} aria-label={`${chapter.numeral}: ${chapter.institution}`} aria-pressed={active} tabIndex={active ? 0 : -1} />
    </motion.div>
  </motion.div>;
}

export default function CareerTimeline({ chapters, copy }: { chapters: Chapter[]; copy: ExperienceCopy }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [enhanced, setEnhanced] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [step, setStep] = useState(504);
  const position = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end end'] });
  const scrollIndex = useTransform(scrollYProgress, [0, 1], [0, chapters.length - 1]);

  useMotionValueEvent(scrollIndex, 'change', value => {
    if (enhanced) position.set(value);
  });
  useMotionValueEvent(position, 'change', value => {
    const next = Math.max(0, Math.min(chapters.length - 1, Math.round(value)));
    activeRef.current = next;
    setActive(next);
  });

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1100px) and (min-height: 850px)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setEnhanced(desktop.matches && !reduce.matches);
      setReduced(reduce.matches);
      setReady(true);
    };
    update();
    desktop.addEventListener('change', update);
    reduce.addEventListener('change', update);
    return () => { desktop.removeEventListener('change', update); reduce.removeEventListener('change', update); };
  }, []);

  const select = useCallback((index: number, instant = false) => {
    if (!root.current || !track.current) return;
    const target = Math.max(0, Math.min(chapters.length - 1, index));
    const behavior = instant || reduced ? 'instant' : 'smooth';
    if (enhanced) {
      const top = root.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + target / Math.max(1, chapters.length - 1) * (root.current.offsetHeight - window.innerHeight), behavior });
    } else {
      const slot = track.current.children[target] as HTMLElement;
      track.current.scrollTo({ left: slot.offsetLeft + slot.offsetWidth / 2 - track.current.clientWidth / 2, behavior });
      if (instant || reduced) position.set(target);
    }
    window.history.replaceState(window.history.state, '', `#chapter-${chapters[target].numeral}`);
  }, [chapters, enhanced, reduced, position]);

  useEffect(() => {
    const element = track.current;
    if (!element || !ready) return;
    const measure = () => {
      const slot = element.children[0] as HTMLElement;
      setStep(slot.offsetWidth);
      if (enhanced) {
        element.scrollLeft = 0;
        position.set(scrollIndex.get());
      } else {
        const selected = element.children[activeRef.current] as HTMLElement;
        element.scrollTo({ left: selected.offsetLeft + selected.offsetWidth / 2 - element.clientWidth / 2, behavior: 'instant' });
        position.set(activeRef.current);
      }
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    measure();
    return () => observer.disconnect();
  }, [ready, enhanced, reduced, position, scrollIndex]);

  useEffect(() => {
    if (!ready) return;
    const followHash = () => {
      const index = chapters.findIndex(chapter => window.location.hash === `#chapter-${chapter.numeral}`);
      if (index < 0) return;
      select(index, true);
      if (!enhanced) root.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
    };
    const frame = requestAnimationFrame(followHash);
    window.addEventListener('hashchange', followHash);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('hashchange', followHash); };
  }, [ready, chapters, enhanced, select]);

  return <section ref={root} id="career-story" className="career-story" data-ready={ready} data-enhanced={enhanced}
    aria-label={copy.chapters} style={{ '--chapter-count': chapters.length, '--active-accent': ACCENTS[active] } as CSSProperties}>
    <noscript><style>{'.career-arrows,.career-card-select{display:none}.career-story-details .career-chapter{margin-bottom:32px}'}</style></noscript>
    <div className="career-film">
      <header className="career-film-top"><div><p className="chapters-eyebrow">{copy.chapters} <span>/ 2020 - 2025</span></p><h2>{copy.carouselTitle}</h2></div><span className="career-counter"><strong>{String(active + 1).padStart(2, '0')}</strong><span>/ {String(chapters.length).padStart(2, '0')}</span></span></header>
      <div className="career-stage">
        <div className="career-spotlight" aria-hidden="true" />
        <div ref={track} className="career-track" tabIndex={0} role="group" aria-label={copy.chapters}
          onKeyDown={event => {
            const target = event.key === 'ArrowRight' ? active + 1 : event.key === 'ArrowLeft' ? active - 1 : event.key === 'Home' ? 0 : event.key === 'End' ? chapters.length - 1 : null;
            if (target !== null && !event.altKey && !event.ctrlKey && !event.metaKey) { event.preventDefault(); select(target); }
          }}
          onScroll={() => {
            if (enhanced || !track.current) return;
            const slots = track.current.children;
            if (!slots.length) return;
            const first = slots[0] as HTMLElement;
            position.set(Math.max(0, Math.min(chapters.length - 1, (track.current.scrollLeft + track.current.clientWidth / 2 - first.offsetLeft - first.offsetWidth / 2) / first.offsetWidth)));
          }}
          onPointerDown={event => {
            if (enhanced || event.pointerType !== 'mouse' || event.button !== 0 || !track.current) return;
            drag.current = { x: event.clientX, left: track.current.scrollLeft, moved: false };
          }}
          onPointerMove={event => {
            if (!drag.current || !track.current) return;
            const delta = event.clientX - drag.current.x;
            if (Math.abs(delta) > 5) {
              drag.current.moved = true;
              track.current.dataset.dragging = 'true';
              track.current.setPointerCapture(event.pointerId);
              track.current.scrollLeft = drag.current.left - delta;
            }
          }}
          onPointerUp={event => {
            if (!drag.current || !track.current) return;
            const moved = drag.current.moved;
            drag.current = null;
            delete track.current.dataset.dragging;
            if (track.current.hasPointerCapture(event.pointerId)) track.current.releasePointerCapture(event.pointerId);
            if (moved) select(Math.round(position.get()));
          }}
          onPointerCancel={() => { drag.current = null; if (track.current) delete track.current.dataset.dragging; }}>
          {chapters.map((chapter, index) => <ChapterMedia key={chapter.numeral} chapter={chapter} index={index} position={position} step={step}
            enhanced={enhanced} ready={ready} reduced={reduced} active={active === index} copy={copy} onSelect={() => select(index)} />)}
        </div>
      </div>
      <div className="career-timeline-controls">
        <p className="career-scroll-hint">{enhanced ? <ArrowDown size={13} /> : <MoveHorizontal size={14} />}<span>{enhanced ? copy.scrollChapters : copy.swipeChapters}</span></p>
        <nav className="career-reel" aria-label={copy.chapters}>{chapters.map((chapter, index) => <a key={chapter.numeral} href={`#chapter-${chapter.numeral}`}
          aria-label={`${chapter.numeral}: ${chapter.institution}`} aria-current={index === active ? 'step' : undefined}
          onClick={event => { event.preventDefault(); select(index); }}><span className="career-reel-line" /><span className="career-reel-index">{String(index + 1).padStart(2, '0')}</span><span>{chapter.years.slice(0, 4)}</span></a>)}</nav>
        <div className="career-arrows"><button type="button" onClick={() => select(active - 1)} disabled={active === 0} aria-label={copy.back}><ArrowLeft size={18} /></button><button type="button" onClick={() => select(active + 1)} disabled={active === chapters.length - 1} aria-label={copy.next}><ArrowRight size={18} /></button></div>
      </div>
      <div className="career-story-details">{chapters.map((chapter, index) => <article key={chapter.numeral} className="career-chapter" data-active={index === active} hidden={ready && active !== index} aria-labelledby={`chapter-title-${chapter.numeral}`}>
        <div className="career-detail-heading"><p className="chapter-scene-label"><span>{chapter.numeral}</span>{chapter.years}<span className="chapter-detail-place">{chapter.place}</span></p><h3 id={`chapter-title-${chapter.numeral}`}>{chapter.title}</h3></div>
        <div className="career-detail-body"><p className="chapter-institution">{chapter.institution}</p><p className="chapter-role">{chapter.role}</p><p className="chapter-body">{chapter.body}</p></div>
      </article>)}</div>
      <p className="sr-only" role="status" aria-live="polite">{chapters[active].numeral}: {chapters[active].institution}, {chapters[active].years}</p>
    </div>
  </section>;
}
