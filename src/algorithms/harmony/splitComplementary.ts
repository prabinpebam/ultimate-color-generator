import { HSLColor } from '../../types/color';
import { rotateHue } from '../colorModels/hsl';

/**
 * Generates a split-complementary color harmony
 * A base color and two colors adjacent to its complement
 * 
 * @param baseHSL - Base HSL color values
 * @param angle - Angle offset from the complement (default: 30 degrees)
 * @returns Array of 3 HSL colors in split-complementary harmony
 */
export function generateSplitComplementary(
  baseHSL: HSLColor,
  angle: number = 30
): HSLColor[] {
  const [h, s, l] = baseHSL;
  const complementHue = rotateHue(h, 180);
  
  return [
    baseHSL,
    [rotateHue(complementHue, -angle), s, l],
    [rotateHue(complementHue, angle), s, l]
  ];
}
