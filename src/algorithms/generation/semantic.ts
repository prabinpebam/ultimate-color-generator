import { HSLColor, HarmonyType, SemanticMapping } from '../../types/color';
import { generatePaletteFromSeed } from './seedBased';

/**
 * Semantic mappings from descriptive terms to color attributes
 */
export const SEMANTIC_MAPPINGS: Record<string, SemanticMapping> = {
  // Mood/tone mappings
  'calm': {
    hueRange: [180, 240], // Cyan to blue
    saturationRange: [30, 60],
    lightnessRange: [50, 70]
  },
  'energetic': {
    hueRange: [0, 60], // Red to yellow
    saturationRange: [80, 100],
    lightnessRange: [50, 65]
  },
  'professional': {
    hueRange: [200, 240], // Blue range
    saturationRange: [30, 70],
    lightnessRange: [40, 60]
  },
  // Style mappings
  'vintage': {
    hueRange: [20, 40], // Browns/oranges
    saturationRange: [20, 50],
    lightnessRange: [40, 60]
  },
  'minimalist': {
    hueRange: [0, 360], // Any hue
    saturationRange: [0, 30],
    lightnessRange: [40, 95]
  },
  // Feel mappings
  'warm': {
    hueRange: [0, 60], // Red to yellow
    saturationRange: [50, 100],
    lightnessRange: [40, 70]
  },
  'cool': {
    hueRange: [180, 270], // Cyan to purple
    saturationRange: [40, 80],
    lightnessRange: [40, 70]
  },
  'vibrant': {
    hueRange: [0, 360], // Any hue
    saturationRange: [80, 100],
    lightnessRange: [45, 65]
  },
  'muted': {
    hueRange: [0, 360], // Any hue
    saturationRange: [20, 50],
    lightnessRange: [40, 70]
  },
  'dark': {
    hueRange: [0, 360], // Any hue
    saturationRange: [40, 80],
    lightnessRange: [15, 35]
  },
  'light': {
    hueRange: [0, 360], // Any hue
    saturationRange: [20, 60],
    lightnessRange: [70, 95]
  },
  'earthy': {
    hueRange: [20, 150], // Browns, greens
    saturationRange: [20, 60],
    lightnessRange: [30, 60]
  },
  'sophisticated': {
    hueRange: [270, 330], // Purples
    saturationRange: [30, 50],
    lightnessRange: [20, 50]
  }
};

/**
 * Mapping from semantic terms to harmony types
 */
const HARMONY_MAPPINGS: Record<string, HarmonyType> = {
  'energetic': 'complementary',
  'vibrant': 'triadic',
  'balanced': 'tetradic',
  'calm': 'analogous',
  'minimalist': 'monochromatic',
  'sophisticated': 'splitComplementary'
};

/**
 * Generates a palette based on semantic terms
 * 
 * @param semanticTerms - Array of semantic descriptors
 * @param paletteSize - Number of colors to generate
 * @returns Array of HSL colors
 */
export function generatePaletteFromSemantics(
  semanticTerms: string[],
  paletteSize: number
): HSLColor[] {
  // Combine the semantic mappings for all provided terms
  const combinedMapping = combineSemanticMappings(semanticTerms);
  
  // Generate a seed color from the combined mapping
  const seedColor = generateColorFromMapping(combinedMapping);
  
  // Choose a harmony type based on semantic terms
  const harmonyType = determineHarmonyFromSemantics(semanticTerms);
  
  // Generate palette using the seed-based algorithm
  return generatePaletteFromSeed(seedColor, paletteSize, harmonyType);
}

/**
 * Combines multiple semantic mappings into one
 * 
 * @param semanticTerms - Array of semantic descriptor strings
 * @returns A single combined semantic mapping
 */
