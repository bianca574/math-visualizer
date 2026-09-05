import { describe, it, expect } from 'vitest'
import { classifyCriticalPoint } from '../src/lib/criticalPoints'

describe('classifyCriticalPoint', () => {
    it('identifies a local minimum for x² + y² at the origin', () => {
        const result = classifyCriticalPoint((x, y) => x * x + y * y, 0, 0)
        expect(result.label).toBe('minimum local')
    })
    it('identifies a saddle point for x² - y² at the origin', () => {
        const result = classifyCriticalPoint((x, y) => x * x - y * y, 0, 0)
        expect(result.label).toBe('point selle')
    })
})