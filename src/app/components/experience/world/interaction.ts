import * as THREE from "three";
import type { Exhibit } from "./exhibits";
export function createInteraction(camera: THREE.Camera, exhibits: Exhibit[]) {
  const raycaster = new THREE.Raycaster(),
    pointer = new THREE.Vector2();
  return {
    hit(x: number, y: number, bounds: DOMRect): number | null {
      pointer.set(
        ((x - bounds.left) / bounds.width) * 2 - 1,
        (-(y - bounds.top) / bounds.height) * 2 + 1,
      );
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(
        exhibits.map((e) => e.group),
        true,
      )[0];
      return hit ? (hit.object.userData.exhibit as number) : null;
    },
  };
}
