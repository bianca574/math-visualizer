import { describe, it, expect } from 'vitest'
import { det2, applyMatrix, matMul2 } from '../src/lib/matrix'

describe('det2', () => {
    it('is 1 for the identity matrix', () => {
        expect(det2([[1, 0], [0, 1]])).toBe(1)
    })
    it('computes ad - bc', () => {
        expect(det2([[2, 0], [0, 3]])).toBe(6)
    })
    it('is negative for an orientation-reversing matrix', () => {
        expect(det2([[0, 1], [1, 0]])).toBe(-1)
    })
})

describe('applyMatrix', () => {
    it('leaves vectors unchanged under the identity', () => {
        expect(applyMatrix([[1, 0], [0, 1]], 3, 4)).toEqual({ x: 3, y: 4 })
    })
    it('scales each axis independently', () => {
        expect(applyMatrix([[2, 0], [0, 3]], 1, 1)).toEqual({ x: 2, y: 3 })
    })
})

describe('matMul2', () => {
    it('two 90° rotations compose into a 180° rotation', () => {
        const rot90 = [[0, -1], [1, 0]]
        expect(matMul2(rot90, rot90)).toEqual([[-1, 0], [0, -1]])
    })
})