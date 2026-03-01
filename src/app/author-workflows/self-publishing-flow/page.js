"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from '../product.module.css';

const WHATS_INSIDE = [
    'End-to-end self-publishing master checklist from goals to post-launch.',
    'Budget and cost planner for editing, design, formatting, and printing.',
    'Platform decision matrix for KDP, IngramSpark, and other services.',
    'Metadata workbook for categories, keywords, and book descriptions.',
    'File preparation and upload checklists for ebook and print formats.',
    'Launch settings checklist so pricing, territories, and links are aligned.',
];

const FOR_YOU = [
    'Your manuscript is almost or fully edited and you are ready to publish.',
    'You want to avoid technical mistakes with ISBNs, files, and platforms.',
    'You want a clear plan for ebook, print, and other formats without guesswork.',
    'You are self-publishing for the first time and want a proven checklist to follow.',
];

const NOT_FOR_YOU = [
    'You want a publisher to handle production and distribution for you.',
    'You are not yet ready to publish — still drafting or editing.',
    'You expect a guaranteed sales outcome rather than a guided process.',
];

const FAQS = [
    {
        q: 'Does this cover both ebook and print?',
        a: 'Yes. The flow includes checklists and guidance for ebook formatting and upload (Kindle, Kobo, Apple Books) as well as print-on-demand formats via KDP Print and IngramSpark.',
    },
    {
        q: 'Do I need technical knowledge to use this?',
        a: 'No. The checklists are written in plain English and walk you through every decision step by step. Where technical knowledge is needed, the flow tells you exactly what to look up or who to hire.',
    },
    {
        q: 'Will this work outside Australia?',
        a: 'Yes. The platform guidance covers global distributors (KDP, IngramSpark, Draft2Digital) that work in any country. Pricing and currency are covered in the budget planner.',
    },
    {
        q: 'Can I reuse it for multiple books?',
        a: 'Absolutely. Every checklist and planner is designed to be reused and adapted for each book you publish.',
    },
];

export default function SelfPublishingPage() {
    const [openFaq, setOpenFaq] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleBuy = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tier: 'self-publishing' }),
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
                <div className={styles.heroBg} style={{ backgroundImage: "url('/bg_writing_desk.png')" }} />
                <div className={styles.heroOverlay} />
                <div className={styles.heroContent}>
                    <div className={styles.eyebrow}>Self-Publishing Flow</div>
                    <h1 className={styles.heroTitle}>
                        From polished manuscript to live book on major retailers
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Every technical and production decision — ISBNs, files, platforms, metadata — covered step by step so you publish with confidence, not guesswork.
                    </p>
                    <div className={styles.heroMeta}>
                        <span className={styles.heroMetaItem}>Instant PDF download</span>
                        <span className={styles.heroMetaItem}>Editable planners &amp; checklists</span>
                        <span className={styles.heroMetaItem}>Covers ebook + print</span>
                    </div>
                </div>
            </section>

            {/* ── WHAT'S INSIDE ── */}
            <section className={styles.sectionAlt}>
                <div className={styles.inner}>
                    <h2 className={styles.sectionTitle}>What&apos;s inside</h2>
                    <p className={styles.sectionBody}>
                        A complete production system — everything from goals to your first live sale, in a single guided flow.
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
                        <h2 className={styles.buyTitle}>Self-Publishing Flow</h2>
                        <p className={styles.buyDesc}>PDF guide + editable planners, checklists, and the platform decision matrix.</p>
                        <ul className={styles.buyIncludes}>
                            {WHATS_INSIDE.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                        <div className={styles.buyPrice}>$39 <span style={{ fontSize: '1rem', fontFamily: 'Inter', fontWeight: 400, color: 'rgba(245,240,232,0.4)' }}>AUD</span></div>
                        <p className={styles.buyPriceSub}>One-time payment · No subscription</p>
                        <button className={styles.buyBtn} onClick={handleBuy} disabled={loading}>
                            {loading ? 'Redirecting to checkout…' : 'Buy now — $39 AUD'}
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
