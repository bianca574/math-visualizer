import { describe, it, expect } from 'vitest'
import { makeTransform } from '../src/lib/coordinates'

describe('makeTransform', () => {
    it('maps the origin to the center of the screen for a symmetric range', () => {
        const t = makeTransform({ width: 400, height: 400, xMin: -5, xMax: 5, yMin: -5, yMax: 5 })
        const origin = t.toScreen(0, 0)
        expect(origin.x).toBeCloseTo(200)
        expect(origin.y).toBeCloseTo(200)
    })

    it('toScreen and toPlane are inverses', () => {
        const t = makeTransform({ width: 400, height: 300, xMin: -5, xMax: 5, yMin: -5, yMax: 5 })
        const screen = t.toScreen(2, 3)
        const back = t.toPlane(screen.x, screen.y)
        expect(back.x).toBeCloseTo(2)
        expect(back.y).toBeCloseTo(3)
    })

    it('uses one locked scale so a square stays square on a non-square container', () => {
        const t = makeTransform({ width: 800, height: 400, xMin: -5, xMax: 5, yMin: -5, yMax: 5 })
        const a = t.toScreen(0, 0)
        const b = t.toScreen(1, 0)
        const c = t.toScreen(0, 1)
        const dx = b.x - a.x
        const dy = a.y - c.y
        expect(Math.abs(dx)).toBeCloseTo(Math.abs(dy))
    })
})