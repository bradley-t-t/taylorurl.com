import {useEffect, useState} from 'react'

export default function useActiveSection() {
    const [active, setActive] = useState('');
    useEffect(() => {
        const sections = Array.from(document.querySelectorAll('section[id]'));
        if (!sections.length) return;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(en => {
                if (en.isIntersecting) setActive(en.target.id)
            })
        }, {rootMargin: '-55% 0px -40% 0px', threshold: [0, .25, .5, .75, 1]});
        sections.forEach(s => observer.observe(s));
        return () => observer.disconnect()
    }, []);
    return active
}

