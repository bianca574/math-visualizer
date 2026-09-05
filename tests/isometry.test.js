import { describe, it, expect } from 'vitest'
import { classifyIsometry2, classifyIsometry3 } from '../src/lib/isometry'

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
})

describe('classifyIsometry3', () => {
    it('identifies central symmetry (-Id)', () => {
        const result = classifyIsometry3([[-1, 0, 0], [0, -1, 0], [0, 0, -1]])
        expect(result.subtype).toBe('inversion')
    })
    it('identifies a plane reflection', () => {
        const result = classifyIsometry3([[1, 0, 0], [0, 1, 0], [0, 0, -1]])
        expect(result.subtype).toBe('reflection')
    })
})