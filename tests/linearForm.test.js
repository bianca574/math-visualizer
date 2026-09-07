import { describe, it, expect } from 'vitest'
import { evalForm, kernelLine } from '../src/lib/linearForm'

describe('evalForm', () => {
    it('computes ax + by', () => {
        expect(evalForm(2, 3, 1, 1)).toBe(5)
    })
})

describe('kernelLine', () => {
    it('returns a direction perpendicular to (a,b)', () => {
        const line = kernelLine(2, 1)
        const dir = { x: line.p2.x - line.p1.x, y: line.p2.y - line.p1.y }
        const dot = 2 * dir.x + 1 * dir.y
        expect(dot).toBeCloseTo(0)
    })
    it('returns null for the zero form', () => {
        expect(kernelLine(0, 0)).toBeNull()
    })
})