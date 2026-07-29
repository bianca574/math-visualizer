import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { findTopic } from '../data/topics'
import { topicComponents } from '../topics/registry'
import { topicMeta } from '../topics/meta'
import CodeBlock from '../components/CodeBlock'
import ExplanationText from '../components/ExplanationText'
import { useLanguage } from '../context/LanguageContext'
import { ui } from '../lib/ui'

export default function TopicPage() {
    const { topicId } = useParams()
    const found = findTopic(topicId)
    const { lang } = useLanguage()
    const t = ui[lang]
    const [activeTab, setActiveTab] = useState(0)

    if (!found) {
        return (
            <div className="max-w-2xl">
                <p className="text-ink-500">{t.notFound}</p>
                <Link to="/" className="text-amber-accent text-sm hover:underline">
                    {t.backHome}
                </Link>
            </div>
        )
    }

    const { category, topic } = found
    const Visualizer = topicComponents[topic.id]
    const meta = topicMeta[topic.id]

    const placeholder = (
        <div className="grid-backdrop rounded-lg border border-ink-700 bg-ink-900 flex flex-col items-center justify-center gap-2 py-24 text-center">
            <p className="text-ink-500 text-sm">{t.notBuiltYet}</p>
            <p className="font-mono text-xs text-ink-600">
                {category.id}/{topic.id}
            </p>
        </div>
    )

    return (
        <div className="max-w-5xl mx-auto">
            <nav className="text-xs text-ink-500 mb-4 font-mono">
                <Link to="/" className="hover:text-text-strong">
                    {t.home}
                </Link>
                <span className="mx-1.5">/</span>
                <span>{lang === 'en' ? category.labelEn : category.label}</span>
                <span className="mx-1.5">/</span>
                <span className="text-text-primary">{lang === 'en' ? topic.labelEn : topic.label}</span>
            </nav>

            <h1 className="font-display text-3xl mb-6">{lang === 'en' ? topic.labelEn : topic.label}</h1>

            <div className="flex gap-1 border-b border-ink-700 mb-6">
                {t.tabs.map((tabLabel, i) => (
                    <button
                        key={tabLabel}
                        onClick={() => setActiveTab(i)}
                        className={`px-3 py-2 text-sm border-b-2 -mb-px transition-colors ${activeTab === i ? 'border-amber-accent text-text-strong' : 'border-transparent text-ink-500 hover:text-text-primary'
                            }`}
                    >
                        {tabLabel}
                    </button>
                ))}
            </div>

            {activeTab === 0 && (Visualizer ? <Visualizer /> : placeholder)}
            {activeTab === 1 && (
                meta ? <ExplanationText text={meta.explanation[lang]} /> : <p className="text-ink-500 text-sm">{t.explanationMissing}</p>
            )}
            {activeTab === 2 && (meta ? <CodeBlock code={meta.source} /> : <p className="text-ink-500 text-sm">{t.codeMissing}</p>)}
        </div>
    )
}