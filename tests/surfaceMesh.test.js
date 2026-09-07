import { describe, it, expect } from 'vitest'
import * as THREE from 'three'
import { buildSurfaceGeometry } from '../src/lib/surfaceMesh'

describe('buildSurfaceGeometry', () => {
    it('produces the expected number of vertices and triangle indices', () => {
        const geometry = buildSurfaceGeometry(THREE, (x, y) => x + y, 0, 1, 0, 1, 2)
        // divisions=2 → (2+1)^2 = 9 vertices, 2*2*6 = 24 indices (2 triangles per cell)
        expect(geometry.attributes.position.count).toBe(9)
        expect(geometry.index.count).toBe(24)
    })
})