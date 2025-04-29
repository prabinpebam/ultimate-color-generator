import { HSLColor } from '../../types/color';

/**
 * Rotates a hue by a given angle and keeps it in the 0-360 range
 */
export function rotateHue(hue: number, angle: number): number {
  let newHue = (hue + angle) % 360;
  if (newHue < 0) newHue += 360;
  return newHue;
}

/**
 * Gets the complementary hue (180° rotation)
 */
export function getComplementaryHue(hue: number): number {
  return rotateHue(hue, 180);
}

/**
 * Adjusts the saturation of a color, keeping it within 0-100 range
 */
export function adjustSaturation(saturation: number, multiplier: number): number {
  return Math.max(0, Math.min(100, saturation * multiplier));
}

/**
 * Adjusts the lightness of a color, keeping it within 0-100 range
 */
export function adjustLightness(lightness: number, multiplier: number): number {
  return Math.max(0, Math.min(100, lightness * multiplier));
}

/**
 * Determines if a color is considered "dark" based on its HSL lightness
 */
export function isDarkHSL(hsl: HSLColor): boolean {
  return hsl[2] < 50;
}

/**
 * Creates a new HSL color with adjusted lightness
 */
export function withLightness(hsl: HSLColor, newLightness: number): HSLColor {
  return [hsl[0], hsl[1], Math.max(0, Math.min(100, newLightness))];
}

/**
 * Creates a new HSL color with adjusted saturation
 */
export function withSaturation(hsl: HSLColor, newSaturation: number): HSLColor {
  return [hsl[0], Math.max(0, Math.min(100, newSaturation)), hsl[2]];
}
