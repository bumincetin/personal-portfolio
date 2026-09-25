import * as THREE from 'three';

/** One local scene, no remote assets. Animation stops offscreen and when paused. */
export function createNeuronScene(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 60);
  camera.position.set(4.8, 5.5, 7.8);
  camera.lookAt(0, 0.7, 0);
  scene.add(new THREE.HemisphereLight(0xffead0, 0x32221d, 2.6));
  const key = new THREE.DirectionalLight(0xffd9a3, 4); key.position.set(-3, 6, 4); scene.add(key);
  const rim = new THREE.DirectionalLight(0x83c7c5, 2); rim.position.set(3, 3, -4); scene.add(rim);
  const book = new THREE.Group(); scene.add(book); book.rotation.y = -0.2;
  const paper = new THREE.MeshStandardMaterial({ color: 0xe9dcca, roughness: 0.88, side: THREE.DoubleSide });
  const leather = new THREE.MeshStandardMaterial({ color: 0x355c57, roughness: 0.6, metalness: 0.15 });
  const gilt = new THREE.MeshStandardMaterial({ color: 0xb98c50, roughness: 0.35, metalness: 0.72 });
  const ink = new THREE.LineBasicMaterial({ color: 0x8a7a66, transparent: true, opacity: 0.38 });
  function sheet(side: number, lift: number) {
    const geo = new THREE.PlaneGeometry(2.3, 3.15, 28, 1);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const u = (pos.getX(i) + 1.15) / 2.3;
      const z = pos.getY(i);
      pos.setXYZ(i, side * (0.035 + u * 2.3), lift + Math.sin(u * Math.PI) * 0.17 + u * u * 0.4, z);
    }
    geo.computeVertexNormals();
    return geo;
  }
  for (const side of [-1, 1]) {
    const cover = new THREE.Mesh(new THREE.BoxGeometry(2.46, 0.13, 3.4), leather);
    cover.position.set(side * 1.21, 0.08, 0); cover.rotation.z = side * 0.17; book.add(cover);
    for (let i = 0; i < 7; i++) {
      const page = new THREE.Mesh(sheet(side, 0.08 + i * 0.028), paper); book.add(page);
    }
    // Small lines of type follow the curvature of the uppermost page.
    for (let line = 0; line < 15; line++) {
      const points = [];
      const end = line % 5 === 4 ? 0.67 : 0.89;
      for (let u = 0.15; u <= end; u += 0.04) points.push(new THREE.Vector3(side * (0.035 + u * 2.3), 0.258 + Math.sin(u * Math.PI) * 0.17 + u * u * 0.4, -1.13 + line * 0.155));
      book.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), ink));
    }
    const edge = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.027, 3.3), gilt);
    edge.position.set(side * 2.37, 0.31, 0); book.add(edge);
  }
  const spine = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 3.4, 16), leather);
  spine.rotation.x = Math.PI / 2; spine.position.y = 0.015; book.add(spine);

  const neuron = new THREE.Group(); neuron.position.y = 1.6; book.add(neuron);
  const glowMaterial = new THREE.MeshStandardMaterial({ color: 0xffdca1, emissive: 0xd38c40, emissiveIntensity: 1.3, roughness: 0.4, metalness: 0.25 });
  const nucleus = new THREE.Mesh(new THREE.IcosahedronGeometry(0.31, 3), glowMaterial); neuron.add(nucleus);
  const membrane = new THREE.Mesh(new THREE.IcosahedronGeometry(0.43, 2), new THREE.MeshBasicMaterial({ color: 0xe8bc79, wireframe: true, transparent: true, opacity: 0.2 })); neuron.add(membrane);
  const branchMaterial = new THREE.MeshStandardMaterial({ color: 0xc99654, emissive: 0x9a602e, emissiveIntensity: 0.5, roughness: 0.5, metalness: 0.3 });
  const tipMaterial = new THREE.MeshBasicMaterial({ color: 0xa6e5d4 });
  const sparkGeometry = new THREE.SphereGeometry(0.035, 8, 6);
  const sparks: { mesh: THREE.Mesh; curve: THREE.CatmullRomCurve3; offset: number }[] = [];
  const tips: THREE.Mesh[] = [];
  const addBranch = (points: THREE.Vector3[], radius: number, index: number) => {
    const curve = new THREE.CatmullRomCurve3(points);
    neuron.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 28, radius, 5, false), branchMaterial));
    const spark = new THREE.Mesh(sparkGeometry, tipMaterial); neuron.add(spark);
    sparks.push({ mesh: spark, curve, offset: index * 0.17 });
  };
  // Deterministic branches keep the initial sculpture identical across renders.
  for (let i = 0; i < 10; i++) {
    const angle = i * Math.PI * 2 / 10;
    const direction = new THREE.Vector3(Math.cos(angle), Math.sin(angle * 2.3) * 0.55, Math.sin(angle)).normalize();
    const end = direction.clone().multiplyScalar(1.1 + (i % 3) * 0.1);
    const bend = direction.clone().multiplyScalar(0.65); bend.y += Math.sin(i * 2) * 0.2;
    addBranch([direction.clone().multiplyScalar(0.22), bend, end], 0.025, i);
    for (let j = 0; j < 3; j++) {
      const tip = end.clone().add(new THREE.Vector3(Math.cos(angle + (j - 1) * 0.65) * 0.43, (j - 1) * 0.3 + 0.05, Math.sin(angle + (j - 1) * 0.65) * 0.43));
      addBranch([end, end.clone().lerp(tip, 0.5).add(new THREE.Vector3(0, 0.06, 0)), tip], 0.011, i + j);
      const node = new THREE.Mesh(new THREE.SphereGeometry(0.048, 8, 6), tipMaterial); node.position.copy(tip); neuron.add(node); tips.push(node);
    }
  }
  const light = new THREE.PointLight(0xefbc74, 4, 6); light.position.set(0, 1.7, 0); book.add(light);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.92, 0.008, 6, 100), new THREE.MeshBasicMaterial({ color: 0xc39664, transparent: true, opacity: 0.3 }));
  ring.rotation.x = Math.PI / 2; ring.position.y = 0.01; scene.add(ring);

  let frame = 0, time = 0, lastTime = 0, progress = 0, paused = false, visible = true, disposed = false;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = { x: 0, y: 0 };
  const draw = (now: number) => {
    frame = 0;
    const moving = !paused && !motion.matches;
    // An observer can render after the timestamp of the next queued frame.
    // Keep time monotonic so particles never sample outside their branch.
    if (moving) time += Math.max(0, Math.min((now - lastTime) / 1000 || 0, 0.05));
    lastTime = now;
    book.rotation.y = -0.2 + (moving ? Math.sin(time * 0.16) * 0.11 + pointer.x * 0.12 : 0);
    book.rotation.x = moving ? pointer.y * 0.035 : 0;
    neuron.position.y = 1.6 + (moving ? Math.sin(time * 0.8) * 0.065 : 0);
    neuron.rotation.y = moving ? time * 0.075 : 0;
    nucleus.scale.setScalar(1 + progress * 0.035 + (moving ? Math.sin(time * 1.5) * 0.035 : 0));
    membrane.rotation.y = time * 0.09;
    glowMaterial.emissiveIntensity = 1 + progress * 0.2;
    tips.forEach((tip, i) => tip.scale.setScalar(i < (progress + 1) * 6 ? 1.2 : 0.6));
    sparks.forEach(({mesh,curve,offset}) => mesh.position.copy(curve.getPoint((time * 0.22 + offset) % 1)));
    renderer.render(scene, camera);
    if (moving && visible && !document.hidden && !disposed) frame = requestAnimationFrame(draw);
  };
  const refresh = () => { if (frame) cancelAnimationFrame(frame); frame = 0; if (!disposed && visible && !document.hidden) { lastTime = performance.now(); draw(lastTime); } };
  const resize = new ResizeObserver(() => { const w = canvas.clientWidth, h = canvas.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); refresh(); });
  resize.observe(canvas);
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; refresh(); }); observer.observe(canvas);
  const move = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); pointer.x = (e.clientX - r.left) / r.width - 0.5; pointer.y = (e.clientY - r.top) / r.height - 0.5; };
  const reset = () => { pointer.x = 0; pointer.y = 0; };
  canvas.addEventListener('pointermove', move); canvas.addEventListener('pointerleave', reset);
  document.addEventListener('visibilitychange', refresh); motion.addEventListener('change', refresh);
  refresh();
  return {
    update(step: number, stop: boolean) { progress = step; paused = stop; refresh(); },
    dispose() {
      disposed = true; cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect();
      canvas.removeEventListener('pointermove', move); canvas.removeEventListener('pointerleave', reset);
      document.removeEventListener('visibilitychange', refresh); motion.removeEventListener('change', refresh);
      const geometries = new Set<THREE.BufferGeometry>(); const materials = new Set<THREE.Material>();
      scene.traverse(object => { if (object instanceof THREE.Mesh || object instanceof THREE.Line) { geometries.add(object.geometry); (Array.isArray(object.material) ? object.material : [object.material]).forEach(m => materials.add(m)); } });
      geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); renderer.dispose();
    },
  };
}
