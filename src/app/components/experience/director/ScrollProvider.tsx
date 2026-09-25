'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { experience } from './experience-director';
import { onExperienceFrame, startExperienceClock } from './clock';
import { volumeIds } from './narrative';
import ShaderAtmosphere from '../atmosphere/ShaderAtmosphere';
import '../atmosphere/atmosphere.css';

export default function ScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const coarse = matchMedia('(pointer: coarse)');
    const capability = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    experience.publish({ tier: capability.connection?.saveData ? 'D' : (capability.deviceMemory ?? 8) <= 2 ? 'C' : coarse.matches || navigator.hardwareConcurrency <= 4 ? 'B' : 'A' });
    const lenis = new Lenis({ autoRaf: false, smoothWheel: !reduced.matches, syncTouch: false, lerp: .12, anchors: false, prevent: node => node.matches('[data-scroll-region],.world-index,.world-inspection,.atlas-menu,.library-dialog,.sketchbook-root[data-view="book"],.career-track,textarea') });
    experience.lenis = lenis;
    const preference = () => { lenis.options.smoothWheel = !reduced.matches; experience.reduce(reduced.matches); };
    preference(); reduced.addEventListener('change', preference);
    const clock = onExperienceFrame((time, dt) => { lenis.options.smoothWheel = !reduced.matches && experience.snapshot.tier !== 'D'; lenis.raf(time); experience.frame(time, dt); }, 0);
    const stop = startExperienceClock();
    const pointer = (event: PointerEvent) => { if (event.pointerType === 'mouse') experience.pointer = { x: event.clientX / innerWidth * 2 - 1, y: event.clientY / innerHeight * 2 - 1 }; };
    const interrupt = () => experience.interrupt();
    const key = (event: KeyboardEvent) => { if (!event.defaultPrevented && ['PageDown','PageUp','Home','End',' ','ArrowUp','ArrowDown'].includes(event.key)) { experience.interrupt(); if (lenis.isScrolling === 'smooth') lenis.scrollTo(window.scrollY, { immediate: true }); } };
    const visibility = () => experience.publish({ visible: !document.hidden });
    const anchor = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
      if (!link || link.target || link.hasAttribute('download')) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
      let id: string;
      try { id = decodeURIComponent(url.hash.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault(); experience.interrupt();
      history.pushState(history.state, '', url.hash);
      lenis.scrollTo(target, { duration: 1.05, lerp: 0, immediate: reduced.matches, onComplete: () => {
        const focus = target.querySelector<HTMLElement>('h1,h2,h3') || target;
        const hadIndex = focus.hasAttribute('tabindex');
        if (!hadIndex) { focus.tabIndex = -1; focus.addEventListener('blur', () => focus.removeAttribute('tabindex'), { once: true }); }
        focus.focus({ preventScroll: true });
      } });
    };
    const resize = new ResizeObserver(() => experience.measure()); resize.observe(document.body);
    window.addEventListener('pointermove', pointer, { passive: true });
    window.addEventListener('wheel', interrupt, { passive: true }); window.addEventListener('touchstart', interrupt, { passive: true });
    let viewportWidth = innerWidth;
    const measure = () => {
      const selected = experience.world.selected;
      const preserve = viewportWidth !== innerWidth || !lenis.isScrolling;
      viewportWidth = innerWidth;
      experience.measure();
      if (selected !== null && preserve) {
        const stop = document.getElementById(`inspect-${volumeIds[selected]}`);
        if (stop) lenis.scrollTo(stop.getBoundingClientRect().top + window.scrollY, { immediate: true });
      }
    };
    window.addEventListener('keydown', key); window.addEventListener('resize', measure);
    document.addEventListener('visibilitychange', visibility);
    window.addEventListener('click', anchor);
    return () => { stop(); clock(); lenis.destroy(); experience.lenis = null; resize.disconnect(); reduced.removeEventListener('change', preference); window.removeEventListener('pointermove', pointer); window.removeEventListener('wheel', interrupt); window.removeEventListener('touchstart', interrupt); window.removeEventListener('keydown', key); window.removeEventListener('resize', measure); window.removeEventListener('click', anchor); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  useEffect(() => { experience.configure(pathname); experience.measure(); }, [pathname]);
  return <><ShaderAtmosphere />{children}</>;
}
