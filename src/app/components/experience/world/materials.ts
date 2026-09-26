import palette from "@/lib/palette.json";
import * as THREE from "three";

export function createMaterials() {
  const matte = (color: string, roughness = 0.8, metalness = 0.05) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness });
  return {
    floor: matte(palette["surface-elevated"]),
    wall: matte(palette.apricot),
    dark: matte(palette.coral),
    metal: matte(palette.graphite, 0.6, 0.25),
    paper: matte(palette.surface),
    ink: matte(palette["electric-blue"]),
    brass: matte(palette.apricot, 0.5, 0.2),
    clay: matte(palette.coral),
    blue: matte(palette["electric-blue"]),
    light: new THREE.MeshStandardMaterial({
      color: palette.surface,
      emissive: palette.apricot,
      emissiveIntensity: 0.35,
    }),
    glass: new THREE.MeshStandardMaterial({
      color: palette.surface,
      transparent: true,
      opacity: 0.08,
      roughness: 0.35,
      depthWrite: false,
    }),
  };
}
export type Materials = ReturnType<typeof createMaterials>;

/** Local wayfinding textures; no remote assets or fonts. */
export function lettering(
  text: string,
  width = 256,
  height = 128,
  background = palette.surface,
  color = palette.bone,
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
