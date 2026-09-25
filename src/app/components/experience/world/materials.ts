import palette from "@/lib/palette.json";
import * as THREE from "three";
export function createMaterials() {
  const standard = (color: string, roughness = 0.8, metalness = 0.1) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness });
  return {
    floor: standard(palette["surface-elevated"]),
    wall: standard(palette["graphite"]),
    dark: standard(palette["carbon"]),
    metal: standard(palette["graphite"], 0.42, 0.65),
    paper: standard(palette["bone"]),
    ink: standard(palette["carbon"]),
    brass: standard(palette["muted"], 0.4, 0.6),
    clay: standard(palette["blue-black"]),
    blue: standard(palette["muted"]),
    light: new THREE.MeshStandardMaterial({
      color: palette["bone"],
      emissive: palette["bone"],
      emissiveIntensity: 1.6,
    }),
    glass: new THREE.MeshStandardMaterial({
      color: palette["light-muted"],
      transparent: true,
      opacity: 0.09,
      roughness: 0.25,
      depthWrite: false,
    }),
  };
}
export type Materials = ReturnType<typeof createMaterials>;
/** Original wayfinding textures, generated locally; no fetched image assets. */
export function lettering(
  text: string,
  width = 256,
  height = 128,
  background = palette["carbon"],
  color = palette["bone"],
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d")!;
  context.fillStyle = background;
  context.fillRect(0, 0, width, height);
  context.fillStyle = color;
  context.font = `500 ${Math.round(height * 0.48)}px monospace`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, width / 2, height / 2, width * 0.9);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
}
