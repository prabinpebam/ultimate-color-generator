import { RGBColor } from '../../types/color';

/**
 * Normalizes RGB values from 0-255 range to 0-1 range
 */
export function normalizeRGB(r: number, g: number, b: number): [number, number, number] {
  return [r / 255, g / 255, b / 255];
}

/**
 * Converts normalized RGB values (0-1) back to 0-255 range
 */
export function denormalizeRGB(r: number, g: number, b: number): RGBColor {
  return [
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255)
  ];
}

/**
 * Converts RGB color to hex string
 */
export function rgbToHex(rgb: RGBColor): string {
  const [r, g, b] = rgb;
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

/**
 * Converts hex string to RGB color
 */
export function hexToRgb(hex: string): RGBColor {
  // Remove # if present
  const cleanHex = hex.charAt(0) === '#' ? hex.substring(1) : hex;
  
  // Parse the hexadecimal strings to integers
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  
  // Check if the result is valid
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  
  return [r, g, b];
}

/**
 * Converts a number to a 2-digit hex string
 */
function componentToHex(c: number): string {
  const hex = Math.max(0, Math.min(255, Math.round(c))).toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

/**
 * Calculates the relative luminance of an RGB color
 * Formula from WCAG 2.0 https://www.w3.org/TR/WCAG20-TECHS/G17.html
 */
export function calculateRelativeLuminance(rgb: RGBColor): number {
  // Convert RGB to linear sRGB values
  const [r, g, b] = normalizeRGB(...rgb).map(channel => {
    return channel <= 0.03928
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4);
  });
  
  // Apply coefficients for the human eye's sensitivity
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
