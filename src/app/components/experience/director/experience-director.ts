import type Lenis from 'lenis';
import { initialWorldState, worldReducer, type WorldEvent, type WorldState } from '../world/state';
import { archiveNarrative, clamp, normalizedVelocity, volumeIds } from './narrative';

export type ExperiencePhase = 'loading' | 'intro' | 'home' | 'explore' | 'volume' | 'editorial' | 'approach' | 'about' | 'contact';
export type DeviceTier = 'A' | 'B' | 'C' | 'D';
type Section = { element: HTMLElement; top: number; height: number; volume: number | null; phase: ExperiencePhase };
const initial = { phase: 'loading' as ExperiencePhase, activeVolume: null as number | null, tier: 'B' as DeviceTier, reduced: false, locked: false, secondary: false, visible: true, ready: false, departing: false };

/** Semantic changes notify React. Frame values are read directly by renderers. */
class ExperienceDirector {
  lenis: Lenis | null = null;
  world: WorldState = { ...initialWorldState };
  snapshot = initial;
  scroll = 0; velocity = 0; energy = 0; direction = 0; progress = 0; localProgress = 0;
  pointer = { x: 0, y: 0 }; accent = .5;
  route = ''; archive: HTMLElement | null = null;
  private sections: Section[] = [];
  private listeners = new Set<() => void>();
  private worldListeners = new Set<() => void>();
  private measured = false;
  private archiveTop = 0;
  private archiveTravel = 1;
  private archiveEnd = 0;
  private destination: number | 'home' | null = null;
  private lastScroll = -1;
  private locks = new Set<string>();
  subscribe = (fn: () => void) => { this.listeners.add(fn); return () => { this.listeners.delete(fn); }; };
  subscribeWorld = (fn: () => void) => { this.worldListeners.add(fn); return () => { this.worldListeners.delete(fn); }; };
  getSnapshot = () => this.snapshot;
  getServerSnapshot = () => initial;
  getWorld = () => this.world;
  getServerWorld = () => initialWorldState;
  publish(patch: Partial<typeof initial>) {
    if (Object.entries(patch).some(([key, value]) => this.snapshot[key as keyof typeof initial] !== value)) {
      this.snapshot = { ...this.snapshot, ...patch };
      this.listeners.forEach(fn => fn());
    }
  }
  dispatch = (event: WorldEvent) => {
    this.lastScroll = -1;
    if (event.type === 'SELECT') { this.select(event.index); return; }
    this.setWorld(worldReducer(this.world, event));
    if (event.type === 'SETTLED' || (event.type === 'READY' && this.world.phase !== 'INTRO')) this.publish({ ready: true });
    if (event.type === 'FAILED') this.publish({ ready: true, tier: 'D' });
  };
  private setWorld(next: WorldState) {
    const previous = this.world;
    this.world = next;
    if (previous.phase !== next.phase || previous.selected !== next.selected || previous.hovered !== next.hovered || previous.reduced !== next.reduced) this.worldListeners.forEach(fn => fn());
  }
  configure(route: string) {
    this.route = route; this.destination = null; this.lastScroll = -1; this.measured = false;
    const home = /^\/(en|tr|it)\/?$/.test(route);
    this.world = { ...initialWorldState, reduced: this.snapshot.reduced };
    this.publish({ ready: !home, activeVolume: null, phase: home ? 'loading' : this.routePhase(), departing: false });
    this.worldListeners.forEach(fn => fn());
  }
  private routePhase(): ExperiencePhase {
    return this.route.endsWith('/contact') ? 'contact' : this.route.endsWith('/chapters') ? 'about' : this.route.endsWith('/front-matter') ? 'approach' : 'editorial';
  }
  measure() {
    this.archive = document.querySelector<HTMLElement>('.world-chapter');
    if (this.archive) {
      this.archiveTop = this.archive.getBoundingClientRect().top + window.scrollY;
      this.archiveTravel = Math.max(1, this.archive.offsetHeight - (this.archive.querySelector<HTMLElement>('.world-stage')?.offsetHeight || innerHeight));
      this.archiveEnd = this.archiveTop + this.archive.offsetHeight;
    }
    this.sections = [...document.querySelectorAll<HTMLElement>('[data-story-section]')].map(element => ({ element, top: element.getBoundingClientRect().top + window.scrollY, height: element.offsetHeight, volume: element.dataset.volume === undefined ? null : Number(element.dataset.volume), phase: (element.dataset.storySection || 'editorial') as ExperiencePhase }));
    this.measured = true; this.lastScroll = -1;
    this.lenis?.resize();
  }
  select(index: number) {
    if (this.world.phase === 'FALLBACK' || !this.archive) return;
    this.destination = index;
    this.setWorld(worldReducer(this.world, { type: 'SELECT', index }));
    this.publish({ phase: 'volume', activeVolume: index });
    const target = document.getElementById(`inspect-${volumeIds[index]}`);
    // Inspection stops are camera coordinates, not headings: do not subtract
    // the document's 90px anchor padding from these measured positions.
    if (target) this.scrollTo(target.getBoundingClientRect().top + window.scrollY, () => { this.destination = null; });
  }
  home = () => {
    this.destination = 'home';
    this.setWorld({ ...worldReducer(this.world, { type: 'HOME' }), progress: 0 });
    this.publish({ phase: 'home', activeVolume: null });
    this.scrollTo(this.archive ? this.archive.getBoundingClientRect().top + window.scrollY : 0, () => { this.destination = null; });
  };
  interrupt = () => { this.destination = null; };
  beginReading() { this.lenis?.scrollTo(this.scroll, { immediate: true }); this.destination = null; this.publish({ phase: 'editorial', departing: true }); }
  scrollTo(target: HTMLElement | number, onComplete?: () => void) {
    if (this.lenis) this.lenis.scrollTo(target, { duration: 1.05, lerp: 0, immediate: this.snapshot.reduced, lock: false, onComplete });
    else { window.scrollTo({ top: typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY, behavior: 'instant' }); onComplete?.(); }
  }
  lock(key: string, secondary = false) {
    this.locks.add(key); this.lenis?.stop();
    this.publish({ locked: true, secondary: this.snapshot.secondary || secondary });
    return () => {
      this.locks.delete(key);
      if (!this.locks.size) { this.lenis?.start(); this.publish({ locked: false, secondary: false }); }
    };
  }
  reduce(value: boolean) { this.publish({ reduced: value }); this.dispatch({ type: 'MOTION', reduced: value }); }
  frame = (_time: number, dt: number) => {
    if (this.snapshot.departing) return;
    if (!this.measured) this.measure();
    this.scroll = this.lenis?.scroll ?? window.scrollY;
    this.velocity = this.lenis?.velocity ?? 0; this.direction = this.lenis?.direction ?? 0;
    this.progress = this.lenis?.progress ?? 0;
    this.energy += (normalizedVelocity(this.velocity) - this.energy) * (1 - Math.exp(-dt * 4));
    if (this.scroll === this.lastScroll && this.destination === null) return;
    this.lastScroll = this.scroll;
    let phase = this.routePhase(), activeVolume: number | null = null;
    const a = this.archive;
    if (a && this.scroll < this.archiveEnd - innerHeight * .15) {
      const p = clamp((this.scroll - this.archiveTop) / this.archiveTravel);
      const narrative = archiveNarrative(p);
      const volume = this.destination === 'home' ? null : typeof this.destination === 'number' ? this.destination : narrative.volume;
      this.localProgress = narrative.local;
      const exit = this.destination !== null ? 0 : narrative.exit;
      a.style.setProperty('--world-progress', String(exit));
      a.dataset.exit = exit > .8 ? 'true' : 'false';
      if (!['LOADING', 'FALLBACK'].includes(this.world.phase)) {
        if (volume !== this.world.selected && !this.snapshot.reduced) this.setWorld(volume === null ? { ...this.world, selected: null, hovered: null, phase: exit > 0 ? 'EDITORIAL' : 'HOME' } : worldReducer(this.world, { type: 'SELECT', index: volume }));
        if (exit > 0 && this.world.selected !== null) this.setWorld({ ...this.world, selected: null, phase: 'EDITORIAL' });
      }
      this.world.progress = this.snapshot.reduced ? 0 : exit;
      activeVolume = this.world.selected;
      phase = this.world.phase === 'LOADING' ? 'loading' : this.world.phase === 'INTRO' ? 'intro' : activeVolume !== null ? 'volume' : exit > 0 ? 'explore' : 'home';
    } else {
      const line = this.scroll + innerHeight * .45;
      const section = this.sections.find(s => line >= s.top && line < s.top + s.height);
      if (section) { phase = section.phase; activeVolume = section.volume; this.localProgress = clamp((line - section.top) / section.height); }
      else { this.localProgress = this.progress; activeVolume = volumeIds.findIndex(id => this.route.endsWith('/'+id)); if (activeVolume === -1) activeVolume = null; }
    }
    // Typography stays readable; a small shared, local progress offset joins the scene timeline.
    for (const section of this.sections) {
      const reveal = clamp((this.scroll + innerHeight - section.top) / (innerHeight * .6));
      section.element.style.setProperty('--story-reveal', String(this.snapshot.reduced ? 1 : reveal));
    }
    this.publish({ phase, activeVolume });
  };
}
export const experience = new ExperienceDirector();
