import './styles/Offerings.css'

const OFFER_CARDS = [
    {
        title: 'Website Design & Build',
        sub: 'Intentional layouts and systemized styling for clarity.',
        points: ['Design systems', 'Responsive UX', 'Accessibility-first', 'Third-Party Platforms'],
        delay: 120
    },
    {
        title: 'JavaScript Application Engineering',
        sub: 'Modern component architecture without bloat.',
        points: ['State and data flows', 'Component libraries', 'Edge-ready builds', 'React Framework'],
        delay: 200
    },
    {
        title: 'Performance Optimization',
        sub: 'Faster loads, stronger Core Web Vitals, smoother UX.',
        points: ['Core Web Vitals', 'Bundle & asset audits', 'Caching & edge delivery', 'Monitoring & iteration'],
        delay: 280
    }
]

function Offerings() {
    return (
        <section className="section offerings" id="offerings" aria-labelledby="offerings-title" data-reveal>
            <div className="container" data-reveal data-reveal-delay="40">
                <h2 id="offerings-title" className="section-title" data-reveal data-reveal-delay="80">What I Do</h2>
                <div className="offer-cards solo" role="list">
                    {OFFER_CARDS.map(c => (
                        <div className="offer-card" role="listitem" key={c.title} data-reveal
                             data-reveal-delay={c.delay}>
                            <div className="badge" aria-hidden="true"/>
                            <h3 className="offer-card-title">{c.title}</h3>
                            <p className="offer-card-sub">{c.sub}</p>
                            <ul className="offer-card-points">
                                {c.points.map(p => <li key={p}>{p}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Offerings
