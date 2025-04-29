import { LABColor, LChColor } from '../../types/color';

/**
 * Converts a LAB color to LCh (Lightness, Chroma, hue)
 */
export function labToLCh(lab: LABColor): LChColor {
  const [L, a, b] = lab;
  
  const C = Math.sqrt(a * a + b * b);
  
  // Calculate hue in radians, then convert to degrees
  let h = Math.atan2(b, a) * (180 / Math.PI);
  
  // Ensure hue is in the range 0-360
  if (h < 0) h += 360;
  
  return [L, C, h];
}

/**
 * Converts an LCh color to LAB
 */
export function lchToLab(lch: LChColor): LABColor {
  const [L, C, h] = lch;
  
  // Convert hue from degrees to radians
  const hRad = h * (Math.PI / 180);
  
  // Calculate a* and b* coordinates
  const a = C * Math.cos(hRad);
  const b = C * Math.sin(hRad);
  
  return [L, a, b];
}

/**
 * Calculates the Delta E 2000 color difference between two Lab colors
 * Implementation based on the CIEDE2000 formula
 * A smaller Delta E means the colors are more similar
 */
export function deltaE2000(lab1: LABColor, lab2: LABColor): number {
  const [L1, a1, b1] = lab1;
  const [L2, a2, b2] = lab2;
  
  // Constants
  const kL = 1;
  const kC = 1;
  const kH = 1;
  
  // Calculate C1, C2 (Chroma)
  const C1 = Math.sqrt(a1 * a1 + b1 * b1);
  const C2 = Math.sqrt(a2 * a2 + b2 * b2);
  
  // Calculate average Chroma and Lighness
  const avgC = (C1 + C2) / 2;
  const avgC7 = Math.pow(avgC, 7);
  
  // G factor to compensate for low chroma
  const G = 0.5 * (1 - Math.sqrt(avgC7 / (avgC7 + 25 * 25 * 25 * 25 * 25 * 25 * 25)));
  
  // Calculate a' for both colors
  const ap1 = (1 + G) * a1;
  const ap2 = (1 + G) * a2;
  
  // Calculate C', h' (prime values)
  const Cp1 = Math.sqrt(ap1 * ap1 + b1 * b1);
  const Cp2 = Math.sqrt(ap2 * ap2 + b2 * b2);
  
  // Calculate h' (prime values) - handle edge cases for arctan
  let hp1 = Math.atan2(b1, ap1) * (180 / Math.PI);
  if (hp1 < 0) hp1 += 360;
  
  let hp2 = Math.atan2(b2, ap2) * (180 / Math.PI);
  if (hp2 < 0) hp2 += 360;
  
  // Calculate ΔL', ΔC', ΔH'
  const deltaL = L2 - L1;
  const deltaCp = Cp2 - Cp1;
  
  // Calculate ΔH' - handle edge cases with hue differences
  let deltahp = hp2 - hp1;
  if (Math.abs(deltahp) > 180) {
    if (hp2 <= hp1) {
      deltahp += 360;
    } else {
      deltahp -= 360;
    }
  }
  
  // Calculate ΔH'
  const deltaHp = 2 * Math.sqrt(Cp1 * Cp2) * Math.sin(deltahp * (Math.PI / 180) / 2);
  
  // Calculate averages of L', C', h' for use in weighting functions
  const avgL = (L1 + L2) / 2;
  const avgCp = (Cp1 + Cp2) / 2;
  
  // Average hp handling
  let avghp = (hp1 + hp2) / 2;
  if (Math.abs(hp1 - hp2) > 180) {
    if (hp1 + hp2 < 360) {
      avghp += 180;
    } else {
      avghp -= 180;
    }
  }
  
  // Weighting functions
  const T = 1 - 0.17 * Math.cos((avghp - 30) * (Math.PI / 180))
             + 0.24 * Math.cos((2 * avghp) * (Math.PI / 180))
             + 0.32 * Math.cos((3 * avghp + 6) * (Math.PI / 180))
             - 0.20 * Math.cos((4 * avghp - 63) * (Math.PI / 180));
  
  const avgCp7 = Math.pow(avgCp, 7);
  const RC = Math.sqrt(avgCp7 / (avgCp7 + 25 * 25 * 25 * 25 * 25 * 25 * 25));
  
  const SL = 1 + (0.015 * Math.pow(avgL - 50, 2)) / Math.sqrt(20 + Math.pow(avgL - 50, 2));
  const SC = 1 + 0.045 * avgCp;
  const SH = 1 + 0.015 * avgCp * T;
  
  const RT = -2 * RC * Math.sin(60 * Math.exp(-Math.pow((avghp - 275) / 25, 2)) * (Math.PI / 180));
  
  // Final calculation
  const deltaE = Math.sqrt(
    Math.pow(deltaL / (kL * SL), 2) +
    Math.pow(deltaCp / (kC * SC), 2) +
    Math.pow(deltaHp / (kH * SH), 2) +
    RT * (deltaCp / (kC * SC)) * (deltaHp / (kH * SH))
  );
  
  return deltaE;
}
