import palette from "@/lib/palette.json";
import * as THREE from "three";
import { box, round, line } from "./geometry";
import { lettering, type Materials } from "./materials";

export const EXHIBIT_POSITIONS: [number, number, number][] = [
  [-7, 0, 3.4],
  [0, 0, -0.3],
  [7, 0, 2.8],
  [-7.5, 0, -5.2],
  [-1.4, 0, -6.9],
  [6.5, 0, -5.9],
  [0.7, 0, 6.3],
];
export type Exhibit = {
  group: THREE.Group;
  anchor: THREE.Vector3;
  highlight: THREE.MeshStandardMaterial;
};
export function buildExhibits(scene: THREE.Scene, m: Materials): Exhibit[] {
  return EXHIBIT_POSITIONS.map((position, index) => {
    const group = new THREE.Group();
    group.position.set(...position);
    group.userData.exhibit = index;
    scene.add(group);
    const highlight = m.brass.clone();
    highlight.emissive.set(palette["citron"]);
    highlight.emissiveIntensity = 0;
    box(group, highlight, [3.2, 0.035, 0.09], [0, 0.035, 1.9]);
    const plaque = new THREE.Mesh(
      new THREE.PlaneGeometry(0.72, 0.36),
      lettering(["I", "II", "III", "IV", "V", "VI", "VII"][index]),
    );
    plaque.rotation.x = -Math.PI / 2;
    plaque.position.set(0, 0.07, 2.18);
    group.add(plaque);
    const desk = (w = 3.5, d = 2.3) => {
      box(group, m.dark, [w, 0.18, d], [0, 1.45, 0]);
      for (const x of [-w / 2 + 0.15, w / 2 - 0.15])
        box(group, m.metal, [0.12, 1.4, d - 0.1], [x, 0.7, 0]);
    };
    if (index === 0) {
      desk(4.6, 2.7);
      for (let pile = 0; pile < 4; pile++)
        for (let leaf = 0; leaf < 7 + pile * 3; leaf++) {
          box(
            group,
            leaf % 5 === 0 ? m.ink : m.paper,
            [0.83, 0.048, 1.2],
            [
              -1.6 + pile * 1.04,
              1.57 + leaf * 0.061,
              Math.sin(leaf * 3) * 0.06,
            ],
            Math.sin(leaf + pile) * 0.07,
          );
        }
      box(group, m.brass, [0.05, 2.1, 0.05], [-1.8, 2.45, -0.95]);
      box(group, m.brass, [1.35, 0.06, 0.06], [-1.2, 3.48, -0.95]);
      box(group, m.light, [0.8, 0.05, 0.45], [-0.75, 3.43, -0.95]);
    } else if (index === 1) {
      round(group, m.dark, 1.25, 1.4, [0, 0.7, 0]);
      round(group, m.brass, 2.55, 0.18, [0, 1.45, 0]);
      round(group, m.ink, 2.48, 0.12, [0, 1.59, 0]);
      box(group, m.dark, [2.6, 1.65, 0.35], [0, 2.6, -0.55]);
      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(2.35, 1.35),
        lettering("0.73", 512, 256, palette["bone"], palette["carbon"]),
      );
      screen.position.set(0, 2.62, -0.365);
      group.add(screen);
      box(group, m.metal, [0.18, 0.7, 0.2], [0, 1.95, -0.55]);
      for (let i = 0; i < 8; i++)
        box(
          group,
          i > 4 ? m.clay : m.paper,
          [0.18, 0.15 + i * 0.075, 0.18],
          [-0.95 + i * 0.27, 1.78 + i * 0.0375, 0.7],
        );
      for (let i = 0; i < 24; i++) {
        const a = (i / 24) * Math.PI * 2;
        box(
          group,
          m.paper,
          [0.025, 0.01, 0.17],
          [Math.cos(a) * 2.2, 1.66, Math.sin(a) * 2.2],
          -a,
        );
      }
    } else if (index === 2) {
      desk(4.3, 2.6);
      for (let n = 0; n < 3; n++) {
        const board = new THREE.Group();
        board.position.set(-1.3 + n * 1.3, 1.65, -0.2);
        board.rotation.x = -0.35;
        group.add(board);
        box(board, m.paper, [1.12, 1.65, 0.09], [0, 0.65, 0]);
        for (let row = 0; row < 4; row++)
          for (let col = 0; col < 3; col++)
            box(
              board,
              (row + col + n) % 4 === 0 ? m.clay : m.ink,
              [0.2, 0.18, 0.015],
              [-0.3 + col * 0.3, 0.25 + row * 0.3, 0.06],
            );
      }
      box(group, m.brass, [3.9, 0.06, 0.06], [0, 3.35, -0.8]);
    } else if (index === 3) {
      box(group, m.dark, [4.4, 0.4, 2.8], [0, 0.2, 0]);
      for (const side of [-1, 1]) {
        const book = new THREE.Group();
        book.position.set(side * 1.02, 0.4, 0);
        book.rotation.y = side * -0.18;
        group.add(book);
        box(book, m.paper, [1.5, 2.6, 0.65], [0, 1.4, 0]);
        for (const z of [-0.39, 0.39])
          box(
            book,
            side < 0 ? m.clay : m.blue,
            [1.75, 2.9, 0.12],
            [0, 1.45, z],
          );
        box(book, m.brass, [0.7, 0.04, 0.03], [0, 1.7, 0.46]);
        box(book, m.brass, [0.7, 0.04, 0.03], [0, 1.5, 0.46]);
      }
      box(group, m.light, [0.06, 3.6, 0.06], [0, 1.9, -0.6]);
    } else if (index === 4) {
      box(group, m.dark, [4.5, 3.5, 0.28], [0, 2.6, 0]);
      for (const x of [-1.85, 1.85])
        box(group, m.metal, [0.13, 1.2, 0.13], [x, 0.6, 0]);
      for (let row = 0; row < 3; row++)
        for (let col = 0; col < 5; col++) {
          box(
            group,
            (row + col) % 4 === 0 ? m.clay : m.paper,
            [0.58, 0.72, 0.05],
            [-1.6 + col * 0.8, 1.6 + row * 0.95, 0.17],
            Math.sin(row + col) * 0.045,
          );
          if (col < 4)
            line(
              group,
              [
                [-1.6 + col * 0.8, 1.6 + row * 0.95, 0.21],
                [-0.8 + col * 0.8, 1.6 + ((row + 1) % 3) * 0.95, 0.21],
              ],
              palette["light-muted"],
            );
        }
      box(group, m.light, [4.4, 0.07, 0.35], [0, 4.42, 0.2]);
    } else if (index === 5) {
      for (let i = 0; i < 6; i++)
        box(
          group,
          i === 5 ? m.brass : m.wall,
          [0.62, 0.35 + i * 0.43, 2.3],
          [-1.6 + i * 0.65, (0.35 + i * 0.43) / 2, 0],
        );
      box(group, m.dark, [0.14, 4.2, 0.14], [2.1, 2.1, -1.3]);
      box(group, m.dark, [0.14, 4.2, 0.14], [2.1, 2.1, 1.3]);
      box(group, m.light, [0.18, 0.1, 2.75], [2.1, 4.2, 0]);
      line(
        group,
        [
          [-2, 0.8, 1.3],
          [1.8, 3.2, 1.3],
        ],
        palette["bone"],
      );
    } else {
      box(group, m.dark, [3.5, 0.45, 3], [0, 0.225, 0]);
      box(group, m.ink, [2.8, 0.85, 2.3], [0, 0.87, 0]);
      for (const x of [-1.4, 1.4])
        for (const z of [-1.15, 1.15])
          box(group, m.brass, [0.06, 2.5, 0.06], [x, 2.1, z]);
      for (const y of [1, 3.35]) {
        for (const z of [-1.15, 1.15])
          box(group, m.brass, [2.85, 0.055, 0.055], [0, y, z]);
        for (const x of [-1.4, 1.4])
          box(group, m.brass, [0.055, 0.055, 2.3], [x, y, 0]);
      }
      box(group, m.glass, [2.77, 2.32, 2.25], [0, 2.14, 0]);
      const geometry = new THREE.IcosahedronGeometry(0.88, 0);
      const model = new THREE.Mesh(geometry, m.ink);
      model.position.y = 2.2;
      model.rotation.set(0.2, 0.4, 0.3);
      group.add(model);
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(geometry),
        new THREE.LineBasicMaterial({ color: palette["electric-blue"] }),
      );
      model.add(edges);
      round(group, m.brass, 0.45, 0.08, [0, 1.38, 0]);
    }
    group.traverse((object) => {
      object.userData.exhibit = index;
    });
    return {
      group,
      anchor: new THREE.Vector3(
        position[0],
        index === 4 ? 4.8 : 3.9,
        position[2],
      ),
      highlight,
    };
  });
}
