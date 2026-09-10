'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { Chapter } from '@/lib/story';
import type { ExperienceCopy } from '@/lib/experience-copy';
import CareerArt from './CareerArt';

export default function CareerTimeline({ chapters, copy }: { chapters: Chapter[]; copy: ExperienceCopy }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: root, offset: ['start center', 'end center'] });
  const travel = useTransform(scrollYProgress, [0, 1], [18, -18]);
  useEffect(() => {
    const articles = [...(root.current?.querySelectorAll<HTMLElement>('.career-chapter') ?? [])];
    let frame = 0;
    const update = () => { frame = 0; const target = innerHeight * .5; let best = 0, distance = Infinity; articles.forEach((article, i) => { const r = article.getBoundingClientRect(); const d = Math.abs(r.top + r.height / 2 - target); if (d < distance) { best = i; distance = d; } }); setActive(best); };
    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', queue, {passive: true}); window.addEventListener('resize', queue); update();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', queue); window.removeEventListener('resize', queue); };
  }, []);
  return <section ref={root} id="career-story" className="career-story" aria-label={copy.chapters}>
    <div className="career-film">
      <div className="career-film-top"><span>{copy.chapters}</span><span>0{active + 1} / 05</span></div>
      <div className="career-film-frame" aria-hidden="true">
        <div className="career-frame-grid" />
        <AnimatePresence mode="wait" initial={false}><motion.div key={active} className="career-shot" initial={{ opacity: reduced ? 1 : 0, scale: reduced ? 1 : 1.08, rotate: reduced ? 0 : -3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: reduced ? 1 : 0, scale: reduced ? 1 : .95 }} transition={{ duration: reduced ? 0 : .7, ease: [.22, 1, .36, 1] }}><motion.div style={{ y: travel }}><CareerArt index={active} /></motion.div></motion.div></AnimatePresence>
        <span className="career-year">{chapters[active].years.split(' — ')[0]}</span>
        <span className="career-film-caption">{copy.sceneLabels[active]}</span>
      </div>
      <nav className="career-reel" aria-label={copy.chapters}>{chapters.map((chapter, i) => <a href={`#chapter-${chapter.numeral}`} key={chapter.numeral} aria-label={`${chapter.numeral}: ${chapter.institution}`} aria-current={i === active ? 'step' : undefined}><span>{chapter.numeral}</span><span className="reel-line" /></a>)}</nav>
      <motion.div className="career-film-progress" style={{ scaleX: scrollYProgress }} />
    </div>
    <div className="career-narrative">{chapters.map((chapter, i) => <article key={chapter.numeral} id={`chapter-${chapter.numeral}`} className="career-chapter" data-active={active === i}>
      <div className="chapter-marker"><span>{chapter.numeral}</span><p>{chapter.years}<br /><span>{chapter.place}</span></p></div>
      <motion.div className="career-mobile-art" aria-hidden="true" initial={{ y: 24 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: .5 }} transition={{ duration: .7, ease: [.22, 1, .36, 1] }}><CareerArt index={i} /></motion.div>
      <p className="chapter-scene-label">{copy.scenes[i]}</p><h2>{chapter.title}</h2><p className="chapter-institution">{chapter.institution}</p><p className="chapter-role">{chapter.role}</p><p className="chapter-body">{chapter.body}</p>
    </article>)}</div>
  </section>;
}
