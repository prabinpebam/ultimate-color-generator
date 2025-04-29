# Algorithm Explanations

This document provides detailed explanations of the algorithms implemented in the Ultimate Color Generator application. It serves as a technical reference for developers working with the codebase and explains the mathematical and theoretical foundations of our color manipulation and generation methods.

## Table of Contents

1. [Color Models](#color-models)
   - [RGB](#rgb)
   - [HSL](#hsl)
   - [LAB](#lab)
   - [Conversions](#conversions)
2. [Color Harmony Algorithms](#color-harmony-algorithms)
   - [Complementary](#complementary)
   - [Analogous](#analogous)
   - [Triadic](#triadic)
   - [Tetradic](#tetradic)
   - [Split-Complementary](#split-complementary)
   - [Monochromatic](#monochromatic)
3. [Accessibility Algorithms](#accessibility-algorithms)
   - [Contrast Calculation](#contrast-calculation)
   - [WCAG Compliance](#wcag-compliance)
   - [Color Blindness Simulation](#color-blindness-simulation)
4. [Palette Generation Algorithms](#palette-generation-algorithms)
   - [Seed-Based Generation](#seed-based-generation)
   - [Semantic-Based Generation](#semantic-based-generation)
   - [Image-Based Color Extraction](#image-based-color-extraction)
5. [Advanced Techniques](#advanced-techniques)
   - [K-means Clustering](#k-means-clustering)
   - [Perceptual Uniformity Considerations](#perceptual-uniformity-considerations)
   - [Attribute Manipulation and Locking](#attribute-manipulation-and-locking)

## Color Models

### RGB

The RGB (Red, Green, Blue) color model is an additive system primarily used for digital displays. In our implementation:

- RGB values are represented as integers from 0 to 255 for each channel
- The RGB model is primarily used for final display and export formats
- Our internal RGB class handles normalization (0-1 range) for mathematical operations
- RGB is not perceptually uniform, meaning equal numerical changes do not result in equal perceived changes

Key implementation considerations:
```typescript
// RGB to normalized form (0-1 range)
function normalizeRGB(r: number, g: number, b: number): [number, number, number] {
  return [r / 255, g / 255, b / 255];
}

// Normalized to RGB (0-255 range)
function denormalizeRGB(r: number, g: number, b: number): [number, number, number] {
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
```

### HSL

The HSL (Hue, Saturation, Lightness) color model represents colors in a more perceptually relevant way:

- Hue: Represented as an angle from 0° to 360° around the color wheel
- Saturation: Represented as a percentage from 0% (gray) to 100% (full color)
- Lightness: Represented as a percentage from 0% (black) to 100% (white)

HSL is particularly useful for our harmony algorithms as hue manipulation can be performed through simple arithmetic:

```typescript
// Rotate a hue by a given angle and keep it in the 0-360 range
function rotateHue(hue: number, angle: number): number {
  return (hue + angle) % 360;
}

// Create a complementary color (180° rotation)
function getComplementaryHue(hue: number): number {
  return rotateHue(hue, 180);
}
```

### LAB

The CIE L*a*b* (LAB) color space is a device-independent model developed to achieve perceptual uniformity:

- L*: Lightness from 0 (black) to 100 (white)
- a*: Green-red axis (-a* = green, +a* = red)
- b*: Blue-yellow axis (-b* = blue, +b* = yellow)

Our implementation uses LAB for critical color manipulations where perceptual uniformity is important:

```typescript
// Calculate perceptual distance between two LAB colors using Delta E 2000
function deltaE2000(lab1: LABColor, lab2: LABColor): number {
  // Detailed implementation follows the CIEDE2000 formula
  // ...
}
```

### Conversions

Our conversion algorithms implement the mathematical formulas for transforming colors between different color spaces:

```typescript
// RGB to HSL conversion
function rgbToHSL(r: number, g: number, b: number): [number, number, number] {
  const [rNorm, gNorm, bNorm] = normalizeRGB(r, g, b);
  const cMax = Math.max(rNorm, gNorm, bNorm);
  const cMin = Math.min(rNorm, gNorm, bNorm);
  const delta = cMax - cMin;
  
  // Calculate hue
  let h = 0;
  if (delta === 0) {
    h = 0;
  } else if (cMax === rNorm) {
    h = ((gNorm - bNorm) / delta) % 6;
  } else if (cMax === gNorm) {
    h = (bNorm - rNorm) / delta + 2;
  } else {
    h = (rNorm - gNorm) / delta + 4;
  }
  
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  
  // Calculate lightness
  const l = (cMax + cMin) / 2;
  
  // Calculate saturation
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  
  return [h, s * 100, l * 100];
}

// Additional conversion functions (HSL to RGB, RGB to LAB, LAB to RGB, etc.)
// ...
```

The complete conversion system supports all necessary transformations between RGB, HSL, and LAB color spaces, allowing us to use the most appropriate color space for each operation.

## Color Harmony Algorithms

Our harmony algorithms use color theory principles to generate aesthetically pleasing color combinations. These are primarily implemented using HSL manipulations for their intuitive nature.

### Complementary

Complementary colors are directly opposite on the color wheel:

```typescript
function generateComplementary(baseHSL: HSLColor): HSLColor {
  const [h, s, l] = baseHSL;
  const complementaryH = (h + 180) % 360;
  return [complementaryH, s, l];
}
```

### Analogous

Analogous colors are adjacent on the color wheel:

```typescript
function generateAnalogous(baseHSL: HSLColor, count: number = 3, angle: number = 30): HSLColor[] {
  const [h, s, l] = baseHSL;
  const colors: HSLColor[] = [baseHSL];
  
  const halfCount = Math.floor(count / 2);
  for (let i = 1; i <= halfCount; i++) {
    // Colors to the "left" on the color wheel
    colors.unshift([(h - angle * i + 360) % 360, s, l]);
    
    // Colors to the "right" on the color wheel (if needed)
    if (colors.length < count) {
      colors.push([(h + angle * i) % 360, s, l]);
    }
  }
  
  return colors;
}
```

### Triadic

Triadic colors form an equilateral triangle on the color wheel:

```typescript
function generateTriadic(baseHSL: HSLColor): HSLColor[] {
  const [h, s, l] = baseHSL;
  return [
    [h, s, l],
    [(h + 120) % 360, s, l],
    [(h + 240) % 360, s, l]
  ];
}
```

### Tetradic

Tetradic (or rectangular) harmony uses four colors arranged in two complementary pairs:

```typescript
function generateTetradic(baseHSL: HSLColor, angle: number = 90): HSLColor[] {
  const [h, s, l] = baseHSL;
  return [
    [h, s, l],
    [(h + angle) % 360, s, l],
    [(h + 180) % 360, s, l],
    [(h + 180 + angle) % 360, s, l]
  ];
}
```

### Split-Complementary

Split-complementary harmony uses a base color and the two colors adjacent to its complement:

```typescript
function generateSplitComplementary(baseHSL: HSLColor, angle: number = 30): HSLColor[] {
  const [h, s, l] = baseHSL;
  const complementaryH = (h + 180) % 360;
  return [
    [h, s, l],
    [(complementaryH - angle + 360) % 360, s, l],
    [(complementaryH + angle) % 360, s, l]
  ];
}
```

### Monochromatic

Monochromatic harmony uses variations in saturation and lightness of a single hue:

```typescript
function generateMonochromatic(baseHSL: HSLColor, count: number = 5): HSLColor[] {
  const [h, s, l] = baseHSL;
  const colors: HSLColor[] = [];
  
  // Generate variations with different lightness levels
  const lightnessStep = 70 / (count - 1);
  const minLightness = Math.max(15, l - 35);
  
  for (let i = 0; i < count; i++) {
    const newLightness = minLightness + i * lightnessStep;
    // Adjust saturation based on lightness (lower for very light/dark colors)
    const saturationFactor = 1 - 0.7 * Math.abs(newLightness - 50) / 50;
    const newSaturation = s * saturationFactor;
    colors.push([h, newSaturation, newLightness]);
  }
  
  return colors;
}
```

## Accessibility Algorithms

### Contrast Calculation

We calculate contrast ratios according to WCAG standards:

```typescript
function calculateContrastRatio(color1: RGBColor, color2: RGBColor): number {
  const luminance1 = calculateRelativeLuminance(color1);
  const luminance2 = calculateRelativeLuminance(color2);
  
  // Ensure lighter color is first for the formula
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

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
```

### WCAG Compliance

We check if a pair of colors meets WCAG contrast requirements:

```typescript
function checkWCAGCompliance(
  contrastRatio: number,
  level: 'AA' | 'AAA' = 'AA',
  isLargeText: boolean = false
): boolean {
  // Define minimum contrast requirements
  const requirements = {
    'AA': {
      'normal': 4.5,
      'large': 3
    },
    'AAA': {
      'normal': 7,
      'large': 4.5
    }
  };
  
  const textSize = isLargeText ? 'large' : 'normal';
  return contrastRatio >= requirements[level][textSize];
}
```

### Color Blindness Simulation

We simulate color blindness to help test accessibility:

```typescript
function simulateProtanopia(rgb: RGBColor): RGBColor {
  // Protanopia transformation matrix
  const matrix = [
    [0.567, 0.433, 0],
    [0.558, 0.442, 0],
    [0, 0.242, 0.758]
  ];
  return applyColorMatrix(rgb, matrix);
}

function simulateDeuteranopia(rgb: RGBColor): RGBColor {
  // Deuteranopia transformation matrix
  const matrix = [
    [0.625, 0.375, 0],
    [0.7, 0.3, 0],
    [0, 0.3, 0.7]
  ];
  return applyColorMatrix(rgb, matrix);
}

function simulateTritanopia(rgb: RGBColor): RGBColor {
  // Tritanopia transformation matrix
  const matrix = [
    [0.95, 0.05, 0],
    [0, 0.433, 0.567],
    [0, 0.475, 0.525]
  ];
  return applyColorMatrix(rgb, matrix);
}

function applyColorMatrix(rgb: RGBColor, matrix: number[][]): RGBColor {
  const [r, g, b] = normalizeRGB(...rgb);
  
  const newR = r * matrix[0][0] + g * matrix[0][1] + b * matrix[0][2];
  const newG = r * matrix[1][0] + g * matrix[1][1] + b * matrix[1][2];
  const newB = r * matrix[2][0] + g * matrix[2][1] + b * matrix[2][2];
  
  return denormalizeRGB(newR, newG, newB);
}
```

## Palette Generation Algorithms

### Seed-Based Generation

Seed-based generation creates a palette starting from one or more user-defined colors:

```typescript
function generatePaletteFromSeed(
  seedColor: HSLColor, 
  paletteSize: number, 
  harmonyType: 'complementary' | 'analogous' | 'triadic' | 'tetradic' = 'analogous'
): HSLColor[] {
  // Use the appropriate harmony function based on the type
  let baseColors: HSLColor[] = [];
  
  switch (harmonyType) {
    case 'complementary':
      baseColors = [seedColor, generateComplementary(seedColor)];
      break;
    case 'analogous':
      baseColors = generateAnalogous(seedColor, Math.min(paletteSize, 5));
      break;
    case 'triadic':
      baseColors = generateTriadic(seedColor);
      break;
    case 'tetradic':
      baseColors = generateTetradic(seedColor);
      break;
  }
  
  // If we need more colors than the base harmony provides
  if (paletteSize > baseColors.length) {
    // Create variations by adjusting lightness and saturation
    const additionalColors = generateVariations(baseColors, paletteSize - baseColors.length);
    return [...baseColors, ...additionalColors];
  }
  
  // If we need fewer colors, return just what we need
  return baseColors.slice(0, paletteSize);
}

function generateVariations(baseColors: HSLColor[], count: number): HSLColor[] {
  const variations: HSLColor[] = [];
  
  // Strategy: Create variations by adjusting lightness and saturation
  for (let i = 0; i < count; i++) {
    const baseColor = baseColors[i % baseColors.length];
    const [h, s, l] = baseColor;
    
    // Alternate between lighter and darker variations
    const lightnessAdjustment = (i % 2 === 0) ? 15 : -15;
    const newL = Math.max(10, Math.min(90, l + lightnessAdjustment));
    
    // Adjust saturation slightly
    const saturationAdjustment = (i % 3 === 0) ? 10 : -10;
    const newS = Math.max(10, Math.min(100, s + saturationAdjustment));
    
    variations.push([h, newS, newL]);
  }
  
  return variations;
}
```

### Semantic-Based Generation

Semantic-based generation translates descriptive terms into color attributes:

```typescript
// Define semantic mappings from descriptive terms to color attributes
const semanticMappings = {
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
  }
};

function generatePaletteFromSemantics(
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

function combineSemanticMappings(semanticTerms: string[]): SemanticMapping {
  // Default mapping if no valid terms are provided
  if (!semanticTerms.length) {
    return {
      hueRange: [0, 360],
      saturationRange: [50, 100],
      lightnessRange: [40, 60]
    };
  }
  
  // Start with full ranges
  let combinedMapping = {
    hueRange: [0, 360],
    saturationRange: [0, 100],
    lightnessRange: [0, 100]
  };
  
  // Find intersection of ranges for all valid terms
  let validTermCount = 0;
  
  semanticTerms.forEach(term => {
    if (semanticMappings[term]) {
      validTermCount++;
      
      // If it's our first valid term, just use its mapping
      if (validTermCount === 1) {
        combinedMapping = { ...semanticMappings[term] };
        return;
      }
      
      // Otherwise, find intersection with current mapping
      const mapping = semanticMappings[term];
      
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
  
  return [hue, saturation, lightness];
}

function determineHarmonyFromSemantics(semanticTerms: string[]): HarmonyType {
  // Map certain semantic terms to harmony types
  const harmonyMappings = {
    'energetic': 'complementary',
    'vibrant': 'triadic',
    'balanced': 'tetradic',
    'calm': 'analogous',
    'minimalist': 'monochromatic',
    'sophisticated': 'splitComplementary'
  };
  
  for (const term of semanticTerms) {
    if (harmonyMappings[term]) {
      return harmonyMappings[term];
    }
  }
  
  // Default to analogous as it's generally pleasing
  return 'analogous';
}
```

### Image-Based Color Extraction

We extract dominant colors from images using k-means clustering:

```typescript
async function extractColorsFromImage(
  imageData: ImageData, 
  colorCount: number = 5
): Promise<RGBColor[]> {
  // Convert image data to an array of RGB values
  const pixelData = imageDataToRGBArray(imageData);
  
  // Use k-means to find dominant colors
  const dominantColors = await kMeans(pixelData, colorCount);
  
  // Sort colors by prominence (cluster size)
  return sortColorsByProminence(dominantColors);
}

function imageDataToRGBArray(imageData: ImageData): RGBColor[] {
  const pixels: RGBColor[] = [];
  const { data, width, height } = imageData;
  
  // Sample the image (analyze every Nth pixel to improve performance)
  const sampleRate = Math.max(1, Math.floor(Math.sqrt(width * height) / 100));
  
  for (let y = 0; y < height; y += sampleRate) {
    for (let x = 0; x < width; x += sampleRate) {
      const i = (y * width + x) * 4;
      pixels.push([data[i], data[i + 1], data[i + 2]]);
    }
  }
  
  return pixels;
}
```

## Advanced Techniques

### K-means Clustering

We implement k-means clustering for image color extraction:

```typescript
async function kMeans(
  points: RGBColor[], 
  k: number, 
  maxIterations: number = 50
): Promise<ClusterResult[]> {
  // Initialize centroids randomly by picking k points from the data
  let centroids: RGBColor[] = initializeCentroids(points, k);
  let assignments: number[] = [];
  let iteration = 0;
  let changed = true;
  
  while (changed && iteration < maxIterations) {
    // Assign points to nearest centroid
    const newAssignments = points.map(point => 
      findNearestCentroidIndex(point, centroids)
    );
    
    // Check if assignments have changed
    changed = !arraysEqual(assignments, newAssignments);
    assignments = newAssignments;
    
    if (changed) {
      // Calculate new centroids based on assignments
      centroids = calculateNewCentroids(points, assignments, k);
    }
    
    iteration++;
  }
  
  // Count points in each cluster and return results
  const clusters: ClusterResult[] = [];
  for (let i = 0; i < k; i++) {
    const clusterPoints = points.filter((_, index) => assignments[index] === i);
    clusters.push({
      color: centroids[i],
      count: clusterPoints.length
    });
  }
  
  return clusters;
}

function initializeCentroids(points: RGBColor[], k: number): RGBColor[] {
  // K-means++ initialization algorithm for better results
  const centroids: RGBColor[] = [];
  
  // Choose the first centroid randomly
  const firstIndex = Math.floor(Math.random() * points.length);
  centroids.push([...points[firstIndex]]);
  
  // Choose remaining centroids based on distance
  for (let i = 1; i < k; i++) {
    // Calculate distances from points to nearest existing centroid
    const distances = points.map(point => {
      const nearestDistance = Math.min(...centroids.map(centroid => 
        calculateDistance(point, centroid)
      ));
      return nearestDistance * nearestDistance; // Square to emphasize far points
    });
    
    // Choose the next centroid with probability proportional to squared distance
    const sum = distances.reduce((a, b) => a + b, 0);
    const threshold = Math.random() * sum;
    
    let cumSum = 0;
    let j = 0;
    for (; j < points.length; j++) {
      cumSum += distances[j];
      if (cumSum >= threshold) break;
    }
    
    centroids.push([...points[j]]);
  }
  
  return centroids;
}

function calculateDistance(pointA: RGBColor, pointB: RGBColor): number {
  // Euclidean distance in RGB space
  return Math.sqrt(
    Math.pow(pointA[0] - pointB[0], 2) +
    Math.pow(pointA[1] - pointB[1], 2) +
    Math.pow(pointA[2] - pointB[2], 2)
  );
}
```

### Perceptual Uniformity Considerations

We use LAB color space for operations that need perceptual uniformity:

```typescript
function adjustColorPerceptually(
  labColor: LABColor, 
  targetLightness: number
): LABColor {
  // Modify lightness while keeping a* and b* constant
  return [targetLightness, labColor[1], labColor[2]];
}

function findPerceptuallyUniformPalette(
  baseColor: LABColor, 
  count: number, 
  minDistance: number
): LABColor[] {
  const palette: LABColor[] = [baseColor];
  
  // Convert to LCh for easier manipulation of hue
  const baseLCh = labToLCh(baseColor);
  
  // Step around the hue circle with equal perceptual steps
  const hueStep = 360 / count;
  
  for (let i = 1; i < count; i++) {
    // Generate new color with rotated hue
    const newHue = (baseLCh[2] + i * hueStep) % 360;
    const newLCh: LChColor = [baseLCh[0], baseLCh[1], newHue];
    const newLab = lchToLab(newLCh);
    
    palette.push(newLab);
  }
  
  // Iteratively adjust colors to maintain minimum perceptual distance
  return optimizePaletteDistances(palette, minDistance);
}

function optimizePaletteDistances(
  palette: LABColor[], 
  minDistance: number, 
  maxIterations: number = 50
): LABColor[] {
  let optimizedPalette = [...palette];
  let iteration = 0;
  let improved = true;
  
  while (improved && iteration < maxIterations) {
    improved = false;
    
    // Check each pair of colors
    for (let i = 0; i < optimizedPalette.length; i++) {
      for (let j = i + 1; j < optimizedPalette.length; j++) {
        const distance = deltaE2000(optimizedPalette[i], optimizedPalette[j]);
        
        if (distance < minDistance) {
          // Move colors apart in a* b* space to increase distance
          const direction = [
            optimizedPalette[j][1] - optimizedPalette[i][1], // a* direction
            optimizedPalette[j][2] - optimizedPalette[i][2]  // b* direction
          ];
          
          const magnitude = Math.sqrt(direction[0]**2 + direction[1]**2);
          
          if (magnitude > 0) {
            // Normalize direction vector
            const normalizedDir = [direction[0] / magnitude, direction[1] / magnitude];
            
            // Move colors apart
            const moveAmount = (minDistance - distance) * 0.5;
            
            // Adjust first color in negative direction
            optimizedPalette[i] = [
              optimizedPalette[i][0],
              optimizedPalette[i][1] - normalizedDir[0] * moveAmount,
              optimizedPalette[i][2] - normalizedDir[1] * moveAmount
            ];
            
            // Adjust second color in positive direction
            optimizedPalette[j] = [
              optimizedPalette[j][0],
              optimizedPalette[j][1] + normalizedDir[0] * moveAmount,
              optimizedPalette[j][2] + normalizedDir[1] * moveAmount
            ];
            
            improved = true;
          }
        }
      }
    }
    
    iteration++;
  }
  
  return optimizedPalette;
}
```

### Attribute Manipulation and Locking

Our algorithms support locking and manipulating specific color attributes:

```typescript
function adjustPalette(
  palette: HSLColor[], 
  adjustments: {
    hueShift?: number,
    saturationMultiplier?: number,
    lightnessMultiplier?: number
  },
  lockedIndices: number[] = []
): HSLColor[] {
  return palette.map((color, index) => {
    // Skip locked colors
    if (lockedIndices.includes(index)) {
      return color;
    }
    
    const [h, s, l] = color;
    let newH = h;
    let newS = s;
    let newL = l;
    
    // Apply hue shift if provided
    if (adjustments.hueShift !== undefined) {
      newH = (h + adjustments.hueShift) % 360;
      if (newH < 0) newH += 360;
    }
    
    // Apply saturation multiplier if provided
    if (adjustments.saturationMultiplier !== undefined) {
      newS = Math.max(0, Math.min(100, s * adjustments.saturationMultiplier));
    }
    
    // Apply lightness multiplier if provided
    if (adjustments.lightnessMultiplier !== undefined) {
      newL = Math.max(0, Math.min(100, l * adjustments.lightnessMultiplier));
    }
    
    return [newH, newS, newL];
  });
}

function regeneratePartialPalette(
  palette: HSLColor[],
  harmonyType: HarmonyType,
  lockedIndices: number[] = []
): HSLColor[] {
  // If all colors are locked, just return the palette
  if (lockedIndices.length === palette.length) {
    return palette;
  }
  
  // Find the first unlocked color to use as seed
  // If all colors are locked, use the first color
  const seedIndex = palette.findIndex((_, index) => !lockedIndices.includes(index));
  const seedColor = seedIndex >= 0 ? palette[seedIndex] : palette[0];
  
  // Generate new palette based on the seed color
  const newPalette = generatePaletteFromSeed(seedColor, palette.length, harmonyType);
  
  // Preserve locked colors
  return palette.map((color, index) => 
    lockedIndices.includes(index) ? color : newPalette[index]
  );
}
```

These algorithms form the core of the Ultimate Color Generator application, enabling users to create cohesive, aesthetically pleasing, and accessible color palettes with ease.
