import { HSLColor, LABColor, RGBColor } from '../../types/color';

/**
 * Converts RGB color to HSL
 */
export function rgbToHSL(rgb: RGBColor): HSLColor {
  const [r, g, b] = rgb.map(v => v / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  
  if (delta !== 0) {
    s = l > 0.5 
      ? delta / (2 - max - min) 
      : delta / (max + min);
    
    switch (max) {
      case r:
        h = ((g - b) / delta + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / delta + 2) * 60;
        break;
      case b:
        h = ((r - g) / delta + 4) * 60;
        break;
    }
  }
  
  return [h, s * 100, l * 100];
}

/**
 * Converts HSL color to RGB
 */
export function hslToRGB(hsl: HSLColor): RGBColor {
  let [h, s, l] = hsl;
  h /= 360;
  s /= 100;
  l /= 100;
  
  let r, g, b;
  
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  return [
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255)
  ];
}

/**
 * Simplified RGB to LAB conversion
 * Note: This is a simplified implementation for demonstration purposes
 */
export function rgbToLAB(rgb: RGBColor): LABColor {
  // This is a simplified implementation
  const [r, g, b] = rgb;
  
  // Simplified L calculation (luminance)
  const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  
  // Simplified a and b calculations
  const a = 128 + (r - g) / 2;
  const b_value = 128 + (g - b) / 2;
  
  return [l / 255 * 100, a - 128, b_value - 128];
}

/**
 * Converts LAB color to RGB (placeholder implementation)
 */
export function labToRGB(lab: LABColor): RGBColor {
  // This is a simplified placeholder implementation
  // Would need proper LAB -> XYZ -> RGB conversion
  const [L, a, b] = lab;
  
  // Very simplified conversion for basic functionality
  return [
    Math.max(0, Math.min(255, Math.round(L * 2.55 + a))),
    Math.max(0, Math.min(255, Math.round(L * 2.55 - a / 2))),
    Math.max(0, Math.min(255, Math.round(L * 2.55 - b)))
  ];
}

export default {
  rgbToHSL,
  hslToRGB,
  rgbToLAB,
  labToRGB
};
