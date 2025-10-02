import './styles/Process.css'

function Process() {
    const steps = [
        {
            title: 'Reach Out',
            summary: 'Contact me to start your project',
            detail: 'Send a quick email describing your idea, pain points, or goals. A few sentences is fine.'
        },
        {
            title: 'Discovery Meeting',
            summary: 'Phone or in-person meeting',
            detail: 'We clarify your audience, required features, and what success looks like.'
        },
        {
            title: 'Goals & Timeline',
            summary: 'Expectations and roadmap',
            detail: 'You get a clear outline: scope, milestones, estimated launch window, and responsibilities.'
        },
        {
            title: 'Onboarding & Payment',
            summary: 'Secure the project slot',
            detail: 'We finalize scope, handle payment, and set up any shared assets or accounts.'
        },
        {
            title: 'Build Phase',
            summary: 'Design & development',
            detail: 'Foundations first (structure, performance, accessibility), then polish and integrations.'
        },
        {
            title: 'Draft Review',
            summary: 'Interactive rough draft',
            detail: 'You explore a working version. We gather feedback and schedule quick iteration.'
        },
        {
            title: 'Launch',
            summary: 'Deploy & verify',
            detail: 'Domains, DNS, performance passes, analytics, and final QA before public launch.'
        },
        {
            title: 'Lifetime Support',
            summary: 'Always available afterward',
            detail: 'Updates, tweaks, improvements, and new ideas anytime—relationship, not a handoff.'
        }
    ]
    return (
        <section className="section process" id="process" aria-labelledby="process-title" data-reveal>
            <div className="container process-layout" data-reveal data-reveal-delay="40">
                <div className="process-head" data-reveal data-reveal-delay="80">
                    <h2 id="process-title" className="section-title">How It Works</h2>
                    <p className="process-intro">A transparent, collaborative path from first hello to long-term
                        support.</p>
                </div>
                <ol className="process-flow" aria-label="Project process">
                    {steps.map((s, i) => (
                        <li key={s.title} className="process-item" data-reveal data-reveal-delay={120 + i * 70}>
                            <div className="step-shell" tabIndex={0}>
                                <div className="step-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</div>
                                <h3 className="step-title">{s.title}</h3>
                                <p className="step-summary">{s.summary}</p>
                                <p className="step-detail">{s.detail}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    )
}

export default Process
