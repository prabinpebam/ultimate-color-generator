import { HSLColor } from '../../types/color';
import { rotateHue } from '../colorModels/hsl';

/**
 * Generates an analogous color scheme in HSL color space
 * Analogous colors are adjacent on the color wheel
 * 
 * @param baseHSL - Base HSL color values
 * @param count - Number of colors to generate (default: 3)
 * @param angle - Angle between adjacent colors (default: 30 degrees)
 * @returns Array of HSL colors in the analogous harmony
 */
export function generateAnalogous(
  baseHSL: HSLColor,
  count: number = 3,
  angle: number = 30
): HSLColor[] {
  const [h, s, l] = baseHSL;
  const colors: HSLColor[] = [baseHSL];
  
  // Calculate how many colors to generate on each side
  const leftCount = Math.floor((count - 1) / 2);
  const rightCount = count - 1 - leftCount;
  
  // Generate colors to the "left" on the color wheel
  for (let i = 1; i <= leftCount; i++) {
    const newHue = rotateHue(h, -angle * i);
    colors.unshift([newHue, s, l]);
  }
  
  // Generate colors to the "right" on the color wheel
  for (let i = 1; i <= rightCount; i++) {
    const newHue = rotateHue(h, angle * i);
    colors.push([newHue, s, l]);
  }
  
  return colors;
}
