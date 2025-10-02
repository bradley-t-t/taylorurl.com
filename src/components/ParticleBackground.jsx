import {useEffect, useMemo, useRef, useState} from 'react'
import {createPortal} from 'react-dom'

export default function ParticleBackground() {
    const [colors, setColors] = useState({accent: null, accentLight: null, accentHover: null, text: null})
    const [mounted, setMounted] = useState(false)
    const canvasRef = useRef(null)
    const rafRef = useRef(0)
    const dustRef = useRef([])
    const specksRef = useRef([])
    const paletteVersionRef = useRef(0)
    const tRef = useRef(0)
    const rectsRef = useRef([])
    const frameRef = useRef(0)
    const startedRef = useRef(false)
    const read = () => {
        const s = getComputedStyle(document.documentElement);
        return {
            accent: s.getPropertyValue('--color-accent').trim() || null,
            accentLight: s.getPropertyValue('--color-accent-light').trim() || null,
            accentHover: s.getPropertyValue('--color-accent-hover').trim() || null,
            text: s.getPropertyValue('--color-text').trim() || null
        }
    }
    useEffect(() => {
        setColors(read());
        const observer = new MutationObserver(() => setColors(read()));
        observer.observe(document.documentElement, {attributes: true, attributeFilter: ['class']});
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const mql = () => setColors(read());
        mq.addEventListener('change', mql);
        setMounted(true);
        return () => {
            observer.disconnect();
            mq.removeEventListener('change', mql)
        }
    }, [])
    const palette = useMemo(() => {
        const arr = [colors.accent, colors.accentLight, colors.accentHover, colors.text].filter(Boolean);
        return arr.length ? arr : null
    }, [colors])
    useEffect(() => {
        if (palette) paletteVersionRef.current++
    }, [palette])
    const scaleCanvas = (canvas) => {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        const ctx = canvas.getContext('2d');
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        return {w: window.innerWidth, h: window.innerHeight}
    }
    const updateRects = () => {
        if (!startedRef.current) return;
        const els = document.querySelectorAll('.site-nav, .container, footer, .contact-modal, .cta, button, nav, form');
        const arr = [];
        for (let i = 0; i < els.length; i++) {
            const r = els[i].getBoundingClientRect();
            if (r.width && r.height) arr.push({x: r.left - 4, y: r.top - 4, w: r.width + 8, h: r.height + 8})
        }
        rectsRef.current = arr
    }
    useEffect(() => {
        if (!mounted || !palette) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let w = 0, h = 0;
        const rand = (a, b) => Math.random() * (b - a) + a;
        const pick = () => palette[Math.floor(Math.random() * palette.length)];
        const init = () => {
            if (!startedRef.current) return;
            const baseArea = w * h;
            const dustTarget = Math.min(140, Math.floor(baseArea / 15000));
            const speckTarget = Math.min(50, Math.floor(baseArea / 52000));
            dustRef.current = Array.from({length: dustTarget}).map(() => ({
                x: Math.random() * w,
                y: Math.random() * h,
                r: rand(0.8, 1.9),
                c: pick(),
                pv: paletteVersionRef.current
            }));
            specksRef.current = Array.from({length: speckTarget}).map(() => ({
                x: Math.random() * w,
                y: Math.random() * h,
                r: rand(1.2, 3.0),
                c: pick(),
                pv: paletteVersionRef.current
            }))
        };
        const inside = (x, y) => {
            const rects = rectsRef.current;
            for (let i = 0; i < rects.length; i++) {
                const r = rects[i];
                if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) return true
            }
            return false
        };
        let lastT = 0;
        const step = (tn) => {
            if (!startedRef.current) return;
            if (!lastT) lastT = tn;
            const dt = Math.min(50, tn - lastT);
            lastT = tn;
            tRef.current += dt * 0.0005;
            ctx.clearRect(0, 0, w, h);
            const t = tRef.current;
            const pv = paletteVersionRef.current;
            if (++frameRef.current % 55 === 0) updateRects();
            const dust = dustRef.current;
            for (let i = 0; i < dust.length; i++) {
                const p = dust[i];
                if (p.pv !== pv) {
                    p.c = pick();
                    p.pv = pv
                }
                const fx = Math.cos(p.y * 0.004 + t) * 0.3 + Math.sin(p.x * 0.002 - t * 1.25) * 0.15;
                const fy = Math.sin(p.x * 0.003 + t * 0.65) * 0.22 + Math.cos(p.y * 0.002 - t * 1.05) * 0.1;
                p.x += fx * dt * 0.5;
                p.y += fy * dt * 0.5;
                if (p.x < -10) p.x = w + 10; else if (p.x > w + 10) p.x = -10;
                if (p.y < -10) p.y = h + 10; else if (p.y > h + 10) p.y = -10
            }
            const specks = specksRef.current;
            for (let i = 0; i < specks.length; i++) {
                const s = specks[i];
                if (s.pv !== pv) {
                    s.c = pick();
                    s.pv = pv
                }
                const dx = Math.cos(s.y * 0.0015 + t * 0.78) * 0.05;
                const dy = 0.026 + Math.sin(s.x * 0.001 + t) * 0.018;
                s.x += dx * dt;
                s.y += dy * dt;
                if (s.x < -14) s.x = w + 14; else if (s.x > w + 14) s.x = -14;
                if (s.y > h + 14) s.y = -14; else if (s.y < -14) s.y = h + 14
            }
            ctx.globalAlpha = 0.32;
            for (let i = 0; i < dust.length; i++) {
                const p = dust[i];
                if (inside(p.x, p.y)) continue;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.c;
                ctx.fill()
            }
            ctx.globalAlpha = 0.38;
            for (let i = 0; i < specks.length; i++) {
                const s = specks[i];
                if (inside(s.x, s.y)) continue;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = s.c;
                ctx.fill()
            }
            rafRef.current = requestAnimationFrame(step)
        };
        const start = () => {
            if (startedRef.current) return;
            startedRef.current = true;
            const dims = scaleCanvas(canvas);
            w = dims.w;
            h = dims.h;
            updateRects();
            init();
            lastT = 0;
            rafRef.current = requestAnimationFrame(step)
        };
        const resize = () => {
            if (!startedRef.current) return;
            const dims = scaleCanvas(canvas);
            w = dims.w;
            h = dims.h;
            init();
            updateRects()
        };
        const startEvents = ['scroll', 'pointerdown', 'mousemove', 'touchstart', 'keydown', 'wheel'];
        const se = () => start();
        startEvents.forEach(ev => window.addEventListener(ev, se, {once: true, passive: true}));
        window.addEventListener('resize', resize);
        return () => {
            startEvents.forEach(ev => window.removeEventListener(ev, se));
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', resize)
        }
    }, [mounted, palette])
    if (!mounted) return null
    return createPortal(<canvas ref={canvasRef} aria-hidden="true" id="site-particles" style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none'
    }}/>, document.body)
}
