import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function TopicCard({ categoryId, topic }) {
    return (
        <Link
            to={`/visualizer/${categoryId}/${topic.id}`}
            className="group flex items-center justify-between rounded-lg border border-ink-700 bg-ink-900 px-4 py-3.5
        hover:border-amber-accent/60 hover:bg-ink-800 transition-colors"
        >
            <span className="text-sm text-[#e8ebf0]">{topic.label}</span>
            <ArrowUpRight size={16} className="text-ink-500 group-hover:text-amber-accent transition-colors shrink-0 ml-3" />
        </Link>
    )
}