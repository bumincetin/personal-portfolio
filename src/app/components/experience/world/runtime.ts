import * as THREE from "three";
import palette from "@/lib/palette.json";
import { createMaterials } from "./materials";
import { buildEnvironment } from "./environment";
import { buildExhibits } from "./exhibits";
import { batchGeometry } from "./optimize";
import { createInteraction } from "./interaction";
import { cameraPose } from "./camera";

/** An on-demand scene. Wheel and touch scrolling belong entirely to the browser. */
export function createWorld(
  canvas: HTMLCanvasElement,
  onSelect: (index: number) => void,
  onFailure: () => void,
  reduced: boolean,
) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setClearColor(palette.black, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  const scene = new THREE.Scene();
  const materials = createMaterials();
  const room = buildEnvironment(scene, materials, canvas.clientWidth < 600);
  const exhibits = buildExhibits(scene, materials);
  batchGeometry(room);
  exhibits.forEach((exhibit) => batchGeometry(exhibit.group));
  scene.add(new THREE.HemisphereLight(palette.surface, palette.apricot, 2));
  const key = new THREE.DirectionalLight(palette.surface, 3);
  key.position.set(-8, 22, 12);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, {
    left: -25,
    right: 25,
    top: 25,
    bottom: -25,
    near: 1,
    far: 70,
  });
  key.shadow.bias = -0.0005;
  key.shadow.normalBias = 0.03;
  scene.add(key);
  const fill = new THREE.DirectionalLight(palette.surface, 1.1);
  fill.position.set(10, 10, -8);
  scene.add(fill);

  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 150);
  const initial = cameraPose(
    null,
    canvas.clientWidth / canvas.clientHeight < 1.2,
  );
  camera.position.copy(initial.position);
  const target = initial.target.clone();
  const interaction = createInteraction(camera, exhibits);
  let selected: number | null = null,
    hovered: number | null = null;
  let frame = 0,
    disposed = false,
    visible = true,
    previous = 0,
    frames = 0;
  let start: { x: number; y: number; scroll: number } | null = null;

  function schedule() {
    if (!disposed && visible && !document.hidden && !frame)
      frame = requestAnimationFrame(render);
  }
  function render(now: number) {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    const pose = cameraPose(
      selected,
      canvas.clientWidth / canvas.clientHeight < 1.2,
    );
    const dt = previous ? Math.min((now - previous) / 1000, 0.05) : 1 / 60;
    previous = now;
    const alpha = reduced ? 1 : 1 - Math.exp(-4.2 * dt);
    camera.position.lerp(pose.position, alpha);
    target.lerp(pose.target, alpha);
    camera.lookAt(target);
    exhibits.forEach((exhibit, i) => {
      exhibit.highlight.emissiveIntensity =
        i === (selected ?? hovered) ? 0.5 : 0;
    });
    renderer.render(scene, camera);
    canvas.dataset.frames = String(++frames);
    canvas.dataset.camera = selected === null ? "home" : String(selected);
    canvas.dataset.draws = String(renderer.info.render.calls);
    const moving =
      camera.position.distanceTo(pose.position) > 0.008 ||
      target.distanceTo(pose.target) > 0.005;
    canvas.dataset.settled = String(!moving);
    if (moving) schedule();
  }
  function resize() {
    const width = canvas.clientWidth,
      height = canvas.clientHeight;
    if (!width || !height) return;
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, width < 600 ? 1.25 : 1.5),
    );
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    schedule();
  }
  function pointerMove(event: PointerEvent) {
    if (event.pointerType !== "mouse" || event.buttons) return;
    const next = interaction.hit(
      event.clientX,
      event.clientY,
      canvas.getBoundingClientRect(),
    );
    if (next !== hovered) {
      hovered = next;
      canvas.style.cursor = next === null ? "default" : "pointer";
      schedule();
    }
  }
  function pointerLeave() {
    hovered = null;
    start = null;
    schedule();
  }
  function pointerDown(event: PointerEvent) {
    if (event.isPrimary && event.button === 0)
      start = { x: event.clientX, y: event.clientY, scroll: window.scrollY };
  }
  function pointerUp(event: PointerEvent) {
    if (
      start &&
      Math.hypot(event.clientX - start.x, event.clientY - start.y) < 10 &&
      Math.abs(window.scrollY - start.scroll) < 4
    ) {
      const hit = interaction.hit(
        event.clientX,
        event.clientY,
        canvas.getBoundingClientRect(),
      );
      if (hit !== null) onSelect(hit);
    }
    start = null;
  }
  function contextLost(event: Event) {
    event.preventDefault();
    onFailure();
  }
  function visibility() {
    if (document.hidden && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
    previous = 0;
    schedule();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (!visible && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
    previous = 0;
    schedule();
  });
  intersection.observe(canvas);
  canvas.addEventListener("pointermove", pointerMove);
  canvas.addEventListener("pointerleave", pointerLeave);
  canvas.addEventListener("pointerdown", pointerDown);
  canvas.addEventListener("pointerup", pointerUp);
  canvas.addEventListener("pointercancel", pointerLeave);
  canvas.addEventListener("webglcontextlost", contextLost);
  document.addEventListener("visibilitychange", visibility);
  resize();

  return {
    update(index: number | null, prefersReduced: boolean) {
      selected = index;
      reduced = prefersReduced;
      previous = 0;
      schedule();
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerleave", pointerLeave);
      canvas.removeEventListener("pointerdown", pointerDown);
      canvas.removeEventListener("pointerup", pointerUp);
      canvas.removeEventListener("pointercancel", pointerLeave);
      canvas.removeEventListener("webglcontextlost", contextLost);
      document.removeEventListener("visibilitychange", visibility);
      const geometries = new Set<THREE.BufferGeometry>();
      const allMaterials = new Set<THREE.Material>(Object.values(materials));
      const textures = new Set<THREE.Texture>();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
          geometries.add(object.geometry);
          (Array.isArray(object.material)
            ? object.material
            : [object.material]
          ).forEach((material: THREE.Material) => allMaterials.add(material));
        }
      });
      allMaterials.forEach((material) => {
        Object.values(material).forEach((value) => {
          if (value instanceof THREE.Texture) textures.add(value);
        });
        material.dispose();
      });
      geometries.forEach((geometry) => geometry.dispose());
      textures.forEach((texture) => texture.dispose());
      key.shadow.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
export type WorldRuntime = ReturnType<typeof createWorld>;
