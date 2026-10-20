// UNTESTED
// Dove deeper into Gaussian Elimination of Matrices of higher orders

/**
 * Calculates the determinant of an N x N square matrix using
 * Gaussian Elimination with Partial Pivoting.
 *
 * Time Complexity: O(n^3)
 * Space Complexity: O(n^2) (cloned matrix to prevent mutation)
 *
 * @param m - A 2D square matrix.
 * @returns The calculated determinant as a number.
 */

export function determinantGaussian(m: readonly (readonly number[])[]): number {
  const n = m.length;

  // 1. Validation: Ensure non-empty square matrix
  if (n === 0 || m.some(row => row.length !== n)) {
    throw new Error("Determinant can only be calculated for non-empty square matrices.");
  }

  // Handle minor base cases directly for speed
  if (n === 1) return m[0][0];
  if (n === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];

  // 2. Clone matrix to ensure immutability of the original input
  const mat: number[][] = m.map(row => [...row]);
  let detSign = 1;

  // 3. Forward Elimination with Partial Pivoting
  for (let i = 0; i < n; i++) {
    let pivotRow = i;

    // Find the row with the largest absolute value in the current column (stability)
    for (let r = i + 1; r < n; r++) {
      if (Math.abs(mat[r][i]) > Math.abs(mat[pivotRow][i])) {
        pivotRow = r;
      }
    }

    // If the pivot is effectively zero, the matrix is singular (determinant is 0)
    if (Math.abs(mat[pivotRow][i]) < 1e-12) {
      return 0;
    }

    // Swap rows if necessary
    if (pivotRow !== i) {
      const temp = mat[i];
      mat[i] = mat[pivotRow];
      mat[pivotRow] = temp;

      // Linear Algebra Rule: Swapping two rows flips the sign of the determinant
      detSign *= -1;
    }

    // Eliminate values below the pivot
    for (let j = i + 1; j < n; j++) {
      const factor = mat[j][i] / mat[i][i];
      for (let k = i; k < n; k++) {
        mat[j][k] -= factor * mat[i][k];
      }
    }
  }

  // 4. Calculate determinant as the product of the diagonal elements
  let det = detSign;
  for (let i = 0; i < n; i++) {
    det *= mat[i][i];
  }

  // Clean up potential tiny floating-point artifacts (e.g. -0 or 0.0000000001)
  return Math.abs(det) < 1e-12 ? 0 : det;
}
