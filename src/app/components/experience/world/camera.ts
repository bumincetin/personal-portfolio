import * as THREE from "three";
import { EXHIBIT_POSITIONS } from "./exhibits";
import type { WorldState } from "./state";
export type Pose = {
  position: THREE.Vector3;
  target: THREE.Vector3;
  fov: number;
};
export const CAMERA_NAMES = [
  "VOLUME_01",
  "VOLUME_02",
  "VOLUME_03",
  "VOLUME_04",
  "VOLUME_05",
  "VOLUME_06",
  "VOLUME_07",
] as const;
const pose = (p: number[], t: number[], fov: number): Pose => ({
  position: new THREE.Vector3(...(p as [number, number, number])),
  target: new THREE.Vector3(...(t as [number, number, number])),
  fov,
});
export function cameraPose(state: WorldState, mobile: boolean): Pose {
  if (state.selected !== null) {
    const p = EXHIBIT_POSITIONS[state.selected];
    const offsets = [
      [4, 5, 7],
      [4, 4.7, 7],
      [4, 4.5, 7],
      [3.2, 4, 7],
      [2, 4.3, 4.5],
      [5, 4.8, 7],
      [4, 4.2, 6.7],
    ];
    const o = offsets[state.selected];
    return pose(
      [p[0] + o[0], o[1] + (mobile ? 1.8 : 0), p[2] + o[2] + (mobile ? 2 : 0)],
      [
        p[0] + (mobile ? 0 : 1.4),
        state.selected === 4 ? (mobile ? 1.7 : 2.5) : mobile ? 0.7 : 1.6,
        p[2],
      ],
      mobile ? 49 : 48,
    );
  }
  const home = mobile
    ? pose([20, 23, 31], [0, 1, 0], 48)
    : pose([11, 8.5, 17], [0, 2, -2], 58);
  const editorial = mobile
    ? pose([10, 33, 24], [0, 0, -2], 51)
    : pose([6, 29, 21], [0, 0, -2], 48);
  home.position.lerp(editorial.position, state.progress);
  home.target.lerp(editorial.target, state.progress);
  home.fov = THREE.MathUtils.lerp(home.fov, editorial.fov, state.progress);
  return home;
}
export function createCameraController(
  camera: THREE.PerspectiveCamera,
  mobile: boolean,
) {
  const current = cameraPose(
    {
      phase: "HOME",
      selected: null,
      hovered: null,
      progress: 0,
      reduced: false,
    },
    mobile,
  );
  current.position.add(new THREE.Vector3(2, 3.5, 4));
  current.fov += 3;
  camera.position.copy(current.position);
  camera.lookAt(current.target);
  let transition = "",
    transitionStarted = performance.now();
  return {
    step(
      state: WorldState,
      portrait: boolean,
      pointer: THREE.Vector2,
      dt: number,
    ) {
      const next = cameraPose(state, portrait);
      if (!state.reduced && state.selected === null && state.progress < 0.1) {
        next.position.x += pointer.x * 0.55;
        next.position.y -= pointer.y * 0.3;
      }
      const nextTransition = `${state.phase}:${state.selected ?? "home"}`;
      if (nextTransition !== transition) {
        transition = nextTransition;
        transitionStarted = performance.now();
      }
      const bounded =
        (state.phase === "INTRO" &&
          performance.now() - transitionStarted > 1900) ||
        (state.phase === "TRANSITIONING" &&
          performance.now() - transitionStarted > 650);
      const alpha =
        state.reduced || bounded
          ? 1
          : 1 -
            Math.exp(-Math.min(dt, 0.25) * (state.phase === "INTRO" ? 3.5 : 10));
      current.position.lerp(next.position, alpha);
      current.target.lerp(next.target, alpha);
      current.fov = THREE.MathUtils.lerp(current.fov, next.fov, alpha);
      camera.position.copy(current.position);
      camera.fov = current.fov;
      camera.updateProjectionMatrix();
      camera.lookAt(current.target);
      return (
        current.position.distanceTo(next.position) > 0.008 ||
        current.target.distanceTo(next.target) > 0.005 ||
        Math.abs(current.fov - next.fov) > 0.005
      );
    },
  };
}
