export default function ExplanationText({ text }) {
    const paragraphs = text.trim().split(/\n\s*\n/)
    return (
        <div className="space-y-3 max-w-2xl text-sm text-ink-500 leading-relaxed">
            {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
            ))}
        </div>
    )
}