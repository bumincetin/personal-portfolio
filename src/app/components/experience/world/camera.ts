import * as THREE from "three";
import { EXHIBIT_POSITIONS } from "./exhibits";

export function cameraPose(selected: number | null, portrait: boolean) {
  if (selected !== null) {
    const [x, , z] = EXHIBIT_POSITIONS[selected];
    return {
      position: new THREE.Vector3(
        x + 5,
        portrait ? 8.5 : 7,
        z + (portrait ? 12 : 9),
      ),
      target: new THREE.Vector3(x, selected === 4 ? 2.5 : 1.8, z),
    };
  }
  return {
    position: new THREE.Vector3(
      ...((portrait ? [27, 29, 40] : [21, 22, 32]) as [number, number, number]),
    ),
    target: new THREE.Vector3(0, 1, -1),
  };
}
