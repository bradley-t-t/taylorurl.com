function Hero({email, copied, copyEmail}) {
    return (
        <section className="hero" aria-labelledby="hero-title">
            <div className="container">
                <div className="hero-stack">
                    <p className="eyebrow">Web Design • JS Engineering • Performance</p>
                    <h1 id="hero-title" className="hero-title">Systems‑first <span
                        className="accent">web design</span> and JavaScript engineering for growth</h1>
                    <p className="lead">I plan, design, and build lean, resilient applications: clear interfaces, durable
                        component architecture with a focus on being useful.</p>
                    <div className="cta-row">
                        <a href={'mailto:' + email} className="cta primary large">Start a Conversation</a>
                        <button type="button" className={"cta outline large" + (copied ? " copied" : "")}
                                onClick={copyEmail} aria-live="polite">{copied ? "Email Copied" : "Copy Email"}</button>
                    </div>
                    <p className="lead small">Available for web design, design improvements
                        and support.</p>
                    <p className="micro">Based in Texas • Fast response • Focused on outcomes</p>
                </div>
            </div>
        </section>
    )
}

export default Hero
