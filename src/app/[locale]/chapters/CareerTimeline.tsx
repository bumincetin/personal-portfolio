'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { animate, motion, useMotionValue, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import type { Chapter } from '@/lib/story';
import type { ExperienceCopy } from '@/lib/experience-copy';
import CareerArt from './CareerArt';

function TimelineCard({ chapter, index, position, enhanced, book, active, copy }: {
  chapter: Chapter; index: number; position: MotionValue<number>; enhanced: boolean; book: boolean; active: boolean; copy: ExperienceCopy;
}) {
  const x = useTransform(position, value => (index - value) * 510);
  const scale = useTransform(position, value => 1 - Math.min(Math.abs(index - value), 2) * .17);
  const zIndex = useTransform(position, value => book ? 20 - index : 10 - Math.round(Math.abs(index - value)));
  const turn = useTransform(position, value => book
    ? -165 * Math.max(0, Math.min(1, value - index))
    : Math.max(-58, Math.min(24, (index - value) * 42)));
  const lift = useTransform(position, value => Math.sin(Math.max(0, Math.min(1, value - index)) * Math.PI) * -2);
  const shade = useTransform(position, value => Math.sin(Math.min(1, Math.abs(value - index)) * Math.PI) * .22);
  const crease = useTransform(position, value => `${100 - Math.max(0, Math.min(1, value - index)) * 100}% 0%`);
  const visibility = useTransform(position, value => book && value - index >= .999 ? 'hidden' : 'visible');

  return <motion.article id={`chapter-${chapter.numeral}`} className="career-chapter" data-active={active}
    aria-hidden={book && !active ? true : undefined}
    style={enhanced ? { x, y: '-50%', scale, zIndex } : { x: 0, y: 0, scale: 1, zIndex: book ? zIndex : undefined }} aria-labelledby={`chapter-title-${chapter.numeral}`}>
    <motion.div className="chapter-leaf" style={{ rotateY: enhanced || book ? turn : 0, rotateZ: book ? lift : 0, visibility: book ? visibility : 'visible' }}>
      <div className="chapter-card-surface">
        <div className="chapter-card-meta"><span>{chapter.years}</span><span><MapPin size={11} />{chapter.place}</span></div>
        <header className="chapter-card-heading"><div><p className="chapter-running-title">{copy.chapters} / {chapter.numeral}</p><h2 id={`chapter-title-${chapter.numeral}`}>{chapter.institution}</h2><p className="chapter-role">{chapter.role}</p></div><span className="chapter-number" aria-hidden="true">{chapter.numeral}</span></header>
        <div className="chapter-art-panel" data-scene={index} aria-hidden="true"><CareerArt index={index} /><span>{copy.sceneLabels[index]}</span></div>
        <div className="chapter-card-copy"><p className="chapter-scene-label">{copy.scenes[index]}</p><h3>{chapter.title}</h3><p className="chapter-body">{chapter.body}</p></div>
        <footer className="chapter-card-footer"><span>{copy.chapters} / {chapter.numeral}</span><span>{String(index + 1).padStart(2, '0')}</span></footer>
        <motion.div className="chapter-fold-light" aria-hidden="true" style={{ opacity: enhanced || book ? shade : 0, backgroundPosition: crease }} />
      </div>
      <div className="chapter-page-back" aria-hidden="true"><span>{chapter.numeral}</span><span>{copy.chapters} / {chapter.years}</span></div>
    </motion.div>
  </motion.article>;
}

