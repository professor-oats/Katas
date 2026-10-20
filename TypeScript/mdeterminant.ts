// Description
/*
Write a function that accepts a square matrix (N x N 2D array) and returns the determinant of the matrix.

How to take the determinant of a matrix -- it is simplest to start with the smallest cases:

A 1x1 matrix |a| has determinant a.

A 2x2 matrix [ [a, b], [c, d] ] or

|a  b|
|c  d|

has determinant: a*d - b*c.

The determinant of an n x n sized matrix is calculated by reducing the problem to the calculation of the determinants of n matrices ofn-1 x n-1 size.

For the 3x3 case, [ [a, b, c], [d, e, f], [g, h, i] ] or

|a b c|
|d e f|
|g h i|

the determinant is: a * det(a_minor) - b * det(b_minor) + c * det(c_minor) where det(a_minor) refers to taking the determinant of the 2x2 matrix created by crossing out the row and column in which the element a occurs:

|- - -|
|- e f|
|- h i|

Note the alternation of signs.

The determinant of larger matrices are calculated analogously, e.g. if M is a 4x4 matrix with first row [a, b, c, d], then:

det(M) = a * det(a_minor) - b * det(b_minor) + c * det(c_minor) - d * det(d_minor)
 */

export function determinant(m:number[][]): number {
  // return the determinant of the matrix passed in
  // The determinant of larger matrices are calculated analogously, e.g. if M is a 4x4 matrix with first row [a, b, c, d], then:
  // det(M) = a * det(a_minor) - b * det(b_minor) + c * det(c_minor) - d * det(d_minor)

  /* The determinant of an n x n sized matrix is calculated 
     by reducing the problem to the calculation of the determinants 
     of n matrices of n-1 x n-1 size.
  */

  /* Easy - Minimum in is 2x2 - Recursively reduce into this */
  /* Handle base cases */
  /* If 0 return from recurse */
  /* Make it more easy to only take the first row programmatically */
  /* Make a forEach in first occurence and switch sign when walking */
  /* Recurse starts with forEach of each n-1 row until 2x2 */
  /* Do something good with shift() to get the n-1 ? -- Mutating -- AH no */
  /* Check current pos in array */
  /* forEach in m[[][][]] */
  /* first row always m[0] */
  /* Negating sign with - flips the sign in each iterate (*-1) */
  /* Every mod 2 is positive */
  /* Store result */

  // let innerArrayIndex: number = 0; (Column index)

  // Handle error

  if (m.length === 0 || m.some(row => row.length !== m.length)) {
    throw new Error("Determinant can only be calculated for non-empty square matrices.");
  }

  // Handle base cases

  if (m.length === 1) {
    return m[0][0];
  }
  if (m.length === 2) {
    return (m[0][0] * m[1][1]) - (m[0][1] * m[1][0]);
  }

  let mdeter: number = 0;

  for (let innerArrayIndex: number = 0; innerArrayIndex < m.length; innerArrayIndex++ ) {
    const currentVal: number = m[0][innerArrayIndex];

    if (currentVal === 0) {
      continue;
    }

    const sign: 1|-1 = innerArrayIndex % 2 === 0 ? 1 : -1;
    const subRows: number[][] = m.slice(1);

    // For every subrow, filter out each index not equal to innerArrayIndex
    const minor: number[][] = subRows.map(row =>
        row.filter((_, idx) => idx !== innerArrayIndex)
    );

    // Calc the mdeter with sign out of currentVal recursively
    mdeter += sign * currentVal * determinant(minor);
  }
  return mdeter;

}
