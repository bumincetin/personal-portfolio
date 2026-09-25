import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/** Bake static leaf meshes per material, retaining each exhibit as a raycast group. */
export function batchGeometry(root: THREE.Object3D) {
  root.updateWorldMatrix(true, true);
  const inverse = root.matrixWorld.clone().invert();
  const batches = new Map<
    THREE.Material,
    { source: THREE.Mesh[]; geometry: THREE.BufferGeometry[] }
  >();
  root.traverse((object) => {
    if (
      !(object instanceof THREE.Mesh) ||
      Array.isArray(object.material) ||
      object.children.length
    )
      return;
    const material = object.material as THREE.Material;
    let batch = batches.get(material);
    if (!batch) {
      batch = { source: [], geometry: [] };
      batches.set(material, batch);
    }
    batch.source.push(object);
    batch.geometry.push(
      object.geometry
        .clone()
        .applyMatrix4(
          new THREE.Matrix4().multiplyMatrices(inverse, object.matrixWorld),
        ),
    );
  });
  for (const [material, batch] of batches) {
    if (batch.source.length < 2) {
      batch.geometry.forEach((g) => g.dispose());
      continue;
    }
    const geometry = mergeGeometries(batch.geometry, false);
    batch.geometry.forEach((g) => g.dispose());
    if (!geometry) continue;
    batch.source.forEach((mesh) => {
      mesh.removeFromParent();
      mesh.geometry.dispose();
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData.exhibit = root.userData.exhibit;
    root.add(mesh);
  }
}
