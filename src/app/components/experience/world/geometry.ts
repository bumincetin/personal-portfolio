import * as THREE from "three";
export function box(
  parent: THREE.Object3D,
  material: THREE.Material,
  size: number[],
  position: number[],
  rotation = 0,
) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(...(size as [number, number, number])),
    material,
  );
  mesh.position.set(position[0], position[1], position[2]);
  mesh.rotation.y = rotation;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}
export function round(
  parent: THREE.Object3D,
  material: THREE.Material,
  radius: number,
  height: number,
  position: number[],
) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, height, 32),
    material,
  );
  mesh.position.set(position[0], position[1], position[2]);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}
export function line(
  parent: THREE.Object3D,
  points: number[][],
  color: string,
) {
  const geometry = new THREE.BufferGeometry().setFromPoints(
    points.map((p) => new THREE.Vector3(...(p as [number, number, number]))),
  );
  const mesh = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color }));
  parent.add(mesh);
  return mesh;
}
