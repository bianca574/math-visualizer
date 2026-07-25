export function dot(u, v) {
    return u.x * v.x + u.y * v.y
}
export function norm(v) {
    return Math.sqrt(dot(v, v))
}
  
// orthogonal projection of v onto the line spanned by u
export function projectOnto(v, u) {
    const uu = dot(u, u)
    if (uu < 1e-9) return { x: 0, y: 0 }
    const k = dot(v, u) / uu
    return { x: k * u.x, y: k * u.y }
}