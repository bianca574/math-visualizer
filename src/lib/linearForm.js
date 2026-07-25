// A linear form on R² is φ(x,y) = a·x + b·y, uniquely represented by the
// vector (a,b) via the dot product: φ(v) = (a,b)·v. Its kernel — the set
// where φ(v) = 0 — is the line through the origin perpendicular to (a,b).
export function evalForm(a, b, x, y) {
  return a * x + b * y
}

// two points far enough apart to draw the kernel line across the whole plane
export function kernelLine(a, b, extent = 20) {
  if (Math.abs(a) < 1e-9 && Math.abs(b) < 1e-9) return null
  // direction perpendicular to (a,b) is (-b,a)
  return {
    p1: { x: -b * extent, y: a * extent },
    p2: { x: b * extent, y: -a * extent },
  }
}