import { describe, it, expect } from 'vitest'
import { compileFunction } from '../src/lib/customFunction'

describe('compileFunction', () => {
    it('compiles and evaluates a valid expression', () => {
        const { fn, error } = compileFunction('x^2 + 1', ['x'])
        expect(error).toBeNull()
        expect(fn(2)).toBeCloseTo(5)
    })
    it('reports an error for malformed input', () => {
        const { fn, error } = compileFunction('x +', ['x'])
        expect(fn).toBeNull()
        expect(error).toBeTruthy()
    })
    it('reports an error for an undeclared variable', () => {
        const { fn, error } = compileFunction('y + 1', ['x'])
        expect(fn).toBeNull()
        expect(error).toBeTruthy()
    })
})