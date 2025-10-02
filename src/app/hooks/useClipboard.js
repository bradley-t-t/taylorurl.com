import {useCallback, useEffect, useState} from 'react'

function ensureLiveRegion() {
    let r = document.getElementById('live-region');
    if (!r) {
        r = document.createElement('div');
        r.id = 'live-region';
        r.setAttribute('aria-live', 'polite');
        r.className = 'sr-only';
        document.body.appendChild(r)
    }
    return r
}

export default function useClipboard(text) {
    const [copied, setCopied] = useState(false);
    const copy = useCallback(e => {
        if (e) e.preventDefault();
        const region = ensureLiveRegion();
        const fallback = () => {
            const el = document.createElement('textarea');
            el.value = text;
            el.style.position = 'fixed';
            document.body.appendChild(el);
            el.focus();
            el.select();
            let ok = false;
            try {
                ok = document.execCommand('copy')
            } catch {
            }
            document.body.removeChild(el);
            if (ok) {
                setCopied(true);
                region.textContent = 'Copied'
            } else window.location.href = 'mailto:' + text
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                setCopied(true);
                region.textContent = 'Copied'
            }).catch(fallback)
        } else fallback()
    }, [text]);
    useEffect(() => {
        if (copied) {
            const t = setTimeout(() => setCopied(false), 2200);
            return () => clearTimeout(t)
        }
    }, [copied]);
    return {copied, copy}
}

