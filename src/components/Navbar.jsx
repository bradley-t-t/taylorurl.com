import './styles/Navbar.css'

function Navbar({email, activeSection = '', onEmailClick}) {
    const links = [
        {id: 'offerings', label: 'What I Do'},
        {id: 'process', label: 'How it Works'},
        {id: 'clients', label: "Who I've Worked With"}
    ]

    function click(e) {
        if (onEmailClick) {
            e.preventDefault();
            onEmailClick(e)
        }
    }

    return (
        <nav className="site-nav" aria-label="Primary">
            <div className="nav-inner container">
                <a href="#top" className="nav-brand" aria-label="TaylorURL Home">
                    <img src="/images/TaylorURL-Logo.png" alt="TaylorURL" className="nav-logo"/>
                </a>
                <div className="nav-links" role="list">
                    {links.map(l => (
                        <a key={l.id} href={'#' + l.id}
                           className={"nav-link" + (activeSection === l.id ? ' active' : '')}>{l.label}</a>
                    ))}
                    <a href={'mailto:' + email} className="nav-cta" onClick={click}>Email Me</a>
                </div>
                <a href={'mailto:' + email} className="nav-cta nav-mobile-cta" onClick={click}>Email Me</a>
            </div>
        </nav>
    )
}

export default Navbar
