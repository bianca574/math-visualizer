import { describe, it, expect } from 'vitest'
import { det3, rotationAxis3, matMul3, applyMatrix3, scale3 } from '../src/lib/matrix3'

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

describe('matMul3 / applyMatrix3', () => {
    it('scale3 followed by applyMatrix3 scales each axis', () => {
        const S = scale3(2, 3, 4)
        expect(applyMatrix3(S, 1, 1, 1)).toEqual({ x: 2, y: 3, z: 4 })
    })
    it('matMul3 with the identity leaves a matrix unchanged', () => {
        const I = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
        const M = [[2, 0, 0], [0, 3, 0], [0, 0, 4]]
        expect(matMul3(I, M)).toEqual(M)
    })
})