import { describe, it, expect } from 'vitest'
import { classifyConic } from '../src/lib/conic'

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