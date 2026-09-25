import palette from "@/lib/palette.json";
/** Owned art direction: a restrained carbon / blue-black field, never an editor URL. */
export const atmospherePalette = { dark: palette["black"], stone: palette["blue-black"], light: palette["electric-blue"] };
export type ShaderField = { uStrength: number; uDensity: number; uFrequency: number; uAmplitude: number; uSpeed: number; positionX: number; positionY: number; rotationZ: number; accent: number };
const field = (uStrength: number, uDensity: number, uFrequency: number, uAmplitude: number, uSpeed: number, rotationZ: number, accent: number, positionX = 0, positionY = 0): ShaderField => ({ uStrength, uDensity, uFrequency, uAmplitude, uSpeed, rotationZ, accent, positionX, positionY });
export const shaderPresets = {
  home: field(.55, 1.4, 3, .12, .055, -18, .40),
  explore: field(.72, 1.6, 3.2, .14, .065, -11, .46),
  volumes: [
    field(.70, 2.5, 4.2, .13, .035, -24, .48, -.18), // dense / layered
    field(.38, .85, 2.2, .07, .045, -8, .42, .12), // clear / low noise
    field(.68, 1.4, 3.6, .11, .045, -40, .47, -.26), // directional
    field(.63, 1.7, 2.7, .10, .035, 24, .51, .26), // divided field
    field(.80, 2.1, 3.7, .20, .055, -12, .55, -.12), // measured instability
    field(.45, 2.9, 5.0, .08, .035, -62, .49, .3), // compressed threshold
    field(.42, 1.2, 2.8, .06, .018, 8, .44, .05, .18), // still / concentrated
  ],
  editorial: field(.38, 1.15, 2.6, .07, .022, -12, .28),
  contact: field(.62, 1.65, 2.4, .09, .03, 16, .55, .22, -.1),
};
