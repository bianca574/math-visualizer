import { describe, it, expect } from 'vitest'
import { functionSeriesPresets, supError } from '../src/lib/functionSeries'

describe('supError', () => {
    it('computes the exact sup error for x/n on [-3,3]', () => {
        const preset = functionSeriesPresets.find((p) => p.id === 'x-over-n')
        // sup|x/n| over [-3,3] = 3/n
        expect(supError(preset, 3)).toBeCloseTo(1, 1)
    })
})