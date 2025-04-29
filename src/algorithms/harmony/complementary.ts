import { HSLColor } from '../../types/color';
import { rotateHue } from '../colorModels/hsl';

/**
 * Generates a complementary color in HSL color space
 * A complementary color is 180 degrees away on the color wheel
 * 
 * @param baseHSL - HSL color values [hue, saturation, lightness]
 * @returns Complementary HSL color
 */
export function generateComplementary(baseHSL: HSLColor): HSLColor {
  const [h, s, l] = baseHSL;
  const complementaryHue = rotateHue(h, 180);
  
  return [complementaryHue, s, l];
}

/**
 * Generates a complementary color pair (including the base color)
 * 
 * @param baseHSL - Base HSL color values
 * @returns Array of two HSL colors [baseColor, complementaryColor]
 */
export function generateComplementaryPair(baseHSL: HSLColor): HSLColor[] {
  return [baseHSL, generateComplementary(baseHSL)];
}
