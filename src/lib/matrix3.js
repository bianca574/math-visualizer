export function rotX(t) {
    const c = Math.cos(t), s = Math.sin(t)
    return [
      [1, 0, 0],
      [0, c, -s],
      [0, s, c],
    ]
  }
export function rotY(t) {
  const c = Math.cos(t), s = Math.sin(t)
  return [
    [c, 0, s],
    [0, 1, 0],
    [-s, 0, c],
  ]
}
export function rotZ(t) {
  const c = Math.cos(t), s = Math.sin(t)
  return [
    [c, -s, 0],
    [s, c, 0],
    [0, 0, 1],
  ]
}
export function scale3(sx, sy, sz) {
  return [
    [sx, 0, 0],
    [0, sy, 0],
    [0, 0, sz],
  ]
}
  
export function matMul3(A, B) {
  const result = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let sum = 0
      for (let k = 0; k < 3; k++) sum += A[i][k] * B[k][j]
      result[i][j] = sum
    }
  }
  return result
}
  
export function applyMatrix3(m, x, y, z) {
  return {
    x: m[0][0] * x + m[0][1] * y + m[0][2] * z,
    y: m[1][0] * x + m[1][1] * y + m[1][2] * z,
    z: m[2][0] * x + m[2][1] * y + m[2][2] * z,
  }
}

export function det3(m) {
  const [[a, b, c], [d, e, f], [g, h, i]] = m
  return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g)
}

export function rotationAxis3(axis, angle) {
  const len = Math.sqrt(axis.x ** 2 + axis.y ** 2 + axis.z ** 2) || 1
  const x = axis.x / len, y = axis.y / len, z = axis.z / len
  const c = Math.cos(angle), s = Math.sin(angle), t = 1 - c
  return [
    [t * x * x + c, t * x * y - s * z, t * x * z + s * y],
    [t * x * y + s * z, t * y * y + c, t * y * z - s * x],
    [t * x * z - s * y, t * y * z + s * x, t * z * z + c],
  ]
}