function combineSemanticMappings(semanticTerms: string[]): SemanticMapping {
  // Default mapping if no valid terms are provided
  if (!semanticTerms.length) {
    return {
      hueRange: [0, 360],
      saturationRange: [50, 100],
      lightnessRange: [40, 60]
    };
  }
  
  let combinedMapping: SemanticMapping = {
    hueRange: [0, 360],
    saturationRange: [0, 100],
    lightnessRange: [0, 100]
  };
  
  // Find intersection of ranges for all valid terms
  let validTermCount = 0;
  
  semanticTerms.forEach(term => {
    if (SEMANTIC_MAPPINGS[term]) {
      validTermCount++;
      
      // If it's our first valid term, just use its mapping
      if (validTermCount === 1) {
        combinedMapping = { ...SEMANTIC_MAPPINGS[term] };
        return;
      }
      
      // Otherwise, find intersection with current mapping
      const mapping = SEMANTIC_MAPPINGS[term];
      
      // For hue, we handle it specially due to the circular nature
      if (isHueRangeNarrower(mapping.hueRange, combinedMapping.hueRange)) {
        combinedMapping.hueRange = mapping.hueRange;
      }
      
      // For saturation and lightness, find the intersection
      combinedMapping.saturationRange = [
        Math.max(combinedMapping.saturationRange[0], mapping.saturationRange[0]),
        Math.min(combinedMapping.saturationRange[1], mapping.saturationRange[1])
      ];
      
      combinedMapping.lightnessRange = [
        Math.max(combinedMapping.lightnessRange[0], mapping.lightnessRange[0]),
        Math.min(combinedMapping.lightnessRange[1], mapping.lightnessRange[1])
      ];
    }
  });
  
  // Ensure the ranges are valid (min <= max)
  if (combinedMapping.saturationRange[0] > combinedMapping.saturationRange[1]) {
    combinedMapping.saturationRange = [50, 70]; // Default fallback
  }
  
  if (combinedMapping.lightnessRange[0] > combinedMapping.lightnessRange[1]) {
    combinedMapping.lightnessRange = [40, 60]; // Default fallback
  }
  
  return combinedMapping;
}

/**
 * Checks if a hue range is narrower than another
 * 
 * @param range1 - First hue range
 * @param range2 - Second hue range
 * @returns Boolean indicating if range1 is narrower than range2
 */
function isHueRangeNarrower(
  range1: [number, number],
  range2: [number, number]
): boolean {
  const size1 = range1[0] <= range1[1] 
    ? range1[1] - range1[0] 
    : 360 - range1[0] + range1[1];
  
  const size2 = range2[0] <= range2[1]
    ? range2[1] - range2[0]
    : 360 - range2[0] + range2[1];
  
  return size1 < size2;
}

/**
 * Generates a color from a semantic mapping
 * 
 * @param mapping - Semantic mapping with ranges for hue, saturation, and lightness
 * @returns Random HSL color within the specified ranges
 */
function generateColorFromMapping(mapping: SemanticMapping): HSLColor {
  // Select a random hue within the range
  let hue: number;
  
  if (mapping.hueRange[0] <= mapping.hueRange[1]) {
    // Standard range
    hue = mapping.hueRange[0] + Math.random() * (mapping.hueRange[1] - mapping.hueRange[0]);
  } else {
    // Wraparound range (e.g., 340 to 20 degrees)
    const totalRange = (360 - mapping.hueRange[0]) + mapping.hueRange[1];
    const randomValue = Math.random() * totalRange;
    hue = (mapping.hueRange[0] + randomValue) % 360;
  }
  
  // Select random saturation and lightness within their ranges
  const saturation = mapping.saturationRange[0] + 
                    Math.random() * (mapping.saturationRange[1] - mapping.saturationRange[0]);
  const lightness = mapping.lightnessRange[0] + 
                   Math.random() * (mapping.lightnessRange[1] - mapping.lightnessRange[0]);
  
  return [Math.round(hue), Math.round(saturation), Math.round(lightness)];
}

/**
 * Determines the most appropriate harmony type based on semantic terms
 * 
 * @param semanticTerms - Array of semantic descriptors
 * @returns The harmony type to use for palette generation
 */
function determineHarmonyFromSemantics(semanticTerms: string[]): HarmonyType {
  // Check if any terms map directly to a harmony type
  for (const term of semanticTerms) {
    if (HARMONY_MAPPINGS[term]) {
      return HARMONY_MAPPINGS[term];
    }
  }
  
  // Default to analogous as it's generally pleasing
  return 'analogous';
}
