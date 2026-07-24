import { useParams, Link } from 'react-router-dom'
import { findTopic } from '../data/topics'
import { topicComponents } from '../topics/registry'

const TABS = ['Visualisation', 'Explication', 'Code']

export default function TopicPage() {
    const { topicId } = useParams()
    const found = findTopic(topicId)

    if (!found) {
        return (
            <div className="max-w-2xl">
                <p className="text-ink-500">Sujet introuvable.</p>
                <Link to="/" className="text-amber-accent text-sm hover:underline">
                    ← Retour à l'accueil
                </Link>
            </div>
        )
    }

    const { category, topic } = found

    return (
        <div className="max-w-5xl mx-auto">
            <nav className="text-xs text-ink-500 mb-4 font-mono">
                <Link to="/" className="hover:text-white">Accueil</Link>
                <span className="mx-1.5">/</span>
                <span>{category.label}</span>
                <span className="mx-1.5">/</span>
                <span className="text-[#e8ebf0]">{topic.label}</span>
            </nav>

            <h1 className="font-display text-3xl mb-6">{topic.label}</h1>

            <div className="flex gap-1 border-b border-ink-700 mb-6">
                {TABS.map((tab, i) => (
                    <span
                        key={tab}
                        className={`px-3 py-2 text-sm border-b-2 -mb-px ${i === 0 ? 'border-amber-accent text-white' : 'border-transparent text-ink-500'
                            }`}
                    >
                        {tab}
                    </span>
                ))}
            </div>

            {topicComponents[topic.id] ? (
                (() => {
                    const Component = topicComponents[topic.id]
                    return <Component />
                })()
            ) : (
                <div className="grid-backdrop rounded-lg border border-ink-700 bg-ink-900 flex flex-col items-center justify-center gap-2 py-24 text-center">
                    <p className="text-ink-500 text-sm">Ce module sera construit dans une prochaine session.</p>
                    <p className="font-mono text-xs text-ink-600">{category.id}/{topic.id}</p>
                </div>
            )}
        </div>
    )
}