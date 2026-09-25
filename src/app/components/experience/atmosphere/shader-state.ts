import { experience } from '../director/experience-director';
import { shaderPresets, type ShaderField } from './shader-presets';
export function shaderTarget(): ShaderField {
  const state = experience.snapshot, world = experience.world;
  const index = world.hovered ?? state.activeVolume;
  const base = index !== null ? shaderPresets.volumes[index] : state.phase === 'contact' ? shaderPresets.contact : ['editorial','approach','about'].includes(state.phase) ? shaderPresets.editorial : state.phase === 'explore' ? shaderPresets.explore : shaderPresets.home;
  const low = state.tier === 'B' || state.tier === 'C';
  const inspecting = world.phase === 'SELECTED';
  const reading = ['editorial','approach','about'].includes(state.phase);
  const motion = state.reduced ? 0 : 1;
  return { ...base,
    uStrength: base.uStrength * (low ? .75 : 1) * (reading ? .7 : 1) + experience.energy * .07 * motion + (world.hovered !== null ? .035 : 0),
    uSpeed: base.uSpeed * (low ? .65 : 1) * (inspecting || reading ? .5 : 1) + (world.phase === 'TRANSITIONING' ? .012 : 0) + experience.energy * .015 * motion,
    positionX: base.positionX + experience.pointer.x * .035 * motion,
    positionY: base.positionY + experience.pointer.y * .025 * motion + experience.localProgress * .045,
  };
}
export function dampField(current: ShaderField, target: ShaderField, delta: number): boolean {
  let changed = false;
  const alpha = 1 - Math.exp(-delta * 3.2);
  for (const key of Object.keys(target) as (keyof ShaderField)[]) {
    const diff = target[key] - current[key];
    if (Math.abs(diff) > .001) { current[key] += diff * alpha; changed = true; }
  }
  return changed;
}
