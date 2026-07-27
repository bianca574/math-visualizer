// Builds a triangulated surface mesh for z = fn(x, y) over a rectangular
// domain. Three.js convention here: X and Z are the math x/y plane
// (matching your GridHelper), Y is height — same axis mapping Determinants
// and Transformations3D already use.
export function buildSurfaceGeometry(THREE, fn, xMin, xMax, yMin, yMax, divisions = 40) {
  const geometry = new THREE.BufferGeometry()
  const positions = []
  const indices = []

  for (let j = 0; j <= divisions; j++) {
    const y = yMin + ((yMax - yMin) * j) / divisions
    for (let i = 0; i <= divisions; i++) {
      const x = xMin + ((xMax - xMin) * i) / divisions
      positions.push(x, fn(x, y), y)
    }
  }

  const rowLength = divisions + 1
  for (let j = 0; j < divisions; j++) {
    for (let i = 0; i < divisions; i++) {
      const a = j * rowLength + i
      const b = a + 1
      const c = a + rowLength
      const d = c + 1
      indices.push(a, c, b, b, c, d)
    }
  }

  geometry.setIndex(indices)
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.computeVertexNormals()
  return geometry
}