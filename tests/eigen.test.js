import { describe, it, expect } from 'vitest'
import { eigen2 } from '../src/lib/eigen'

describe('eigen2', () => {
    it('finds eigenvalues/eigenvectors of a diagonal matrix', () => {
        const result = eigen2([[2, 0], [0, 3]])
        expect(result.real).toBe(true)
        expect(result.l1).toBeCloseTo(3)
        expect(result.l2).toBeCloseTo(2)
        expect(result.v1).toEqual({ x: 0, y: 1 })
        expect(result.v2).toEqual({ x: 1, y: 0 })
    })

    it('reports no real eigenvalues for a pure rotation', () => {
        const result = eigen2([[0, -1], [1, 0]])
        expect(result.real).toBe(false)
    })
})