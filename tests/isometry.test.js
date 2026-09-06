import { describe, it, expect } from 'vitest'
import { classifyIsometry2, classifyIsometry3, isOrthogonal2, isOrthogonal3 } from '../src/lib/isometry'

describe('isOrthogonal2', () => {
    it('accepts a rotation matrix', () => {
        expect(isOrthogonal2([[0, -1], [1, 0]])).toBe(true)
    })
    it('rejects a non-orthogonal matrix', () => {
        expect(isOrthogonal2([[2, 0], [0, 1]])).toBe(false)
    })
})

describe('classifyIsometry2', () => {
    it('identifies a 90° rotation', () => {
        const result = classifyIsometry2([[0, -1], [1, 0]])
        expect(result.type).toBe('rotation')
        expect(result.angleDeg).toBeCloseTo(90)
    })
    it('identifies a reflection', () => {
        const result = classifyIsometry2([[1, 0], [0, -1]])
        expect(result.type).toBe('reflection')
    })
    it('flags a non-isometry', () => {
        const result = classifyIsometry2([[2, 0], [0, 1]])
        expect(result.orthogonal).toBe(false)
    })
})

describe('isOrthogonal3', () => {
    it('accepts the identity', () => {
        expect(isOrthogonal3([[1, 0, 0], [0, 1, 0], [0, 0, 1]])).toBe(true)
    })
})

describe('classifyIsometry3', () => {
    it('identifies a rotation (det = +1)', () => {
        const result = classifyIsometry3([[0, -1, 0], [1, 0, 0], [0, 0, 1]])
        expect(result.type).toBe('rotation')
        expect(result.angleDeg).toBeCloseTo(90)
    })
    it('identifies central symmetry (-Id)', () => {
        const result = classifyIsometry3([[-1, 0, 0], [0, -1, 0], [0, 0, -1]])
        expect(result.subtype).toBe('inversion')
    })
    it('identifies a plane reflection', () => {
        const result = classifyIsometry3([[1, 0, 0], [0, 1, 0], [0, 0, -1]])
        expect(result.subtype).toBe('reflection')
    })
})