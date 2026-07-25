import { det2 } from './matrix'
import { det3 } from './matrix3'

export function isOrthogonal2(m, tol = 5e-2) {
  const [a, b, c, d] = [m[0][0], m[0][1], m[1][0], m[1][1]]
  return Math.abs(a * a + c * c - 1) < tol && Math.abs(b * b + d * d - 1) < tol && Math.abs(a * b + c * d) < tol
}

export function classifyIsometry2(m) {
  if (!isOrthogonal2(m)) return { orthogonal: false }
  const determinant = det2(m)
  const theta = Math.atan2(m[1][0], m[0][0])
  if (determinant > 0) return { orthogonal: true, type: 'rotation', angleDeg: (theta * 180) / Math.PI }
  return { orthogonal: true, type: 'reflection', axisAngleDeg: (theta * 180) / Math.PI / 2 }
}

export function isOrthogonal3(m, tol = 5e-2) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let s = 0
      for (let k = 0; k < 3; k++) s += m[k][i] * m[k][j]
      if (Math.abs(s - (i === j ? 1 : 0)) > tol) return false
    }
  }
  return true
}

// Standard matrix → axis/angle extraction. Falls back to a different
// formula near 180° because the usual one divides by sin(theta), which
// is ~0 right where we need it most.
export function rotationAxisAngle3(R) {
  const trace = R[0][0] + R[1][1] + R[2][2]
  const theta = Math.acos(Math.max(-1, Math.min(1, (trace - 1) / 2)))

  if (theta < 1e-6) return { axis: { x: 0, y: 0, z: 1 }, angle: 0 }

  if (Math.PI - theta < 1e-2) {
    const B = [
      [(R[0][0] + 1) / 2, (R[0][1] + R[1][0]) / 4, (R[0][2] + R[2][0]) / 4],
      [(R[1][0] + R[0][1]) / 4, (R[1][1] + 1) / 2, (R[1][2] + R[2][1]) / 4],
      [(R[2][0] + R[0][2]) / 4, (R[2][1] + R[1][2]) / 4, (R[2][2] + 1) / 2],
    ]
    let i = 0
    if (B[1][1] > B[i][i]) i = 1
    if (B[2][2] > B[i][i]) i = 2
    const axis = { x: B[0][i], y: B[1][i], z: B[2][i] }
    const len = Math.sqrt(axis.x ** 2 + axis.y ** 2 + axis.z ** 2) || 1
    return { axis: { x: axis.x / len, y: axis.y / len, z: axis.z / len }, angle: theta }
  }

  const axis = { x: R[2][1] - R[1][2], y: R[0][2] - R[2][0], z: R[1][0] - R[0][1] }
  const len = Math.sqrt(axis.x ** 2 + axis.y ** 2 + axis.z ** 2) || 1
  return { axis: { x: axis.x / len, y: axis.y / len, z: axis.z / len }, angle: theta }
}

export function classifyIsometry3(m) {
  if (!isOrthogonal3(m)) return { orthogonal: false }
  const determinant = det3(m)

  if (determinant > 0) {
    const { axis, angle } = rotationAxisAngle3(m)
    return { orthogonal: true, type: 'rotation', axis, angleDeg: (angle * 180) / Math.PI }
  }

  // A = -R, where R is a genuine rotation — so classify -A as a rotation
  // and reinterpret its angle as the antirotation's angle around the same axis.
  const negated = m.map((row) => row.map((v) => -v))
  const { axis, angle } = rotationAxisAngle3(negated)
  const angleDeg = (angle * 180) / Math.PI
  let subtype = 'antirotation'
  if (angleDeg < 1) subtype = 'inversion'
  else if (angleDeg > 179) subtype = 'reflection'
  return { orthogonal: true, type: 'antirotation', subtype, axis, angleDeg }
}