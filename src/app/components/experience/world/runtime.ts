import palette from "@/lib/palette.json";
import * as THREE from "three";
import { createMaterials } from "./materials";
import { buildEnvironment } from "./environment";
import { buildExhibits } from "./exhibits";
import { createCameraController, CAMERA_NAMES } from "./camera";
import { createInteraction } from "./interaction";
import { batchGeometry } from "./optimize";
import type { WorldState, WorldEvent } from "./state";
import { onExperienceFrame } from '../director/clock';
import { experience } from '../director/experience-director';
export type WorldRuntime = ReturnType<typeof createWorld>;
export function createWorld(
  canvas: HTMLCanvasElement,
  markers: (HTMLButtonElement | null)[],
  dispatch: (event: WorldEvent) => void,
  getState: () => WorldState,
) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setClearColor(palette["black"], 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(palette["black"], 48, 95);
  const fogBase = new THREE.Color(palette.black), fogEnergy = new THREE.Color(palette['blue-black']);
  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 150);
  let mobile = canvas.clientWidth < 700;
  const constrained = experience.snapshot.tier === 'C';
  const materials = createMaterials();
  const room = buildEnvironment(scene, materials, mobile || constrained);
  const exhibits = buildExhibits(scene, materials);
  batchGeometry(room);
  exhibits.forEach((exhibit) => batchGeometry(exhibit.group));
  scene.add(new THREE.HemisphereLight(palette["bone"], palette["surface"], 2.3));
  const key = new THREE.DirectionalLight(palette["soft-white"], 3.5);
  key.position.set(-8, 18, 8);
  key.castShadow = true;
  key.shadow.mapSize.set(mobile || constrained ? 1024 : 2048, mobile || constrained ? 1024 : 2048);
  Object.assign(key.shadow.camera, {
    left: -23,
    right: 23,
    top: 23,
    bottom: -23,
    near: 1,
    far: 55,
  });
  key.shadow.normalBias = 0.045;
  key.shadow.bias = -0.00015;
  scene.add(key);
  const fill = new THREE.DirectionalLight(palette["light-muted"], 1.8);
  fill.position.set(8, 9, -8);
  scene.add(fill);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  const controller = createCameraController(camera, mobile),
    interaction = createInteraction(camera, exhibits),
    pointer = new THREE.Vector2();
  let frame = 0,
    last = 0,
    disposed = false,
    visible = true,
    settledSent = false,
    selectedKey = "";
  let quality = constrained ? .82 : 1,
    slowFrames = 0,
    renderedFrames = 0,
    wasMoving = false;
  const projected = new THREE.Vector3();
  const schedule = () => {
    if (!frame && !disposed && visible && !document.hidden)
      frame = 1;
  };
  const draw = (time: number) => {
    frame = 0;
    if (disposed || !visible || document.hidden || experience.snapshot.locked) return;
    const state = getState(),
      dt = last && time - last < 250 ? Math.min((time - last) / 1000, 0.25) : 1 / 60;
    last = time;
    // Adapt pixel count, never replace the mobile world with a static picture.
    if (wasMoving && dt > 0.055) slowFrames++;
    else slowFrames = Math.max(0, slowFrames - 1);
    if (slowFrames >= 20 && experience.snapshot.tier !== 'D') {
      experience.publish({ tier: 'D' });
      slowFrames = 0;
    } else if (slowFrames >= 20 && quality > 0.65) {
      quality = Math.max(0.65, quality * 0.82);
      slowFrames = 0;
      renderer.setPixelRatio(
        Math.min(devicePixelRatio, mobile ? 1.25 : 1.65) * quality,
      );
    }
    const keyName =
      state.selected === null
        ? state.progress > 0.06
          ? "EDITORIAL"
          : "HOME"
        : CAMERA_NAMES[state.selected];
    if (keyName !== selectedKey) {
      selectedKey = keyName;
      settledSent = false;
    }
    const moving = controller.step(experience.snapshot.departing ? { ...state, selected: null, progress: 1 } : state, mobile, pointer, dt);
    wasMoving = moving;
    // Projection must use this frame's orientation, including instant/reduced
    // camera changes; renderer.render would otherwise update it too late.
    camera.updateMatrixWorld();
    const accent = experience.accent;
    scene.fog!.color.copy(fogBase).lerp(fogEnergy, accent);
    // Read layout once, before writing any projected marker styles.
    const width = canvas.clientWidth, height = canvas.clientHeight;
    for (let i = 0; i < exhibits.length; i++) {
      const active = state.hovered === i || state.selected === i;
      exhibits[i].highlight.emissiveIntensity = active ? .7 + accent * .1 : 0;
      const marker = markers[i];
      if (marker) {
        projected.copy(exhibits[i].anchor).project(camera);
        const x = (projected.x * 0.5 + 0.5) * width,
          y = (-projected.y * 0.5 + 0.5) * height;
        marker.style.transform = `translate3d(${x}px,${y}px,0)`;
        marker.style.visibility =
          state.selected === null &&
          state.progress < 0.4 &&
          projected.z < 1 &&
          x > 20 &&
          x < width - 20 &&
          y > 150 &&
          y < height - 150
            ? "visible"
            : "hidden";
      }
    }
    renderer.render(scene, camera);
    canvas.dataset.camera = keyName;
    canvas.dataset.draws = String(renderer.info.render.calls);
    canvas.dataset.frames = String(++renderedFrames);
    canvas.dataset.quality = quality.toFixed(2);
    canvas.dataset.geometries = String(renderer.info.memory.geometries);
    canvas.dataset.textures = String(renderer.info.memory.textures);
    canvas.dataset.position = camera.position
      .toArray()
      .map((n) => n.toFixed(2))
      .join(",");
    if (moving) schedule();
    else if (!settledSent) {
      settledSent = true;
      dispatch({ type: "SETTLED" });
    }
  };
  const resize = () => {
    mobile = canvas.clientWidth < 700;
    renderer.setPixelRatio(
      Math.min(devicePixelRatio, mobile ? 1.25 : 1.65) * quality,
    );
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    schedule();
  };
  const hover = (index: number | null) => {
    if (index !== getState().hovered) {
      dispatch({ type: "HOVER", index });
    }
    canvas.style.cursor = index === null ? "default" : "pointer";
  };
  const move = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    const b = canvas.getBoundingClientRect();
    pointer.set(
      ((event.clientX - b.left) / b.width) * 2 - 1,
      ((event.clientY - b.top) / b.height) * 2 - 1,
    );
    if (getState().selected === null)
      hover(interaction.hit(event.clientX, event.clientY, b));
    schedule();
  };
  const leave = () => {
    pointer.set(0, 0);
    hover(null);
    schedule();
  };
  let down: [number, number] | null = null;
  const pointerDown = (e: PointerEvent) => {
    down = [e.clientX, e.clientY];
  };
  const click = (event: PointerEvent) => {
    if (
      !down ||
      Math.hypot(event.clientX - down[0], event.clientY - down[1]) > 12
    )
      return;
    const index = interaction.hit(
      event.clientX,
      event.clientY,
      canvas.getBoundingClientRect(),
    );
    if (index !== null) {
      dispatch({ type: "SELECT", index });
      settledSent = false;
      schedule();
    }
    down = null;
  };
  const contextLost = (event: Event) => {
    event.preventDefault();
    dispatch({ type: "FAILED" });
  };
  const visibility = () => {
    last = 0;
    schedule();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  const intersection = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (visible) {
      last = 0;
      schedule();
    } else {
      frame = 0;
    }
  });
  intersection.observe(canvas);
  canvas.addEventListener("pointermove", move);
  canvas.addEventListener("pointerleave", leave);
  canvas.addEventListener("pointerdown", pointerDown);
  canvas.addEventListener("pointerup", click);
  canvas.addEventListener("webglcontextlost", contextLost);
  document.addEventListener("visibilitychange", visibility);
  let previousProgress = -1, previousAccent = -1, wasLocked = false;
  const unsubscribe = onExperienceFrame(time => {
    if (wasLocked && !experience.snapshot.locked) schedule();
    wasLocked = experience.snapshot.locked;
    const progress = getState().progress;
    if (Math.abs(progress - previousProgress) > .0005 || Math.abs(experience.accent - previousAccent) > .006) {
      previousProgress = progress; previousAccent = experience.accent; schedule();
    }
    if (frame) draw(time);
  });
  resize();
  return {
    update() {
      settledSent = false;
      schedule();
    },
    dispose() {
      disposed = true;
      unsubscribe();
      observer.disconnect();
      intersection.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("pointerdown", pointerDown);
      canvas.removeEventListener("pointerup", click);
      canvas.removeEventListener("webglcontextlost", contextLost);
      document.removeEventListener("visibilitychange", visibility);
      const geometries = new Set<THREE.BufferGeometry>(),
        mats = new Set<THREE.Material>();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
          geometries.add(object.geometry);
          for (const mat of Array.isArray(object.material)
            ? object.material
            : [object.material])
            mats.add(mat);
        }
      });
      geometries.forEach((g) => g.dispose());
      mats.forEach((m) => {
        const mat = m as THREE.MeshStandardMaterial;
        mat.map?.dispose();
        m.dispose();
      });
      renderer.dispose();
      key.shadow.dispose();
      renderer.forceContextLoss();
    },
  };
}