export default function CareerTimeline({ chapters, copy }: { chapters: Chapter[]; copy: ExperienceCopy }) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  const [book, setBook] = useState(false);
  const bookPosition = useMotionValue(0);
  const turnAnimation = useRef<{ stop: () => void } | null>(null);
  const gesture = useRef<{ x: number; y: number; position: number; horizontal: boolean } | null>(null);
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end end'] });
  const position = useTransform(scrollYProgress, [0, 1], [0, chapters.length - 1]);
  const currentPosition = book ? bookPosition : position;
  const rulerX = useTransform(currentPosition, value => -value * 110);

  useMotionValueEvent(position, 'change', value => {
    if (enhanced) setActive(Math.max(0, Math.min(chapters.length - 1, Math.round(value))));
  });

  useMotionValueEvent(bookPosition, 'change', value => {
    if (book) setActive(Math.max(0, Math.min(chapters.length - 1, Math.round(value))));
  });

  useEffect(() => () => turnAnimation.current?.stop(), []);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 901px) and (min-height: 860px) and (prefers-reduced-motion: no-preference)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      turnAnimation.current?.stop();
      gesture.current = null;
      setEnhanced(media.matches);
      setBook(!media.matches && !reduced.matches);
      // Clear native scroll offsets before stacking or positioning the sheets.
      if (track.current) track.current.scrollLeft = 0;
    };
    update();
    media.addEventListener('change', update);
    reduced.addEventListener('change', update);
    return () => { media.removeEventListener('change', update); reduced.removeEventListener('change', update); };
  }, []);

  const turnTo = useCallback((index: number, instant = false) => {
    const target = Math.max(0, Math.min(chapters.length - 1, index));
    turnAnimation.current?.stop();
    if (instant) bookPosition.set(target);
    else turnAnimation.current = animate(bookPosition, target, {
      duration: Math.min(1.8, .85 * Math.max(1, Math.abs(target - bookPosition.get()))),
      ease: [.32, .05, .2, 1],
    });
  }, [bookPosition, chapters.length]);

  const goTo = useCallback((index: number, instant = false) => {
    if (!root.current || !stage.current || !track.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior = instant || reduced ? 'instant' : 'smooth';
    if (enhanced) {
      const top = root.current.getBoundingClientRect().top + window.scrollY;
      const distance = root.current.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + (index / Math.max(1, chapters.length - 1)) * distance, behavior });
    } else if (book) {
      turnTo(index, instant);
      window.scrollTo({ top: root.current.getBoundingClientRect().top + window.scrollY - 80, behavior });
    } else {
      const card = track.current.children[index] as HTMLElement;
      track.current.scrollTo({ left: card.offsetLeft - (track.current.clientWidth - card.offsetWidth) / 2, behavior });
      window.scrollTo({ top: root.current.getBoundingClientRect().top + window.scrollY - 80, behavior });
      setActive(index);
    }
  }, [enhanced, book, turnTo, chapters.length]);

  useEffect(() => {
    const followHash = () => {
      const index = chapters.findIndex(chapter => window.location.hash === `#chapter-${chapter.numeral}`);
      if (index >= 0) goTo(index, true);
    };
    const frame = requestAnimationFrame(followHash);
    window.addEventListener('hashchange', followHash);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('hashchange', followHash); };
  }, [chapters, goTo]);

  return <section ref={root} id="career-story" className="career-story" data-enhanced={enhanced} data-book={book} aria-label={copy.chapters}
    style={{ '--chapter-count': chapters.length } as CSSProperties}>
    <noscript><style>{'.career-arrows { display: none; }'}</style></noscript>
    <div ref={stage} className="career-film">
      <div className="career-film-top"><span>{copy.chapters} <span className="career-edition">/ 2020 — 2025</span></span><span>{String(active + 1).padStart(2, '0')} <span className="career-edition">/ {String(chapters.length).padStart(2, '0')}</span></span></div>
      <div className="career-year" aria-hidden="true">{chapters[active].years.slice(0, 4)}</div>
      <div className="career-perspective" aria-hidden="true"><svg viewBox="0 0 1440 800" preserveAspectRatio="none"><path d="M720 0 110 800M720 0 450 800M720 0 990 800M720 0 1330 800M720 0V800" /></svg></div>
      <div className="career-ruler" aria-hidden="true"><motion.div style={enhanced || book ? { x: rulerX } : { x: -active * 110 }}>{Array.from({ length: 81 }, (_, i) => <i key={i} data-major={i % 5 === 0} />)}</motion.div></div>
      <div ref={track} className="career-track" tabIndex={0} role="group" aria-label={copy.chapters} onKeyDown={event => {
        const target = event.key === 'ArrowRight' ? active + 1 : event.key === 'ArrowLeft' ? active - 1 : event.key === 'Home' ? 0 : event.key === 'End' ? chapters.length - 1 : null;
        if (target !== null && !event.altKey && !event.ctrlKey && !event.metaKey) { event.preventDefault(); goTo(Math.max(0, Math.min(chapters.length - 1, target))); }
      }} onPointerDown={event => {
        if (!book || event.button !== 0) return;
        turnAnimation.current?.stop();
        gesture.current = { x: event.clientX, y: event.clientY, position: bookPosition.get(), horizontal: false };
      }} onPointerMove={event => {
        const drag = gesture.current;
        if (!book || !drag || !track.current) return;
        const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
        if (!drag.horizontal) {
          if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { gesture.current = null; return; }
          if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
          drag.horizontal = true;
          event.currentTarget.setPointerCapture(event.pointerId);
        }
        bookPosition.set(Math.max(0, Math.min(chapters.length - 1, drag.position - dx / track.current.clientWidth)));
      }} onPointerUp={event => {
        const drag = gesture.current;
        gesture.current = null;
        if (!book || !drag) return;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
        const delta = bookPosition.get() - drag.position;
        turnTo(Math.abs(delta) > .15 ? Math.round(drag.position) + Math.sign(delta) : Math.round(drag.position));
      }} onPointerCancel={() => {
        gesture.current = null;
        if (book) turnTo(Math.round(bookPosition.get()));
      }} onScroll={() => {
        if (enhanced || book || !track.current) return;
        const center = track.current.scrollLeft + track.current.clientWidth / 2;
        const cards = [...track.current.children] as HTMLElement[];
        let closest = 0;
        cards.forEach((card, index) => {
          if (Math.abs(card.offsetLeft + card.offsetWidth / 2 - center) < Math.abs(cards[closest].offsetLeft + cards[closest].offsetWidth / 2 - center)) closest = index;
        });
        setActive(closest);
      }}>
        {chapters.map((chapter, i) => <TimelineCard key={chapter.numeral} chapter={chapter} index={i} position={currentPosition} enhanced={enhanced} book={book} active={i === active} copy={copy} />)}
      </div>
      <div className="career-timeline-controls">
        <p className="career-scroll-hint"><ArrowDown size={14} /><span>{copy.scroll}</span></p>
        <nav className="career-reel" aria-label={copy.chapters}>{chapters.map((chapter, i) => <a href={`#chapter-${chapter.numeral}`} key={chapter.numeral}
          aria-label={`${chapter.numeral}: ${chapter.institution}`} aria-current={i === active ? 'step' : undefined}
          onClick={event => { event.preventDefault(); goTo(i); window.history.replaceState(null, '', `#chapter-${chapter.numeral}`); }}>
          <span className="reel-dot" /><span>{chapter.years.slice(0, 4)}</span><span className="reel-numeral">{chapter.numeral}</span>
        </a>)}</nav>
        <div className="career-arrows"><button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label={copy.back}><ArrowLeft size={18} /></button><button type="button" onClick={() => goTo(active + 1)} disabled={active === chapters.length - 1} aria-label={copy.next}><ArrowRight size={18} /></button></div>
      </div>
    </div>
  </section>;
}
