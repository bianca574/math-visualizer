import katex from 'katex'
import { useMemo } from 'react'

export function BlockMath({ math }) {
    const html = useMemo(
        () => katex.renderToString(math, { displayMode: true, throwOnError: false }),
        [math],
    )
    return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export function InlineMath({ math }) {
    const html = useMemo(
        () => katex.renderToString(math, { displayMode: false, throwOnError: false }),
        [math],
    )
    return <span dangerouslySetInnerHTML={{ __html: html }} />
}