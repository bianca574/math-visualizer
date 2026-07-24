export function gaussReductionSteps(a, b, c) {
    if (Math.abs(a) > 1e-9) {
      const k = b / a
      const rem = c - (b * b) / a
      return {
        steps: [
          { text: `a \\neq 0 \\text{, on isole les termes en } x` },
          { text: `Q(x,y) = ${a}\\left(x + ${k.toFixed(2)}\\,y\\right)^2 ${rem >= 0 ? '+' : '-'} ${Math.abs(rem).toFixed(2)}\\,y^2` },
          { text: `x' = x + ${k.toFixed(2)}\\,y, \\quad y' = y` },
          { text: `Q = ${a}\\,x'^2 ${rem >= 0 ? '+' : '-'} ${Math.abs(rem).toFixed(2)}\\,y'^2` },
        ],
      }
    }
    if (Math.abs(c) > 1e-9) {
      const rem = -((b * b) / c)
      return {
        steps: [
          { text: `a = 0,\\ c \\neq 0 \\text{, on isole les termes en } y` },
          { text: `Q(x,y) = ${c}\\left(y + \\tfrac{${b.toFixed(2)}}{${c.toFixed(2)}}\\,x\\right)^2 ${rem >= 0 ? '+' : '-'} ${Math.abs(rem).toFixed(2)}\\,x^2` },
          { text: `Q = ${c}\\,y'^2 ${rem >= 0 ? '+' : '-'} ${Math.abs(rem).toFixed(2)}\\,x'^2` },
        ],
      }
    }
    if (Math.abs(b) > 1e-9) {
      return {
        steps: [
          { text: `a = c = 0,\\ b \\neq 0 \\text{, on pose } x = u+v,\\ y = u-v` },
          { text: `Q(x,y) = 2b\\,xy = 2b\\,(u+v)(u-v) = 2b\\,u^2 - 2b\\,v^2` },
        ],
      }
    }
    return { steps: [{ text: `a = b = c = 0 \\text{, la forme est nulle}` }] }
  }