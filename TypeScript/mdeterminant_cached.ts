/* Found a solution on Codewars that used cache, asked AI about it and improved the key|value pairs for
   more performant #map - For higher order matrices a Gaussian Elimination and Partial Pivot is necessary
*/

export function determinant(m: number[][]): number {
  // Handle error: Ensure non-empty square matrix
  if (m.length === 0 || m.some(row => row.length !== m.length)) {
    throw new Error("Determinant can only be calculated for non-empty square matrices.");
  }

  const cache: Record<string, number> = {};

  const computeDeterminant = (matrix: number[][]): number => {
    const n = matrix.length;

    // Base cases
    if (n === 1) {
      return matrix[0][0];
    }
    if (n === 2) {
      return (matrix[0][0] * matrix[1][1]) - (matrix[0][1] * matrix[1][0]);
    }

    // Fast key generation: Join rows with commas, separate rows with pipes
    // Example: [[1,2],[3,4]] becomes "1,2|3,4"
    const key = matrix.map(row => row.join(',')).join('|');

    if (key in cache) {
      return cache[key];
    }

    let det = 0;

    for (let colIndex = 0; colIndex < n; colIndex++) {
      const val = matrix[0][colIndex];

      // Optimization: Skip calculation if multiplier is zero
      if (val === 0) {
        continue;
      }

      const sign = colIndex % 2 === 0 ? 1 : -1;
      const minor = matrix.slice(1).map(row =>
          row.filter((_, idx) => idx !== colIndex)
      );

      det += sign * val * computeDeterminant(minor);
    }

    // Store the computed result in cache before returning
    cache[key] = det;
    return det;
  };

  return computeDeterminant(m);
}
