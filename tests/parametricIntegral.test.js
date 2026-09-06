import { describe, it, expect } from 'vitest'
import { integrate } from '../src/lib/parametricIntegral'

describe('integrate', () => {
    it('integrates x over [0,1] to 0.5', () => {
        expect(integrate((x) => x, 0, 1)).toBeCloseTo(0.5, 3)
    })
    it('integrates a constant correctly', () => {
        expect(integrate(() => 1, 0, 2)).toBeCloseTo(2, 3)
    })
})