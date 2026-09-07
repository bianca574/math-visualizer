import { describe, it, expect } from 'vitest'
import { makeScale } from '../src/lib/plotScale'

describe('makeScale', () => {
    it('maps independently on x and y (no locked aspect ratio)', () => {
        const s = makeScale(400, 100, 0, 10, 0, 100)
        const p = s.toScreen(5, 50)
        expect(p.x).toBeCloseTo(200)
        expect(p.y).toBeCloseTo(50)
    })

    it('flips y so larger values go up the screen', () => {
        const s = makeScale(100, 100, 0, 10, 0, 10)
        const bottom = s.toScreen(0, 0)
        const top = s.toScreen(0, 10)
        expect(top.y).toBeLessThan(bottom.y)
    })
})