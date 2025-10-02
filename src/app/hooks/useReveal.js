import {useEffect, useLayoutEffect} from 'react'

function gather(root) {
    if (!root) return [];
    const arr = [];
    if (root.matches && root.matches('[data-reveal]')) arr.push(root);
    if (root.querySelectorAll) root.querySelectorAll('[data-reveal]').forEach(n => arr.push(n));
    return arr
}

export default function useReveal() {
    useLayoutEffect(() => {
        const hero = document.querySelector('header.hero, .hero');
        const offerings = document.getElementById('offerings');
        const vh = window.innerHeight;
        const oRect = offerings ? offerings.getBoundingClientRect() : null;
        const oVisible = oRect ? (oRect.top < vh && oRect.bottom > 0) : false;
        const initial = [hero, oVisible ? offerings : null].filter(Boolean);
        initial.forEach(g => {
            const nodes = gather(g);
            nodes.forEach(n => {
                if (!n.classList.contains('in') && !n.classList.contains('reveal-done')) n.classList.add('reveal-prep')
            })
        });
        if (!oVisible && offerings) {
            gather(offerings).forEach(n => {
                if (!n.classList.contains('reveal-prep') && !n.classList.contains('in') && !n.classList.contains('reveal-done')) n.classList.add('reveal-prep')
            })
        }
    }, []);
    useEffect(() => {
        const hero = document.querySelector('header.hero, .hero');
        const offerings = document.getElementById('offerings');
        const vh = window.innerHeight;
        const oRect = offerings ? offerings.getBoundingClientRect() : null;
        const oVisible = oRect ? (oRect.top < vh && oRect.bottom > 0) : false;
        const baseActivation = ['#process', '#clients'];
        const order = oVisible ? baseActivation : ['#offerings', ...baseActivation];
        const activated = new Set;
        let nextIndex = 0;
        const baseMinDelay = 16;

        function prep(nodes) {
            nodes.forEach(n => {
                if (!n.classList.contains('reveal-done') && !n.classList.contains('in') && !n.classList.contains('reveal-prep')) n.classList.add('reveal-prep')
            })
        }

        function animate(nodes) {
            document.body.offsetWidth;
            nodes.forEach(n => {
                if (n.classList.contains('reveal-done') || n.classList.contains('in')) return;
                const d = parseInt(n.getAttribute('data-reveal-delay') || '0', 10) + baseMinDelay;
                const run = () => {
                    n.classList.add('in');
                    const end = () => {
                        n.classList.remove('reveal-prep');
                        n.classList.add('reveal-done');
                        n.removeEventListener('transitionend', end)
                    };
                    n.addEventListener('transitionend', end, {once: true})
                };
                setTimeout(run, d)
            })
        }

        function activate(sel) {
            if (!sel || activated.has(sel)) return;
            const root = document.querySelector(sel);
            if (!root) return;
            activated.add(sel);
            const kids = gather(root).filter(k => !k.classList.contains('reveal-done'));
            if (!kids.length) return;
            prep(kids);
            requestAnimationFrame(() => requestAnimationFrame(() => {
                const vh2 = window.innerHeight;
                const inView = [];
                kids.forEach(k => {
                    if (k.classList.contains('reveal-done')) return;
                    const rect = k.getBoundingClientRect();
                    if (rect.top < vh2 && rect.bottom > 0) inView.push(k); else observe(k)
                });
                if (inView.length) animate(inView)
            }))
        }

        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(en => {
                if (en.isIntersecting) {
                    const el = en.target;
                    revealObserver.unobserve(el);
                    if (el.classList.contains('reveal-done')) return;
                    animate([el])
                }
            })
        }, {threshold: 0.15, rootMargin: '0px 0px -6% 0px'});

        function observe(el) {
            if (!el.classList.contains('reveal-done')) revealObserver.observe(el)
        }

        if (oVisible) {
            requestAnimationFrame(() => requestAnimationFrame(() => {
                animate(gather(offerings))
            }))
        }
        requestAnimationFrame(() => requestAnimationFrame(() => {
            animate(gather(hero))
        }));

        function chain() {
            if (nextIndex >= order.length) return;
            const prev = nextIndex === 0 ? (oVisible ? offerings : hero) : document.querySelector(order[nextIndex - 1]);
            if (!prev) return;
            const rect = prev.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.4) {
                activate(order[nextIndex]);
                nextIndex++;
                chain()
            }
        }

        const onScroll = () => chain();
        window.addEventListener('scroll', onScroll, {passive: true});
        window.addEventListener('resize', onScroll);
        chain();
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            revealObserver.disconnect()
        }
    }, [])
}
