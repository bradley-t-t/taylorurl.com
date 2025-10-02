import './styles/Navbar.css'

function Navbar({email, activeSection = '', onEmailClick}) {
    function click(e){ if(onEmailClick){ e.preventDefault(); onEmailClick(e) } }
    return (
        <nav className="site-nav" aria-label="Primary">
            <div className="nav-inner container">
                <a href="#top" className="nav-brand" aria-label="TaylorURL Home">
                    <img src="/images/TaylorURL-Logo.png" alt="TaylorURL" className="nav-logo"/>
                </a>
                <div className="nav-links" role="list">
                    <a href="#offerings" className={"nav-link" + (activeSection === 'offerings' ? ' active' : '')}>What
                        I Do</a>
                    <a href="#process" className={"nav-link" + (activeSection === 'process' ? ' active' : '')}>How it
                        Works</a>
                    <a href="#clients" className={"nav-link" + (activeSection === 'clients' ? ' active' : '')}>Who I've
                        Worked With</a>
                    <a href={'mailto:' + email} className="nav-cta" onClick={click}>Email Me</a>
                </div>
                <a href={'mailto:' + email} className="nav-cta nav-mobile-cta" onClick={click}>Email Me</a>
            </div>
        </nav>
    )
}

export default Navbar
