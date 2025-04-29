import { ColorWithId, HarmonyType, HSLColor } from './color';

export interface Palette {
  id: string;
  name: string;
  colors: ColorWithId[];
  harmony: HarmonyType;
  timestamp: number;
}

export interface PaletteGenerationOptions {
  paletteSize: number;
  harmonyType: HarmonyType;
  preserveLocked: boolean;
  mode: 'light' | 'dark' | 'both';
  semanticTerms?: string[];
  seedColor?: HSLColor;
  extractedColors?: HSLColor[];
}

export interface PaletteAdjustmentOptions {
  hueShift?: number;
  saturationMultiplier?: number;
  lightnessMultiplier?: number;
  preserveLocked: boolean;
}
