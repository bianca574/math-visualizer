import { parse } from 'mathjs'

// Compiles a text formula like "1/n" or "x^2 + sin(y)" into a callable
// function. Returns { fn, error } — fn is null if parsing/evaluation fails,
// so callers always check error before using fn.
export function compileFunction(expr, variables) {
  if (!expr || !expr.trim()) {
    return { fn: null, error: 'Empty expression' }
  }
  let code
  try {
    code = parse(expr).compile()
  } catch (err) {
    return { fn: null, error: err.message }
  }

  const fn = (...args) => {
    const scope = {}
    variables.forEach((name, i) => { scope[name] = args[i] })
    try {
      const result = code.evaluate(scope)
      return typeof result === 'number' ? result : NaN
    } catch {
      return NaN
    }
  }

  // sanity-check with a throwaway value so a formula that's syntactically
  // valid but semantically broken (e.g. referencing an undefined variable)
  // still surfaces as an error immediately, not silently as NaN later
  try {
    const testScope = {}
    variables.forEach((name) => { testScope[name] = 1 })
    code.evaluate(testScope)
  } catch (err) {
    return { fn: null, error: err.message }
  }

  return { fn, error: null }
}