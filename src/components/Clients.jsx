function Clients() {
    function logoError(e) {
        const s = e.target.closest('.client-brand')
        e.target.remove()
        if (s) {
            s.classList.add('missing')
            s.textContent = 'Logo'
        }
    }
    const clients = [
        {logo: '/clients-logos/SRM-Logo.png', alt: 'Smyrna Ready Mix', label: 'Smyrna Ready Mix'},
        {logo: '/clients-logos/DBF-Logo.png', alt: 'Dickinson Bayou Fleeting', label: 'Dickinson Bayou Fleeting'},
        {logo: '/clients-logos/CT-Logo.png', alt: "Charlie T's", label: "Charlie T's"},
        {logo: '/clients-logos/Mineplex-Logo.png', alt: 'Mineplex', label: 'Mineplex'},
        {logo: '/clients-logos/Hypixel-Logo.png', alt: 'Hypixel', label: 'Hypixel'}
    ]
    const rowClass = 'client-row count-' + clients.length
    return (
        <section className="section clients" id="clients" aria-labelledby="clients-title">
            <div className="clients-layout container">
                <div className="clients-head">
                    <h2 id="clients-title" className="section-title">Who I've Worked With</h2>
                </div>
                <div className={rowClass} role="list">
                    {clients.map(c => (
                        <div className="client-card" role="listitem" key={c.label}>
                            <div className="client-brand"><img src={c.logo} alt={c.alt} onError={logoError}/></div>
                            <div className="client-label">{c.label}</div>
                        </div>
                    ))}
                </div>
                <div className="clients-foot">Additional references available on request</div>
            </div>
        </section>
    )
}

export default Clients
