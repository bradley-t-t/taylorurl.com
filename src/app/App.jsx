import {useEffect, useState} from 'react'
import {createRoot} from 'react-dom/client'
import './styles/Theme.css'
import './styles/index.css'
import './styles/App.css'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Offerings from '../components/Offerings.jsx'
import Process from '../components/Process.jsx'
import Clients from '../components/Clients.jsx'
import Footer from '../components/Footer.jsx'
import ContactModal from '../components/ContactModal.jsx'

function App() {
    const email = 'trenton@taylorurl.com'
    const [copied, setCopied] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const [contactOpen, setContactOpen] = useState(false)

    function openContact(e) { if (e) e.preventDefault(); setContactOpen(true) }
    function closeContact() { setContactOpen(false) }

    function submitContact(data) {
        const {firstName, lastName, phone, message} = data
        const subject = encodeURIComponent('Website Design Inquiry - ' + [firstName, lastName].filter(Boolean).join(' '))
        const bodyLines = [message || '', '', 'Phone: ' + (phone || 'N/A'), 'Name: ' + [firstName, lastName].filter(Boolean).join(' ')].join('\n')
        const body = encodeURIComponent(bodyLines)
        const mailto = 'mailto:' + email + '?subject=' + subject + '&body=' + body
        window.location.href = mailto
        setContactOpen(false)
    }

    function copyEmail(e) {
        e.preventDefault()
        function f() {
            const el = document.createElement('textarea')
            el.value = email
            el.style.position = 'fixed'
            document.body.appendChild(el)
            el.focus()
            el.select()
            try { document.execCommand('copy'); setCopied(true) } catch (_) { window.location.href = 'mailto:' + email }
            document.body.removeChild(el)
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(email).then(() => setCopied(true)).catch(f)
        } else {
            f()
        }
    }

    useEffect(() => { if (copied) { const t = setTimeout(() => setCopied(false), 2200); return () => clearTimeout(t) } }, [copied])

    useEffect(() => {
        const sections = Array.from(document.querySelectorAll('section[id]'))
        if (!sections.length) return
        const observer = new IntersectionObserver(entries => { entries.forEach(en => { if (en.isIntersecting) setActiveSection(en.target.id) }) }, {rootMargin: '-55% 0px -40% 0px', threshold: [0,.25,.5,.75,1]})
        sections.forEach(s => observer.observe(s))
        return () => observer.disconnect()
    }, [])

    useEffect(() => { function esc(e){ if(e.key==='Escape') closeContact() } if(contactOpen){ document.addEventListener('keydown', esc) } return () => document.removeEventListener('keydown', esc) }, [contactOpen])

    return (
        <div className="page" id="top">
            <Navbar email={email} activeSection={activeSection} onEmailClick={openContact}/>
            <Hero email={email} copied={copied} copyEmail={copyEmail} openContact={openContact}/>
            <main>
                <Offerings/>
                <Process/>
                <Clients/>
            </main>
            <Footer email={email} copied={copied} copyEmail={copyEmail} onEmailClick={openContact}/>
            {contactOpen && <ContactModal onClose={closeContact} onSubmit={submitContact} email={email}/>}
        </div>
    )
}

const rootEl = document.getElementById('root')
if (rootEl) { if (!rootEl.__root) rootEl.__root = createRoot(rootEl); rootEl.__root.render(<App/>) }

export default App
