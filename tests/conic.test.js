import { describe, it, expect } from 'vitest'
import { classifyConic, conicPoints } from '../src/lib/conic'

describe('classifyConic', () => {
    it('classifies a circle as an ellipse', () => {
        expect(classifyConic(1, 0, 1)).toBe('ellipse')
    })
    it('classifies delta = 0 as a parabola', () => {
        expect(classifyConic(1, 0, 0)).toBe('parabole')
    })
    it('classifies delta > 0 as a hyperbola', () => {
        expect(classifyConic(1, 0, -1)).toBe('hyperbole')
    })
})

describe('conicPoints', () => {
    it('finds points on a circle of radius 2', () => {
        const pts = conicPoints({ A: 1, B: 0, C: 1, D: 0, E: 0, F: -4 }, -2, 2, 100)
        expect(pts.length).toBeGreaterThan(0)
        pts.forEach((p) => {
            expect(p.x * p.x + p.y * p.y).toBeCloseTo(4, 0)
        })
    })
})