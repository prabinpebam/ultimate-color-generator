import { RGBColor, ClusterResult } from '../types/color';

/**
 * Implementation of k-means clustering algorithm for color extraction
 * 
 * @param points - Array of RGB colors to cluster
 * @param k - Number of clusters (colors) to extract
 * @param maxIterations - Maximum number of iterations
 * @returns Array of clusters with their centroid colors and counts
 */
export async function kMeans(
  points: RGBColor[],
  k: number,
  maxIterations: number = 50
): Promise<ClusterResult[]> {
  // Handle edge cases
  if (points.length === 0) {
    return [];
  }
  
  if (points.length <= k) {
    // If we have fewer points than requested clusters, return the points
    return points.map(point => ({ color: point, count: 1 }));
  }
  
  // Initialize centroids using k-means++ method for better results
  let centroids: RGBColor[] = initializeCentroids(points, k);
  let assignments: number[] = new Array(points.length).fill(-1);
  let iteration = 0;
  let changed = true;
  
  // Main k-means loop
  while (changed && iteration < maxIterations) {
    // Assign each point to nearest centroid
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
    
    // Allow UI to update by yielding execution
    if (iteration % 5 === 0) {
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }
  
  // Count points in each cluster
  const clusters: ClusterResult[] = [];
  for (let i = 0; i < k; i++) {
    const clusterPoints = points.filter((_, index) => assignments[index] === i);
    if (clusterPoints.length > 0) {
      clusters.push({
        color: centroids[i],
        count: clusterPoints.length
      });
    }
  }
  
  // Sort clusters by size (largest first)
  return clusters.sort((a, b) => b.count - a.count);
}

/**
 * k-means++ initialization algorithm for better initial centroids
 */
function initializeCentroids(points: RGBColor[], k: number): RGBColor[] {
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

/**
 * Calculate Euclidean distance between two RGB colors
 */
function calculateDistance(pointA: RGBColor, pointB: RGBColor): number {
  return Math.sqrt(
    Math.pow(pointA[0] - pointB[0], 2) +
    Math.pow(pointA[1] - pointB[1], 2) +
    Math.pow(pointA[2] - pointB[2], 2)
  );
}

/**
 * Find index of the nearest centroid to a point
 */
function findNearestCentroidIndex(point: RGBColor, centroids: RGBColor[]): number {
  let minDistance = Infinity;
  let nearestIndex = 0;
  
  centroids.forEach((centroid, index) => {
    const distance = calculateDistance(point, centroid);
    if (distance < minDistance) {
      minDistance = distance;
      nearestIndex = index;
    }
  });
  
  return nearestIndex;
}

/**
 * Calculate new centroids based on point assignments
 */
function calculateNewCentroids(
  points: RGBColor[],
  assignments: number[],
  k: number
): RGBColor[] {
  // Initialize accumulators for each cluster
  const sums: number[][] = Array(k).fill(0).map(() => [0, 0, 0]);
  const counts: number[] = Array(k).fill(0);
  
  // Sum up all points in each cluster
  points.forEach((point, i) => {
    const clusterIndex = assignments[i];
    sums[clusterIndex][0] += point[0];
    sums[clusterIndex][1] += point[1];
    sums[clusterIndex][2] += point[2];
    counts[clusterIndex]++;
  });
  
  // Calculate the average for each cluster
  return sums.map((sum, i) => {
    // If cluster is empty, return a random point
    if (counts[i] === 0) {
      const randomIndex = Math.floor(Math.random() * points.length);
      return [...points[randomIndex]];
    }
    
    // Otherwise calculate the average (centroid)
    return [
      Math.round(sum[0] / counts[i]),
      Math.round(sum[1] / counts[i]),
      Math.round(sum[2] / counts[i])
    ];
  });
}

/**
 * Check if two arrays are equal
 */
function arraysEqual(arr1: any[], arr2: any[]): boolean {
  if (arr1.length !== arr2.length) return false;
  
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  
  return true;
}
