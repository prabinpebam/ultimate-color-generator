import { HSLColor } from '../../types/color';
import { rotateHue } from '../colorModels/hsl';

/**
 * Generates a tetradic (square) color harmony
 * Four colors equally spaced around the color wheel (90° apart)
 * 
 * @param baseHSL - Base HSL color values
 * @returns Array of 4 HSL colors in square harmony
 */
export function generateSquare(baseHSL: HSLColor): HSLColor[] {
  const [h, s, l] = baseHSL;
  
  return [
    baseHSL,
    [rotateHue(h, 90), s, l],
    [rotateHue(h, 180), s, l],
    [rotateHue(h, 270), s, l]
  ];
}

/**
 * Generates a rectangular tetradic color harmony
 * Two complementary color pairs offset by a specified angle
 * 
 * @param baseHSL - Base HSL color values
 * @param angle - Offset angle (default: 60 degrees, which is common)
 * @returns Array of 4 HSL colors in rectangular harmony
 */
export function generateRectangular(
  baseHSL: HSLColor,
  angle: number = 60
): HSLColor[] {
  const [h, s, l] = baseHSL;
  
  return [
    baseHSL,
    [rotateHue(h, angle), s, l],
    [rotateHue(h, 180), s, l],
    [rotateHue(h, 180 + angle), s, l]
  ];
}

/**
 * Alias for generateRectangular, which is the more common tetradic harmony
 */
export function generateTetradic(
  baseHSL: HSLColor,
  angle: number = 60
): HSLColor[] {
  return generateRectangular(baseHSL, angle);
}
