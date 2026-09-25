export const volumeIds = ['document-intelligence', 'forecasting', 'reporting', 'cross-border', 'greenwashing-risk-scoring', 'parliamentary-seat-forecast', 'portfolio-optimizer'];
export const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));
export const volumeStop = (index: number) => .14 + index * .085;
export function archiveNarrative(progress: number) {
  const volume = progress >= .10 && progress < .735 ? Math.min(6, Math.floor((progress - .10) / .085)) : null;
  return { volume, exit: clamp((progress - .735) / .265), local: volume === null ? clamp(progress / .10) : clamp((progress - (.10 + volume * .085)) / .085) };
}
export function normalizedVelocity(velocity: number) { return clamp(Math.abs(velocity) / 70); }
