function Navbar({email, activeSection = ''}) {
    return (
        <nav className="site-nav" aria-label="Primary">
            <div className="nav-inner container">
                <a href="#top" className="nav-brand" aria-label="TaylorURL Home">
                    <img src="/images/TaylorURL-Logo.png" alt="TaylorURL" className="nav-logo"/>
                </a>
                <div className="nav-links" role="list">
                    <a href="#offerings" className={"nav-link" + (activeSection === 'offerings' ? ' active' : '')}>What I Do</a>
                    <a href="#clients" className={"nav-link" + (activeSection === 'clients' ? ' active' : '')}>Who I've Worked With</a>
                    <a href={'mailto:' + email} className="nav-cta">Email Me</a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
