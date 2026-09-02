import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../context/useLanguage'

export default function TopicCard({ categoryId, topic }) {
    const { lang } = useLanguage()
    return (
        <Link
            to={`/visualizer/${categoryId}/${topic.id}`}
            className="group flex items-center justify-between rounded-lg border border-ink-700 bg-ink-900 px-4 py-3.5
        hover:border-amber-accent/60 hover:bg-ink-800 transition-colors"
        >
            <span className="text-sm text-text-primary">{lang === 'en' ? topic.labelEn : topic.label}</span>
            <ArrowUpRight size={16} className="text-ink-500 group-hover:text-amber-accent transition-colors shrink-0 ml-3" />
        </Link>
    )
}