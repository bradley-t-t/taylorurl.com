import {useEffect, useState} from 'react'
import Navbar from '@components/Navbar.jsx'
import Hero from '@components/Hero.jsx'
import Offerings from '@components/Offerings.jsx'
import Process from '@components/Process.jsx'
import Clients from '@components/Clients.jsx'
import Footer from '@components/Footer.jsx'
import ContactModal from '@components/ContactModal.jsx'
import ParticleBackground from '@components/ParticleBackground.jsx'
import useReveal from '@hooks/useReveal.js'
import useClipboard from '@hooks/useClipboard.js'
import useActiveSection from '@hooks/useActiveSection.js'

function HomeView() {
    const email = 'trenton@taylorurl.com'
    const {copied, copy} = useClipboard(email)
    const activeSection = useActiveSection()
    const [contactOpen, setContactOpen] = useState(false)
    useReveal()
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.history.scrollRestoration = 'manual';
            requestAnimationFrame(() => window.scrollTo(0, 0));
            const ps = () => window.scrollTo(0, 0);
            window.addEventListener('pageshow', ps);
            return () => window.removeEventListener('pageshow', ps)
        }
    }, [])

    function openContact(e) {
        if (e) e.preventDefault();
        setContactOpen(true)
    }

    function closeContact() {
        setContactOpen(false)
    }

    function submitContact(data) {
        const {firstName, lastName, phone, message} = data;
        const subject = encodeURIComponent('Website Design Inquiry - ' + [firstName, lastName].filter(Boolean).join(' '));
        const bodyLines = [message || '', '', 'Phone: ' + (phone || 'N/A'), 'Name: ' + [firstName, lastName].filter(Boolean).join(' ')].join('\n');
        const body = encodeURIComponent(bodyLines);
        window.location.href = 'mailto:' + email + '?subject=' + subject + '&body=' + body;
        setContactOpen(false)
    }

    useEffect(() => {
        function esc(e) {
            if (e.key === 'Escape') closeContact()
        }

        if (contactOpen) document.addEventListener('keydown', esc);
        return () => document.removeEventListener('keydown', esc)
    }, [contactOpen])
    useEffect(() => {
        const page = document.querySelector('.page');
        if (!page) return;
        if (contactOpen) {
            const els = page.querySelectorAll('a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])');
            els.forEach(el => {
                if (!el.closest('.contact-modal')) el.setAttribute('tabindex', '-1')
            })
        } else {
            const disabled = page.querySelectorAll('[tabindex="-1"]');
            disabled.forEach(el => {
                if (!el.closest('.contact-modal')) el.removeAttribute('tabindex')
            })
        }
    }, [contactOpen])
    return <div className="page" id="top"><ParticleBackground/><Navbar email={email} activeSection={activeSection}
                                                                       onEmailClick={openContact}/><Hero email={email}
                                                                                                         copied={copied}
                                                                                                         copyEmail={copy}
                                                                                                         openContact={openContact}/>
        <main><Offerings/><Process/><Clients/></main>
        <Footer email={email} copied={copied} copyEmail={copy} onEmailClick={openContact}/>{contactOpen &&
            <ContactModal onClose={closeContact} onSubmit={submitContact} email={email}/>}</div>
}

export default HomeView
