import { HSLColor } from '../../types/color';

/**
 * Generates a monochromatic color scheme
 * Variations of a single hue with different saturation and lightness levels
 * 
 * @param baseHSL - Base HSL color values
 * @param count - Number of colors to generate (default: 5)
 * @returns Array of HSL colors in monochromatic harmony
 */
export function generateMonochromatic(
  baseHSL: HSLColor,
  count: number = 5
): HSLColor[] {
  const [h, s, l] = baseHSL;
  const colors: HSLColor[] = [];
  
  // Generate variations with different lightness levels
  const lightnessStep = 70 / (count - 1); // Spread across 70% of the lightness range
  const minLightness = Math.max(15, l - 35); // Don't go too dark
  
  for (let i = 0; i < count; i++) {
    const newLightness = minLightness + i * lightnessStep;
    
    // Adjust saturation based on lightness (lower for very light/dark colors)
    const saturationFactor = 1 - 0.5 * Math.abs(newLightness - 50) / 50;
    const newSaturation = s * saturationFactor;
    
    colors.push([h, newSaturation, newLightness]);
  }
  
  return colors;
}
