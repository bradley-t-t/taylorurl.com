import {useEffect, useLayoutEffect, useState} from 'react'
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
import ParticleBackground from '../components/ParticleBackground.jsx'

function App() {
    const email = 'trenton@taylorurl.com'
    const [copied, setCopied] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const [contactOpen, setContactOpen] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.history.scrollRestoration = 'manual'
            requestAnimationFrame(() => window.scrollTo(0,0))
            const ps = () => window.scrollTo(0,0)
            window.addEventListener('pageshow', ps)
            return () => window.removeEventListener('pageshow', ps)
        }
    }, [])

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
            try { document.execCommand('copy'); setCopied(true) } catch { window.location.href = 'mailto:' + email }
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

    useLayoutEffect(() => {
        const hero = document.querySelector('header.hero, .hero')
        const offerings = document.getElementById('offerings')
        const vh = window.innerHeight
        const offeringsRect = offerings ? offerings.getBoundingClientRect() : null
        const offeringsVisible = offeringsRect ? (offeringsRect.top < vh && offeringsRect.bottom > 0) : false
        function gatherNodes(root){ if(!root) return []; const arr=[]; if(root.matches && root.matches('[data-reveal]')) arr.push(root); root.querySelectorAll && root.querySelectorAll('[data-reveal]').forEach(n=>arr.push(n)); return arr }
        const initialGroups = [hero, offeringsVisible ? offerings : null].filter(Boolean)
        initialGroups.forEach(g => { const nodes = gatherNodes(g); nodes.forEach(n => { if(!n.classList.contains('in') && !n.classList.contains('reveal-done')) n.classList.add('reveal-prep') }) })
        if(!offeringsVisible && offerings){ const offerNodes = gatherNodes(offerings); offerNodes.forEach(n=>{ if(!n.classList.contains('reveal-prep') && !n.classList.contains('in') && !n.classList.contains('reveal-done')) n.classList.add('reveal-prep') }) }
    }, [])

    useEffect(() => {
        const hero = document.querySelector('header.hero, .hero')
        const offerings = document.getElementById('offerings')
        const vh = window.innerHeight
        const offeringsRect = offerings ? offerings.getBoundingClientRect() : null
        const offeringsVisible = offeringsRect ? (offeringsRect.top < vh && offeringsRect.bottom > 0) : false
        const baseActivation = ['#process', '#clients']
        const activationOrder = offeringsVisible ? baseActivation : ['#offerings', ...baseActivation]
        const activated = new Set()
        let nextIndex = 0
        const baseMinDelay = 16
        function gatherNodes(root){ if(!root) return []; const arr = []; if(root.matches && root.matches('[data-reveal]')) arr.push(root); root.querySelectorAll && root.querySelectorAll('[data-reveal]').forEach(n=>arr.push(n)); return arr }
        function prep(nodes){ nodes.forEach(n=>{ if(!n.classList.contains('reveal-done') && !n.classList.contains('in') && !n.classList.contains('reveal-prep')) n.classList.add('reveal-prep') }) }
        function animateNodes(nodes) { document.body.offsetWidth; nodes.forEach(n => { if (n.classList.contains('reveal-done') || n.classList.contains('in')) return; const d = parseInt(n.getAttribute('data-reveal-delay')||'0',10) + baseMinDelay; const run = () => { n.classList.add('in'); const end = () => { n.classList.remove('reveal-prep'); n.classList.add('reveal-done'); n.removeEventListener('transitionend', end) }; n.addEventListener('transitionend', end, {once:true}) }; setTimeout(run, d) }) }
        function activateSection(sel) { if (!sel || activated.has(sel)) return; const root = document.querySelector(sel); if (!root) return; activated.add(sel); const kids = gatherNodes(root).filter(k => !k.classList.contains('reveal-done')); if (!kids.length) return; prep(kids); requestAnimationFrame(()=>requestAnimationFrame(()=>{ const vh2 = window.innerHeight; const inView = []; kids.forEach(k => { if (k.classList.contains('reveal-done')) return; const rect = k.getBoundingClientRect(); if (rect.top < vh2 && rect.bottom > 0) { inView.push(k) } else { observe(k) } }); if (inView.length) animateNodes(inView) })) }
        const revealObserver = new IntersectionObserver(entries => { entries.forEach(en => { if (en.isIntersecting) { const el = en.target; revealObserver.unobserve(el); if (el.classList.contains('reveal-done')) return; animateNodes([el]) } }) }, {threshold:0.15, rootMargin:'0px 0px -6% 0px'})
        function observe(el){ if (!el.classList.contains('reveal-done')) revealObserver.observe(el) }
        if(offeringsVisible){ requestAnimationFrame(()=>requestAnimationFrame(()=>{ animateNodes(gatherNodes(offerings)) })) }
        requestAnimationFrame(()=>requestAnimationFrame(()=>{ animateNodes(gatherNodes(hero)) }))
        function runChain() {
            if (nextIndex >= activationOrder.length) return
            const prev = nextIndex===0 ? (offeringsVisible ? offerings : hero) : document.querySelector(activationOrder[nextIndex-1])
            if (!prev) return
            const rect = prev.getBoundingClientRect()
            if (rect.top <= window.innerHeight * 0.4) { activateSection(activationOrder[nextIndex]); nextIndex++; runChain() }
        }
        const onScroll = () => runChain()
        window.addEventListener('scroll', onScroll, {passive:true})
        window.addEventListener('resize', onScroll)
        runChain()
        return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); revealObserver.disconnect() }
    }, [])

    return (
        <div className="page" id="top">
            <ParticleBackground/>
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
