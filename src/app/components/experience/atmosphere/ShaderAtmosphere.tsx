'use client';
import { Component, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { experience } from '../director/experience-director';
import { onExperienceFrame } from '../director/clock';
import { dampField, shaderTarget } from './shader-state';
import { shaderPresets } from './shader-presets';

class AtmosphereBoundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { experience.publish({ tier: 'D' }); }
  render() { return this.state.failed ? null : this.props.children; }
}
export default function ShaderAtmosphere() {
  const state = useSyncExternalStore(experience.subscribe, experience.getSnapshot, experience.getServerSnapshot);
  const [Renderer, setRenderer] = useState<typeof import('./ShaderRenderer').default | null>(null);
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!state.ready || state.reduced || state.tier === 'D' || Renderer) return;
    let cancelled = false;
    import('./ShaderRenderer').then(module => { if (!cancelled) setRenderer(() => module.default); }).catch(() => experience.publish({ tier: 'D' }));
    return () => { cancelled = true; };
  }, [state.ready, state.reduced, state.tier, Renderer]);
  useEffect(() => {
    const field = { ...shaderPresets.home };
    experience.accent = field.accent;
    return onExperienceFrame((_time, dt) => {
      const target = shaderTarget();
      if (state.reduced) {
        if (Object.entries(target).every(([key, value]) => field[key as keyof typeof field] === value)) return;
        Object.assign(field, target);
      } else if (!dampField(field, target, dt)) return;
      experience.accent = field.accent;
      host.current?.style.setProperty('--field-x', `${50 + field.positionX * 35}%`);
      host.current?.style.setProperty('--field-y', `${35 + field.positionY * 25}%`);
      host.current?.style.setProperty('--field-energy', String(field.accent));
    }, 5);
  }, [state.reduced]);
  // Once loaded, keep the context across route-level world loaders.
  const enabled = (state.ready || !!Renderer) && !state.reduced && state.tier !== 'D' && !state.secondary;
  return <div ref={host} className="shader-atmosphere" aria-hidden="true" data-phase={state.phase} data-volume={state.activeVolume ?? ''} data-tier={state.tier} data-mode={enabled && Renderer ? 'shader' : 'static'}>
    <div className="atmosphere-static" />
    {enabled && Renderer && <AtmosphereBoundary><Renderer /></AtmosphereBoundary>}
  </div>;
}
