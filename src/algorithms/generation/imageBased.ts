import { RGBColor } from '../../types/color';
import { kMeans } from '../kmeans';

/**
 * Extracts dominant colors from an image using k-means clustering
 * 
 * @param imageData - Image data from canvas getImageData
 * @param colorCount - Number of colors to extract
 * @returns Promise resolving to an array of RGB colors sorted by dominance
 */
export async function extractColorsFromImage(
  imageData: ImageData,
  colorCount: number = 5
): Promise<RGBColor[]> {
  // Convert image data to an array of RGB values
  const pixelData = imageDataToRGBArray(imageData);
  
  // Use k-means to find dominant colors
  const dominantColors = await kMeans(pixelData, colorCount);
  
  // Return colors sorted by cluster size (most dominant first)
  return dominantColors.map(cluster => cluster.color);
}

/**
 * Converts ImageData to an array of RGB values
 * Uses sampling to improve performance for large images
 * 
 * @param imageData - Image data from canvas getImageData
 * @returns Array of RGB colors from the image
 */
function imageDataToRGBArray(imageData: ImageData): RGBColor[] {
  const pixels: RGBColor[] = [];
  const { data, width, height } = imageData;
  
  // Sample the image (analyze every Nth pixel to improve performance)
  const sampleRate = Math.max(1, Math.floor(Math.sqrt(width * height) / 100));
  
  for (let y = 0; y < height; y += sampleRate) {
    for (let x = 0; x < width; x += sampleRate) {
      const i = (y * width + x) * 4;
      // Only include pixels that aren't fully transparent
      if (data[i + 3] > 127) {
        pixels.push([data[i], data[i + 1], data[i + 2]]);
      }
    }
  }
  
  return pixels;
}
