import { HSLColor } from '../../types/color';
import { rotateHue } from '../colorModels/hsl';

/**
 * Generates a triadic color harmony
 * Three colors equally spaced around the color wheel (120° apart)
 * 
 * @param baseHSL - Base HSL color values
 * @returns Array of 3 HSL colors in triadic harmony
 */
export function generateTriadic(baseHSL: HSLColor): HSLColor[] {
  const [h, s, l] = baseHSL;
  
  return [
    baseHSL,
    [rotateHue(h, 120), s, l],
    [rotateHue(h, 240), s, l]
  ];
}
