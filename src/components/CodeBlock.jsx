export default function CodeBlock({ code }) {
    return (
        <pre className="rounded-lg border border-ink-700 bg-ink-900 p-4 overflow-x-auto text-xs font-mono text-text-primary leading-relaxed">
            <code>{code}</code>
        </pre>
    )
}