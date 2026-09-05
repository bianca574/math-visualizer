import { describe, it, expect } from 'vitest'
import { dot, norm, projectOnto } from '../src/lib/projection'

describe('dot / norm / projectOnto', () => {
    it('computes the dot product', () => {
        expect(dot({ x: 1, y: 2 }, { x: 3, y: 4 })).toBe(11)
    })
    it('computes the norm', () => {
        expect(norm({ x: 3, y: 4 })).toBe(5)
    })
    it('projects onto an axis-aligned vector', () => {
        expect(projectOnto({ x: 3, y: 4 }, { x: 1, y: 0 })).toEqual({ x: 3, y: 0 })
    })
})