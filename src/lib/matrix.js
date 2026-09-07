export function det2(m) {
  return m[0][0] * m[1][1] - m[0][1] * m[1][0]
}

export function applyMatrix(m, x, y) {
  return {
    x: m[0][0] * x + m[0][1] * y,
    y: m[1][0] * x + m[1][1] * y,
  }
}

export function matMul2(A, B) {
  const result = [
    [
      A[0][0] * B[0][0] + A[0][1] * B[1][0],
      A[0][0] * B[0][1] + A[0][1] * B[1][1]
    ],
    [
      A[1][0] * B[0][0] + A[1][1] * B[1][0],
      A[1][0] * B[0][1] + A[1][1] * B[1][1]
    ],
  ]
  return result.map(row => row.map(value => value === 0 ? 0 : value))
}

