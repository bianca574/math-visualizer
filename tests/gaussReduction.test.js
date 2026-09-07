import { describe, it, expect } from 'vitest'
import { gaussReductionSteps } from '../src/lib/gaussReduction'

describe('gaussReductionSteps', () => {
    it('takes the a≠0 branch (4 steps)', () => {
        const { steps } = gaussReductionSteps(1, 2, 1)
        expect(steps.length).toBe(4)
    })
    it('takes the a=0,c≠0 branch (3 steps)', () => {
        const { steps } = gaussReductionSteps(0, 1, 1)
        expect(steps.length).toBe(3)
    })
    it('takes the substitution branch when a=c=0,b≠0 (2 steps)', () => {
        const { steps } = gaussReductionSteps(0, 1, 0)
        expect(steps.length).toBe(2)
    })
    it('handles the zero form (1 step)', () => {
        const { steps } = gaussReductionSteps(0, 0, 0)
        expect(steps.length).toBe(1)
    })
    it('translates step text when lang is en', () => {
        const fr = gaussReductionSteps(1, 2, 1, 'fr')
        const en = gaussReductionSteps(1, 2, 1, 'en')
        expect(fr.steps[0].text).not.toBe(en.steps[0].text)
    })
})