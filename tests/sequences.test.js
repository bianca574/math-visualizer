import { describe, it, expect } from 'vitest'
import { findThresholdN } from '../src/lib/sequences'

describe('findThresholdN', () => {
    it('finds N for a simple decreasing sequence', () => {
        // 1/n < 0.15 for all n >= 7 (1/6 ≈ 0.167 fails, 1/7 ≈ 0.143 passes)
        const N = findThresholdN((n) => 1 / n, 0, 0.15)
        expect(N).toBe(7)
    })
    it('returns null when no threshold is found within maxN', () => {
        const N = findThresholdN(() => 5, 0, 0.1, 50)
        expect(N).toBeNull()
    })
})