import { describe, it, expect } from 'vitest'
import { powerSeriesPresets, partialSum } from '../src/lib/powerSeries'

describe('partialSum', () => {
    it('sums the geometric series correctly for a few terms', () => {
        const preset = powerSeriesPresets.find((p) => p.id === 'geometric')
        // 1 + 0.5 + 0.25 = 1.75
        expect(partialSum(preset, 0.5, 2)).toBeCloseTo(1.75)
    })
    it('approaches e^x for the exponential series with enough terms', () => {
        const preset = powerSeriesPresets.find((p) => p.id === 'exp')
        expect(partialSum(preset, 1, 15)).toBeCloseTo(Math.E, 5)
    })
})