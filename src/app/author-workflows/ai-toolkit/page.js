"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from '../product.module.css';

const WHATS_INSIDE = [
    'Planning prompts to outline your book, characters, and world.',
    'Drafting prompts that keep your voice consistent while speeding you up.',
    'Revision prompts for tightening scenes, dialogue, and pacing.',
    'Ethical and practical guardrails so you stay in control of your work.',
    'Quick-start path for your first 60 minutes with the toolkit.',
    'Copy-paste prompt sheets for Claude, ChatGPT, and other major AI tools.',
];

const FOR_YOU = [
    'You want to brainstorm and draft faster without losing your voice.',
    'You feel overwhelmed by random AI hacks and want a curated, proven toolkit.',
    'You want clear guardrails so AI supports — not replaces — your creativity.',
    'You are at any drafting or revision stage and want to move faster.',
];

const NOT_FOR_YOU = [
    'You want AI to write your book for you.',
    'You have no manuscript or book idea in progress.',
    'You are looking for a full coaching or done-for-you service.',
];

const FAQS = [
    {
        q: 'Which AI tools do I need?',
        a: 'A free account with Claude (claude.ai) or ChatGPT (chat.openai.com) is enough to start. Every prompt in the toolkit works with any major AI tool — no paid subscriptions required.',
    },
    {
        q: 'Will this work for my genre?',
        a: 'Yes. The toolkit includes prompts and frameworks that work across fiction and non-fiction genres. The prompts are structured so you can plug in your own book details.',
    },
    {
        q: 'What format do I receive?',
        a: 'An instant digital download — a PDF guide plus copy-paste prompt sheets. Download and start within minutes of purchase.',
    },
    {
        q: 'Can I reuse it for multiple books?',
        a: 'Absolutely. The prompts and frameworks are designed to be reused and adapted for every project you work on.',
    },
];

export default function AIToolkitPage() {
    const [openFaq, setOpenFaq] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleBuy = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tier: 'ai-toolkit' }),
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert('Something went wrong. Please try again.');
                setLoading(false);
            }
        } catch {
            alert('Something went wrong. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <Link href="/author-workflows" className={styles.backLink}>
                ← Back to all workflows
            </Link>

            {/* ── HERO ── */}
            <section className={styles.hero}>
                <div className={styles.heroBg} style={{ backgroundImage: "url('/bg_hero_typewriter.png')" }} />
                <div className={styles.heroOverlay} />
                <div className={styles.heroContent}>
                    <div className={styles.eyebrow}>Author AI Toolkit</div>
                    <h1 className={styles.heroTitle}>
                        Use AI like a pro at every stage of your draft
                    </h1>
                    <p className={styles.heroSubtitle}>
                        A curated toolkit of planning, drafting, and revision prompts built around how authors actually work — with guardrails to keep your voice yours.
                    </p>
                    <div className={styles.heroMeta}>
                        <span className={styles.heroMetaItem}>Instant PDF download</span>
                        <span className={styles.heroMetaItem}>Copy-paste prompt sheets</span>
                        <span className={styles.heroMetaItem}>Works with Claude &amp; ChatGPT</span>
                    </div>
                </div>
            </section>

            {/* ── WHAT'S INSIDE ── */}
            <section className={styles.sectionAlt}>
                <div className={styles.inner}>
                    <h2 className={styles.sectionTitle}>What&apos;s inside</h2>
                    <p className={styles.sectionBody}>
                        Every item in this toolkit is built around how the writing process actually works — from blank page to polished draft.
                    </p>
                    <div className={styles.insideGrid}>
                        {WHATS_INSIDE.map((item, i) => (
                            <div key={i} className={styles.insideCard}>
                                <div className={styles.insideCheck}>✓</div>
                                <p className={styles.insideText}>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── WHO IT'S FOR ── */}
            <section className={styles.section}>
                <div className={styles.inner}>
                    <h2 className={styles.sectionTitle}>Who this is for</h2>
                    <div className={styles.forGrid}>
                        <div className={styles.forCard}>
                            <div className={styles.forCardTitle}>Perfect for you if…</div>
                            <ul className={styles.forList}>
                                {FOR_YOU.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                        <div className={`${styles.forCard} ${styles.forCardAlt}`}>
                            <div className={styles.forCardTitle}>Probably not for you if…</div>
                            <ul className={styles.forList}>
                                {NOT_FOR_YOU.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── BUY ── */}
            <section className={styles.buySection}>
                <div className={styles.inner}>
                    <div className={styles.buyCard}>
                        <div className={styles.buyFormat}>Instant digital download</div>
                        <h2 className={styles.buyTitle}>Author AI Toolkit</h2>
                        <p className={styles.buyDesc}>PDF guide + copy-paste prompt sheets. Download and start in under 5 minutes.</p>
                        <ul className={styles.buyIncludes}>
                            {WHATS_INSIDE.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                        <div className={styles.buyPrice}>$47 <span style={{ fontSize: '1rem', fontFamily: 'Inter', fontWeight: 400, color: 'rgba(245,240,232,0.4)' }}>AUD</span></div>
                        <p className={styles.buyPriceSub}>One-time payment · No subscription</p>
                        <button className={styles.buyBtn} onClick={handleBuy} disabled={loading}>
                            {loading ? 'Redirecting to checkout…' : 'Buy now — $47 AUD'}
                        </button>
                        <p className={styles.buyGuarantee}>Secure checkout via Stripe · Instant download after payment</p>
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className={styles.sectionAlt}>
                <div className={styles.inner}>
                    <h2 className={styles.sectionTitle}>Questions</h2>
                    <div className={styles.faqList}>
                        {FAQS.map((faq, i) => (
                            <div
                                key={i}
                                className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ''}`}
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                <div className={styles.faqQuestion}>
                                    <span>{faq.q}</span>
                                    <span className={styles.faqToggle}>{openFaq === i ? '−' : '+'}</span>
                                </div>
                                {openFaq === i && <div className={styles.faqAnswer}>{faq.a}</div>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className={styles.footer}>
                <div className={styles.inner}>
                    <p className={styles.footerText}>
                        Wild Hearts Author Workflows —{' '}
                        <a href="https://wildheartspublishing.com.au" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                            Wild Hearts Publishing
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    );
}
