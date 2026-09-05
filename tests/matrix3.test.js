import { describe, it, expect } from 'vitest'
import { det3, rotationAxis3 } from '../src/lib/matrix3'

describe('det3', () => {
    it('is 1 for the identity matrix', () => {
        expect(det3([[1, 0, 0], [0, 1, 0], [0, 0, 1]])).toBe(1)
    })
    it('matches cofactor expansion for a known matrix', () => {
        expect(det3([[1, 2, 3], [4, 5, 6], [7, 8, 10]])).toBe(-3)
    })
})

describe('rotationAxis3', () => {
    it('builds a standard 90° rotation about the z-axis', () => {
        const m = rotationAxis3({ x: 0, y: 0, z: 1 }, Math.PI / 2)
        const expected = [[0, -1, 0], [1, 0, 0], [0, 0, 1]]
        m.forEach((row, i) => row.forEach((v, j) => expect(v).toBeCloseTo(expected[i][j])))
    })
})