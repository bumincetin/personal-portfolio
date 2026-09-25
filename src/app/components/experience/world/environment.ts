import * as THREE from "three";
import { box, round } from "./geometry";
import { lettering, type Materials } from "./materials";

export function buildEnvironment(
  scene: THREE.Scene,
  m: Materials,
  mobile: boolean,
) {
  const room = new THREE.Group();
  scene.add(room);
  box(room, m.dark, [28, 0.5, 23], [0, -0.45, 0]);
  box(room, m.floor, [27, 0.22, 22], [0, -0.12, 0]);
  for (let x = -12; x <= 12; x += 2)
    box(room, m.metal, [0.025, 0.012, 22], [x, 0.005, 0]);
  for (let z = -10; z <= 10; z += 2)
    box(room, m.metal, [27, 0.012, 0.025], [0, 0.006, z]);
  box(room, m.dark, [27, 7, 0.45], [0, 3.5, -10.7]);
  box(room, m.wall, [0.45, 7, 22], [-13.6, 3.5, 0]);
  box(room, m.dark, [0.4, 4.4, 9], [13.6, 2.2, -6.1]);
  for (let x = -13; x <= 13; x += 1.3)
    box(room, m.wall, [0.16, 6.9, 0.42], [x, 3.45, -10.25]);
  box(room, m.light, [13.8, 1.6, 0.1], [2, 5.5, -10.41]);
  for (let x = -5; x <= 9; x += 1.4)
    box(room, m.dark, [0.07, 1.85, 0.2], [x, 5.5, -10.2]);
  box(room, m.brass, [27.3, 0.12, 0.12], [0, 6.7, -10.2]);
  const sign = new THREE.Mesh(
    new THREE.PlaneGeometry(8.1, 0.7),
    lettering("BUMIN CETIN / I — VII", 1536, 128),
  );
  sign.position.set(0, 3.95, -10.35);
  room.add(sign);
  // Recessed archive wall with individual metal shelves and file spines.
  for (let z = -7; z <= 5; z += 3) {
    box(room, m.dark, [1.3, 4.4, 2.6], [-12.5, 2.2, z]);
    for (let row = 0; row < 4; row++) {
      box(room, m.metal, [1.4, 0.07, 2.6], [-12.3, 0.35 + row, z]);
      const count = mobile ? 4 : 8;
      for (let j = 0; j < count; j++)
        box(
          room,
          (j + row) % 3 ? m.paper : m.ink,
          [0.7, 0.55 + ((j * 7 + row) % 3) * 0.1, 0.16],
          [-12.1, 0.7 + row, z - 1 + j * (2 / count)],
          (j % 3) * 0.015,
        );
    }
  }
  for (const x of [-12.2, 12.2]) {
    box(room, m.wall, [0.8, 3.8, 0.8], [x, 1.9, 9]);
    box(room, m.light, [0.05, 2.7, 0.1], [x - 0.43, 2, 9]);
    box(room, m.dark, [4, 0.18, 0.18], [x > 0 ? 10.4 : -10.4, 0.65, 9]);
  }
  // Suspended luminaires cast scale cues across the open room.
  for (const x of [-5.8, 5.8]) {
    box(room, m.dark, [0.26, 0.18, 8], [x, 7.2, -2]);
    box(room, m.light, [0.18, 0.035, 7.8], [x, 7.08, -2]);
    for (const z of [-5.5, 1.5])
      box(room, m.metal, [0.025, 1.4, 0.025], [x, 7.8, z]);
  }
  round(room, m.dark, 3.75, 0.035, [0, 0.025, 0]);
  round(room, m.brass, 3.64, 0.04, [0, 0.035, 0]);
  round(room, m.floor, 3.59, 0.05, [0, 0.045, 0]);
  return room;
}
