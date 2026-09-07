import { describe, it, expect } from 'vitest'
import { integrate2D } from '../src/lib/multipleIntegral'

describe('integrate2D', () => {
    it('integrates 1 over the unit square to 1 (area)', () => {
        expect(integrate2D(() => 1, 0, 1, 0, 1, 50)).toBeCloseTo(1, 3)
    })
    it('integrates x over the unit square to 0.5', () => {
        expect(integrate2D((x) => x, 0, 1, 0, 1, 50)).toBeCloseTo(0.5, 3)
    })
})