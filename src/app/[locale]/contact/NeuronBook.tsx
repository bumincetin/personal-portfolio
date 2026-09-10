'use client';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import type { ExperienceCopy } from '@/lib/experience-copy';
import type { createNeuronScene } from './neuron-scene';

export default function NeuronBook({ step, copy }: { step: number; copy: ExperienceCopy }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const controller = useRef<ReturnType<typeof createNeuronScene> | null>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const current = useRef({step, paused}); current.current = {step, paused};
  useEffect(() => {
    let cancelled = false;
    const el = canvas.current;
    const lost = (event: Event) => { event.preventDefault(); controller.current?.dispose(); controller.current = null; setReady(false); };
    el?.addEventListener('webglcontextlost', lost);
    import('./neuron-scene').then(({ createNeuronScene }) => {
      if (cancelled || !el) return;
      try { controller.current = createNeuronScene(el); controller.current.update(current.current.step, current.current.paused); setReady(true); }
      catch { setReady(false); }
    }).catch(() => setReady(false));
    return () => { cancelled = true; controller.current?.dispose(); controller.current = null; el?.removeEventListener('webglcontextlost', lost); };
  }, []);
  useEffect(() => controller.current?.update(step, paused), [step, paused]);
  return <figure className="neuron-book" data-ready={ready}>
    <div className="neuron-book-halo" aria-hidden="true" />
    <svg className="neuron-fallback" viewBox="0 0 600 480" aria-hidden="true">
      <path d="M70 295 280 260 300 285 320 260 530 295 500 395 300 420 100 390Z" fill="#31534c" stroke="#bd996e" />
      <path d="m88 288 188-42 24 25 24-25 190 42-29 92-185 22-181-27Z" fill="#e7dcc6" />
      <g fill="none" stroke="#c4a271" strokeWidth="3"><path d="M300 209 235 167 169 177m66-10-18-54m83 96 71-60 50 3m-50-3 6-65m-77 125-7-93-34-40m34 40 35-47m-28 140 83 54 57-11m-57 11 19 41m-102-95-59 53-72-8m72 8-19 51" /><circle cx="300" cy="209" r="27" fill="#dcb677" /></g>
    </svg>
    <canvas ref={canvas} aria-hidden="true" className="neuron-canvas" />
    <figcaption className="neuron-caption"><span>{copy.sceneNote}</span><span className="sr-only">{copy.sceneAlt}</span>
      {ready && !reduced && <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? copy.play : copy.pause}>{paused ? <Play size={15} /> : <Pause size={15} />}</button>}
    </figcaption>
  </figure>;
}
