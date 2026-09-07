import { describe, it, expect } from 'vitest'
import { classifySignature, levelCurve } from '../src/lib/quadraticForm'

describe('classifySignature', () => {
    it('classifies a positive definite form', () => {
        const result = classifySignature(1, 0, 1)
        expect(result.positives).toBe(2)
        expect(result.negatives).toBe(0)
    })
    it('classifies a negative definite form', () => {
        const result = classifySignature(-1, 0, -1)
        expect(result.positives).toBe(0)
        expect(result.negatives).toBe(2)
    })
    it('classifies an indefinite form', () => {
        const result = classifySignature(1, 0, -1)
        expect(result.positives).toBe(1)
        expect(result.negatives).toBe(1)
    })
    it('translates the label when lang is en', () => {
        const result = classifySignature(1, 0, 1, 'en')
        expect(result.label).toBe('positive definite')
    })
})

describe('levelCurve', () => {
    it('returns an ellipse for a positive definite form', () => {
        const curve = levelCurve(1, 0, 1)
        expect(curve.type).toBe('ellipse')
        expect(curve.points.length).toBeGreaterThan(0)
    })
    it('returns a hyperbola for an indefinite form', () => {
        const curve = levelCurve(1, 0, -1)
        expect(curve.type).toBe('hyperbola')
        expect(curve.branches.length).toBe(2)
    })
    it('returns degenerate for the zero form', () => {
        const curve = levelCurve(0, 0, 0)
        expect(curve.type).toBe('degenerate')
    })
})