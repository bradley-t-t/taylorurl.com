function Footer({email, copied, copyEmail}) {
    return (
        <footer className="footer" role="contentinfo">
            <div className="container footer-inner">
                <p>© {new Date().getFullYear()} TaylorURL • Created by Trenton Taylor</p>
                <nav className="foot-nav" aria-label="Footer">
                    <a href={'mailto:' + email}>Email</a>
                    <button className="link-btn" onClick={copyEmail}>{copied ? 'Copied' : 'Copy Email'}</button>
                </nav>
            </div>
        </footer>
    )
}

export default Footer
