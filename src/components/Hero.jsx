import './styles/Hero.css'

function Hero({email, copied, copyEmail, openContact}) {
    function open(e) {
        if (openContact) {
            e.preventDefault();
            openContact(e)
        }
    }

    return (
        <header className="hero" role="banner" data-reveal data-reveal-from="left">
            <div className="container hero-inner" data-reveal data-reveal-delay="60">
                <div className="hero-text">
                    <h1 className="hero-title" data-reveal data-reveal-delay="120">Websites and Apps Built For
                        Your <span className="accent">Business</span>
                    </h1>
                    <p className="lead" data-reveal data-reveal-delay="180">I build fast, maintainable, accessible
                        websites and JavaScript applications.
                        Focused on clarity, performance, and long-term reliability so you can focus on running your
                        business.</p>
                    <div className="cta-row" data-reveal data-reveal-delay="260">
                        <a href={'mailto:' + email} onClick={open} className="cta primary large">Email Me</a>
                        <button onClick={copyEmail}
                                className={"cta outline large" + (copied ? ' copied' : '')}>{copied ? 'Copied' : 'Copy Email'}</button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Hero
