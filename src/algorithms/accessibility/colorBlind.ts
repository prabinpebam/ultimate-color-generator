import { RGBColor } from '../../types/color';
import { normalizeRGB, denormalizeRGB } from '../colorModels/rgb';

/**
 * Type of color blindness to simulate
 */
export type ColorBlindnessType = 'protanopia' | 'deuteranopia' | 'tritanopia';

/**
 * Transformation matrices for different types of color blindness
 */
const COLOR_BLINDNESS_MATRICES = {
  protanopia: [
    [0.567, 0.433, 0],
    [0.558, 0.442, 0],
    [0, 0.242, 0.758]
  ],
  deuteranopia: [
    [0.625, 0.375, 0],
    [0.7, 0.3, 0],
    [0, 0.3, 0.7]
  ],
  tritanopia: [
    [0.95, 0.05, 0],
    [0, 0.433, 0.567],
    [0, 0.475, 0.525]
  ]
};

/**
 * Simulates how a color would appear to someone with color blindness
 * 
 * @param rgb - RGB color to transform
 * @param type - Type of color blindness to simulate
 * @returns RGB color as it would appear with the specified color blindness
 */
export function simulateColorBlindness(
  rgb: RGBColor,
  type: ColorBlindnessType
): RGBColor {
  const matrix = COLOR_BLINDNESS_MATRICES[type];
  return applyColorMatrix(rgb, matrix);
}

/**
 * Applies a color transformation matrix to an RGB color
 * 
 * @param rgb - RGB color
 * @param matrix - 3x3 transformation matrix
 * @returns Transformed RGB color
 */
function applyColorMatrix(rgb: RGBColor, matrix: number[][]): RGBColor {
  const [r, g, b] = normalizeRGB(...rgb);
  
  const newR = r * matrix[0][0] + g * matrix[0][1] + b * matrix[0][2];
  const newG = r * matrix[1][0] + g * matrix[1][1] + b * matrix[1][2];
  const newB = r * matrix[2][0] + g * matrix[2][1] + b * matrix[2][2];
  
  return denormalizeRGB(
    Math.max(0, Math.min(1, newR)),
    Math.max(0, Math.min(1, newG)),
    Math.max(0, Math.min(1, newB))
  );
}
