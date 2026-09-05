import { describe, it, expect } from 'vitest'
import { classifySignature } from '../src/lib/quadraticForm'

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