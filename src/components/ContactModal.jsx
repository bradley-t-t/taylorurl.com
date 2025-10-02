import {useEffect, useRef, useState} from 'react'
import './styles/ContactModal.css'

function ContactModal({onClose, onSubmit, email}) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const dialogRef = useRef(null)
    const firstFieldRef = useRef(null)
    const mountRef = useRef(Date.now())
    useEffect(() => {
        if (firstFieldRef.current) firstFieldRef.current.focus()
    }, [])
    useEffect(() => {
        function trap(e) {
            if (!dialogRef.current) return;
            if (e.key === 'Tab') {
                const f = dialogRef.current.querySelectorAll('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
                const list = Array.from(f).filter(el => !el.disabled && el.offsetParent !== null);
                if (!list.length) return;
                const first = list[0];
                const last = list[list.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }

        document.addEventListener('keydown', trap);
        return () => document.removeEventListener('keydown', trap)
    }, [])

    function close(e) {
        if (e) e.preventDefault();
        if (submitting) return;
        onClose && onClose()
    }

    function submit(e) {
        e.preventDefault();
        if (submitting) return;
        if (!firstName.trim() || !lastName.trim() || !message.trim()) return;
        setSubmitting(true);
        onSubmit({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            phone: phone.trim(),
            message: message.trim(),
            email
        });
        setTimeout(() => setSubmitting(false), 800)
    }

    function overlayClick(e) {
        if (e.target !== e.currentTarget) return;
        if (Date.now() - mountRef.current < 120) return;
        close()
    }

    const disabled = !firstName.trim() || !lastName.trim() || !message.trim() || submitting
    return (
        <div className="contact-overlay" role="presentation" onClick={overlayClick}>
            <div className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-title"
                 ref={dialogRef}>
                <button className="contact-close" aria-label="Close" onClick={close}>✕</button>
                <h2 id="contact-title" className="contact-title">Start Your Project</h2>
                <p className="contact-intro">Enter a few details and your email client will open with everything
                    prefilled.</p>
                <form className="contact-form" onSubmit={submit} noValidate>
                    <div className="field-row">
                        <div className="field">
                            <label htmlFor="firstName" className="field-label">First Name</label>
                            <input id="firstName" ref={firstFieldRef} className="field-input" value={firstName}
                                   onChange={e => setFirstName(e.target.value)} required autoComplete="given-name"/>
                        </div>
                        <div className="field">
                            <label htmlFor="lastName" className="field-label">Last Name</label>
                            <input id="lastName" className="field-input" value={lastName}
                                   onChange={e => setLastName(e.target.value)} required autoComplete="family-name"/>
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="phone" className="field-label">Phone (optional)</label>
                        <input id="phone" className="field-input" value={phone} onChange={e => setPhone(e.target.value)}
                               autoComplete="tel"/>
                    </div>
                    <div className="field">
                        <label htmlFor="message" className="field-label">Your Message</label>
                        <textarea id="message" className="field-input area" rows={5} value={message}
                                  onChange={e => setMessage(e.target.value)} required/>
                    </div>
                    <div className="actions">
                        <button type="button" className="cta outline" onClick={close}>Cancel</button>
                        <button type="submit" className="cta primary"
                                disabled={disabled}>{submitting ? 'Preparing...' : 'Open Email'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ContactModal
