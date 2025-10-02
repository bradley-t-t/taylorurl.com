import './styles/Offerings.css'

function Offerings() {
    return (
        <section className="section offerings" id="offerings" aria-labelledby="offerings-title" data-reveal>
            <div className="container" data-reveal data-reveal-delay="40">
                <h2 id="offerings-title" className="section-title" data-reveal data-reveal-delay="80">What I Do</h2>
                <div className="offer-cards solo" role="list">
                    <div className="offer-card" role="listitem" data-reveal data-reveal-delay="120">
                        <div className="badge" aria-hidden="true"/>
                        <h3 className="offer-card-title">Website Design & Build</h3>
                        <p className="offer-card-sub">Intentional layouts and systemized styling for clarity.</p>
                        <ul className="offer-card-points">
                            <li>Design systems</li>
                            <li>Responsive UX</li>
                            <li>Accessibility-first</li>
                            <li>Third-Party Platforms</li>
                        </ul>
                    </div>
                    <div className="offer-card" role="listitem" data-reveal data-reveal-delay="200">
                        <div className="badge" aria-hidden="true"/>
                        <h3 className="offer-card-title">JavaScript Application Engineering</h3>
                        <p className="offer-card-sub">Modern component architecture without bloat.</p>
                        <ul className="offer-card-points">
                            <li>State and data flows</li>
                            <li>Component libraries</li>
                            <li>Edge-ready builds</li>
                            <li>React Framework</li>
                        </ul>
                    </div>
                    <div className="offer-card" role="listitem" data-reveal data-reveal-delay="280">
                        <div className="badge" aria-hidden="true"/>
                        <h3 className="offer-card-title">Performance Optimization</h3>
                        <p className="offer-card-sub">Faster loads, stronger Core Web Vitals, smoother UX.</p>
                        <ul className="offer-card-points">
                            <li>Core Web Vitals</li>
                            <li>Bundle & asset audits</li>
                            <li>Caching & edge delivery</li>
                            <li>Monitoring & iteration</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Offerings
