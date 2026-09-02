import { categories } from '../data/topics'
import TopicCard from '../components/TopicCard'
import HeroVector from '../components/HeroVector'
import { useLanguage } from '../context/useLanguage'
import { ui } from '../lib/ui'

export default function Home() {
    const { lang } = useLanguage()
    const t = ui[lang]

    return (
        <div className="max-w-5xl mx-auto">
            <section className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16 py-6 md:py-10">
                <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-amber-accent mb-3">{t.heroKicker}</p>
                    <h1 className="font-display text-4xl md:text-5xl leading-tight mb-4">
                        {t.heroTitleA}
                        <span className="italic text-amber-accent">{t.heroTitleEm}</span>.
                    </h1>
                    <p className="text-ink-500 max-w-md leading-relaxed">{t.heroSubtitle}</p>
                </div>
                <HeroVector />
            </section>

            <div className="space-y-10 pb-16">
                {categories.map((category) => (
                    <section key={category.id}>
                        <h2 className="font-display text-xl mb-3">{lang === 'en' ? category.labelEn : category.label}</h2>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {category.topics.map((topic) => (
                                <TopicCard key={topic.id} categoryId={category.id} topic={topic} />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    )
}