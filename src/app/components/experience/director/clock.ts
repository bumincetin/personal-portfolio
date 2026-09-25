/** The only application RAF for Lenis, archive and atmosphere. Times are ms. */
type Frame = (time: number, delta: number) => void;
const frames = new Map<Frame, number>();
let request = 0, previous = 0, running = false;
function tick(time: number) {
  request = 0;
  if (!running || document.hidden) return;
  const delta = previous ? Math.min((time - previous) / 1000, .1) : 1 / 60;
  previous = time;
  [...frames].sort((a, b) => a[1] - b[1]).forEach(([frame]) => frame(time, delta));
  request = requestAnimationFrame(tick);
}
export function onExperienceFrame(frame: Frame, priority = 10) {
  frames.set(frame, priority);
  return () => { frames.delete(frame); };
}
export function startExperienceClock() {
  running = true;
  const visibility = () => {
    cancelAnimationFrame(request); request = 0; previous = 0;
    if (!document.hidden && running) request = requestAnimationFrame(tick);
  };
  document.addEventListener('visibilitychange', visibility);
  visibility();
  return () => { running = false; cancelAnimationFrame(request); document.removeEventListener('visibilitychange', visibility); };
}
