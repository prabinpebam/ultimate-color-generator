import { calculateContrastRatio } from './contrast';
import { RGBColor } from '../../types/color';

/**
 * WCAG compliance levels
 */
export type WCAGLevel = 'AA' | 'AAA';

/**
 * WCAG contrast requirements
 */
export const WCAG_REQUIREMENTS = {
  'AA': {
    'normal': 4.5,
    'large': 3
  },
  'AAA': {
    'normal': 7,
    'large': 4.5
  }
};

/**
 * Checks if a color pair meets WCAG contrast requirements
 * 
 * @param contrastRatio - The contrast ratio between two colors
 * @param level - WCAG compliance level to check ('AA' or 'AAA')
 * @param isLargeText - Whether the text is considered "large" (18pt+ or 14pt+ bold)
 * @returns Boolean indicating whether the contrast meets the requirements
 */
export function checkWCAGCompliance(
  contrastRatio: number,
  level: WCAGLevel = 'AA',
  isLargeText: boolean = false
): boolean {
  const textSize = isLargeText ? 'large' : 'normal';
  return contrastRatio >= WCAG_REQUIREMENTS[level][textSize];
}

/**
 * Gets the highest WCAG compliance level for a color pair
 * 
 * @param color1 - First RGB color
 * @param color2 - Second RGB color
 * @param isLargeText - Whether the text is considered "large" (18pt+ or 14pt+ bold)
 * @returns The highest compliance level ('AAA', 'AA', or null if fails both)
 */
export function getWCAGComplianceLevel(
  color1: RGBColor,
  color2: RGBColor,
  isLargeText: boolean = false
): WCAGLevel | null {
  const contrastRatio = calculateContrastRatio(color1, color2);
  
  if (checkWCAGCompliance(contrastRatio, 'AAA', isLargeText)) {
    return 'AAA';
  } else if (checkWCAGCompliance(contrastRatio, 'AA', isLargeText)) {
    return 'AA';
  }
  
  return null;
}
