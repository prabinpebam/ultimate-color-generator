import { RGBColor } from '../../types/color';

/**
 * Calculates the contrast ratio between two RGB colors according to WCAG 2.0
 * 
 * @param rgb1 First RGB color
 * @param rgb2 Second RGB color
 * @returns Contrast ratio (1-21)
 */
export function calculateContrastRatio(rgb1: RGBColor, rgb2: RGBColor): number {
  const luminance1 = calculateRelativeLuminance(rgb1);
  const luminance2 = calculateRelativeLuminance(rgb2);
  
  // Ensure lighter color is first for the formula
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Calculates the relative luminance of an RGB color
 * 
 * @param rgb RGB color
 * @returns Relative luminance (0-1)
 */
function calculateRelativeLuminance(rgb: RGBColor): number {
  // Convert RGB to linear sRGB values
  const [r, g, b] = rgb.map(channel => {
    const normalizedChannel = channel / 255;
    return normalizedChannel <= 0.03928
      ? normalizedChannel / 12.92
      : Math.pow((normalizedChannel + 0.055) / 1.055, 2.4);
  });
  
  // Apply coefficients for the human eye's sensitivity
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
