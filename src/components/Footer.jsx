import './styles/Footer.css'

function Footer({email, copied, copyEmail, onEmailClick}) {
    function handle(e) {
        if (onEmailClick) {
            e.preventDefault();
            onEmailClick(e)
        }
    }

    return (
        <footer className="footer" role="contentinfo">
            <div className="container footer-inner">
                <p>© {new Date().getFullYear()} TaylorURL • Created by Trenton Taylor</p>
                <nav className="foot-nav" aria-label="Footer">
                    <a href={'mailto:' + email} onClick={handle}>Email</a>
                    <button className="link-btn" onClick={copyEmail}>{copied ? 'Copied' : 'Copy Email'}</button>
                </nav>
            </div>
        </footer>
    )
}

export default Footer
