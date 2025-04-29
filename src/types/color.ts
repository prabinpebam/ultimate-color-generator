export type RGBColor = [number, number, number]; // [0-255, 0-255, 0-255]
export type HSLColor = [number, number, number]; // [0-360, 0-100, 0-100]
export type LABColor = [number, number, number]; // [0-100, -128-127, -128-127]
export type LChColor = [number, number, number]; // [L, C, h] where L is 0-100, C is 0+, h is 0-360

export type HarmonyType = 
  | 'analogous'
  | 'complementary'
  | 'triadic'
  | 'tetradic'
  | 'splitComplementary'
  | 'monochromatic';

export interface SemanticMapping {
  hueRange: [number, number];
  saturationRange: [number, number];
  lightnessRange: [number, number];
}

export interface ColorAdjustment {
  hueShift?: number;
  saturationMultiplier?: number;
  lightnessMultiplier?: number;
}

export interface ClusterResult {
  color: RGBColor;
  count: number;
}

export interface ColorWithId {
  id: string;
  rgb: RGBColor;
  hex: string;
  hsl: HSLColor;
  lab: LABColor;
  locked: boolean;
}
