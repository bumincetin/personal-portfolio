'use client';
import { memo, useEffect, useState } from 'react';
import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react';
import { useThree } from '@react-three/fiber';
import { experience } from '../director/experience-director';
import { onExperienceFrame } from '../director/clock';
import { atmospherePalette, shaderPresets, type ShaderField } from './shader-presets';
import { dampField, shaderTarget } from './shader-state';

const Gradient = memo(function Gradient({ field }: { field: ShaderField }) {
  return <ShaderGradient type="plane" shader="defaults" control="props" animate="on" grain="off" lightType="3d" brightness={.8} reflection={0} color1={atmospherePalette.dark} color2={atmospherePalette.stone} color3={atmospherePalette.light} cDistance={5} cPolarAngle={90} cAzimuthAngle={180} cameraZoom={1} rotationX={0} rotationY={0} positionZ={0} enableTransition={false} enableCameraUpdate={false} {...field} />;
});
function ClockBridge() {
  const get = useThree(state => state.get);
  const [field, setField] = useState<ShaderField>({ ...shaderPresets.home });
  useEffect(() => {
    const state = get(); state.setFrameloop('never');
    const canvas = state.gl.domElement;
    canvas.dataset.engine = 'shadergradient';
    const lost = (event: Event) => { event.preventDefault(); experience.publish({ tier: 'D' }); };
    canvas.addEventListener('webglcontextlost', lost);
    let rendered = 0, lastDraw = 0, lastProps = 0, slow = 0, elapsed = 0;
    const current = { ...shaderPresets.home };
    const unsubscribe = onExperienceFrame((time, delta) => {
      const { locked, visible, tier } = experience.snapshot;
      if (!visible || locked) { lastDraw = time; return; }
      const reading = ['editorial','approach','about'].includes(experience.snapshot.phase);
      const inspecting = experience.world.phase === 'SELECTED';
      const fps = reading ? 8 : inspecting ? (tier === 'A' ? 15 : 12) : tier === 'A' ? 30 : tier === 'B' ? 15 : 12;
      if (time - lastDraw < 1000 / fps - 1) return;
      const dt = Math.min((time - lastDraw) / 1000 || delta, .15); lastDraw = time; elapsed += dt;
      if (time > 6000 && delta > .045) slow++; else slow = Math.max(0, slow - .5);
      if (slow > 35) { experience.publish({ tier: tier === 'A' ? 'B' : tier === 'B' ? 'C' : 'D' }); slow = 0; }
      const propInterval = tier === 'A' ? 100 : tier === 'B' ? 160 : 240;
      if (time - lastProps > propInterval && dampField(current, shaderTarget(), Math.min((time - lastProps) / 1000, .25))) { lastProps = time; setField({ ...current }); }
      get().advance(elapsed, false);
      canvas.dataset.frames = String(++rendered); canvas.dataset.fps = String(fps);
      canvas.dataset.geometries = String(state.gl.info.memory.geometries); canvas.dataset.textures = String(state.gl.info.memory.textures); canvas.dataset.draws = String(state.gl.info.render.calls);
      canvas.dataset.strength = current.uStrength.toFixed(3); canvas.dataset.density = current.uDensity.toFixed(3);
      canvas.closest('.shader-atmosphere')?.setAttribute('data-rendered', 'true');
    }, 20);
    return () => { unsubscribe(); canvas.removeEventListener('webglcontextlost', lost); state.gl.dispose(); state.gl.forceContextLoss(); };
  }, [get]);
  return <Gradient field={field} />;
}
export default function ShaderRenderer() {
  return <ShaderGradientCanvas className="atmosphere-canvas" style={{ position: 'absolute', inset: 0 }} pixelDensity={1} fov={45} pointerEvents="none" powerPreference="low-power" lazyLoad={false}><ClockBridge /></ShaderGradientCanvas>;
}
