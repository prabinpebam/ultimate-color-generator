import { HSLColor, HarmonyType } from '../../types/color';

/**
 * Generates a palette from a seed color using color harmony principles
 * 
 * @param seedColor - Base HSL color to build palette around
 * @param paletteSize - Number of colors to generate
 * @param harmonyType - Type of color harmony to use
 * @returns Array of HSL colors forming a palette
 */
export function generatePaletteFromSeed(
  seedColor: HSLColor,
  paletteSize: number = 5,
  harmonyType: HarmonyType = 'analogous'
): HSLColor[] {
  // Use the appropriate harmony function based on the type
  let baseColors: HSLColor[] = [];
  const [h, s, l] = seedColor;
  
  switch (harmonyType) {
    case 'complementary':
      baseColors = [
        seedColor, 
        [(h + 180) % 360, s, l]
      ];
      break;
    case 'analogous':
      baseColors = generateAnalogousColors(seedColor, Math.min(paletteSize, 5));
      break;
    case 'triadic':
      baseColors = [
        seedColor,
        [(h + 120) % 360, s, l],
        [(h + 240) % 360, s, l]
      ];
      break;
    case 'tetradic':
      baseColors = [
        seedColor,
        [(h + 90) % 360, s, l],
        [(h + 180) % 360, s, l],
        [(h + 270) % 360, s, l]
      ];
      break;
    case 'splitComplementary':
      baseColors = [
        seedColor,
        [(h + 150) % 360, s, l],
        [(h + 210) % 360, s, l]
      ];
      break;
    case 'monochromatic':
      baseColors = generateMonochromaticColors(seedColor, paletteSize);
      break;
    default:
      baseColors = [seedColor];
  }
  
  // If we need more colors than the base harmony provides
  if (paletteSize > baseColors.length) {
    // Create variations by adjusting lightness
    const additionalCount = paletteSize - baseColors.length;
    const additionalColors = generateVariations(baseColors, additionalCount);
    return [...baseColors, ...additionalColors];
  }
  
  // If we need fewer colors, return just what we need
  return baseColors.slice(0, paletteSize);
}

/**
 * Generate analogous colors (adjacent on the color wheel)
 */
function generateAnalogousColors(seedColor: HSLColor, count: number): HSLColor[] {
  const [h, s, l] = seedColor;
  const colors: HSLColor[] = [seedColor];
  const angle = 30; // Degree spacing
  
  // Half the colors will be on each side of the seed color
  const sideCount = Math.floor((count - 1) / 2);
  
  // Generate colors on one side
  for (let i = 1; i <= sideCount; i++) {
    colors.push([(h + angle * i) % 360, s, l]);
  }
  
  // Generate colors on the other side
  for (let i = 1; i <= count - 1 - sideCount; i++) {
    colors.unshift([(h - angle * i + 360) % 360, s, l]);
  }
  
  return colors;
}

/**
 * Generate monochromatic colors (variations in lightness)
 */
function generateMonochromaticColors(seedColor: HSLColor, count: number): HSLColor[] {
  const [h, s] = seedColor;
  const colors: HSLColor[] = [];
  
  // Create variations with different lightness levels
  for (let i = 0; i < count; i++) {
    // Distribute lightness from 20% to 80%
    const lightness = 20 + (i / (count - 1)) * 60;
    colors.push([h, s, lightness]);
  }
  
  return colors;
}

/**
 * Generate additional color variations when needed
 */
function generateVariations(baseColors: HSLColor[], count: number): HSLColor[] {
  const variations: HSLColor[] = [];
  
  for (let i = 0; i < count; i++) {
    // Use baseColor as template, cycling through the available ones
    const baseColor = baseColors[i % baseColors.length];
    const [h, s, l] = baseColor;
    
    // Alternate between lighter and darker variations
    const lightnessAdjustment = (i % 2 === 0) ? 15 : -15;
    const newLightness = Math.max(10, Math.min(90, l + lightnessAdjustment));
    
    variations.push([h, s, newLightness]);
  }
  
  return variations;
}
