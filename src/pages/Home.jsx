import { categories } from '../data/topics'
import TopicCard from '../components/TopicCard'
import HeroVector from '../components/HeroVector'

export default function Home() {
    return (
        <div className="max-w-5xl mx-auto">
            <section className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16 py-6 md:py-10">
                <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-amber-accent mb-3">
                        L1 - L3 — Licence Math / Double licence Math-Info
                    </p>
                    <h1 className="font-display text-4xl md:text-5xl leading-tight mb-4">
                        Voir les maths <span className="italic text-amber-accent">bouger</span>.
                    </h1>
                    <p className="text-ink-500 max-w-md leading-relaxed">
                        Un compagnon interactif pour l'algèbre linéaire, les formes quadratiques,
                        les suites &amp; séries et les séries de Fourier — chaque notion a sa
                        propre visualisation manipulable.
                    </p>
                </div>
                <HeroVector />
            </section>

            <div className="space-y-10 pb-16">
                {categories.map((category) => (
                    <section key={category.id}>
                        <h2 className="font-display text-xl mb-3">{category.label}</h2>
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