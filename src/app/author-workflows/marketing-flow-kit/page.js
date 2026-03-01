"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from '../product.module.css';

const WHATS_INSIDE = [
    'Six-month marketing timeline broken into weekly actions and milestones.',
    'Author platform and audience-building checklist for website, email, and socials.',
    'ARC and review system with outreach tracker and email templates.',
    'Email sequences for welcome, launch, and review requests you can customise.',
    'Social media content pillars, 30+ post prompts, and a weekly content planner.',
    'Launch week calendar with day-by-day tasks and post-launch follow-up.',
    '2026 Answer Engine Optimization (AEO) Setup: Stop competing for keywords — start becoming the Answer. Structure your presence so AI agents recommend your book.',
];

const FOR_YOU = [
    'You dread marketing and never know what to do next.',
    'You want a realistic plan that fits around work, family, and writing.',
    'You want scripts, templates, and timelines instead of a blank page.',
    'You are preparing to launch or have already launched and want to restart momentum.',
];

const NOT_FOR_YOU = [
    'You want a marketing agency or publicist to run your campaign for you.',
    'You are looking for paid advertising management or social media management.',
    'You expect guaranteed sales numbers rather than a guided marketing process.',
];

const FAQS = [
    {
        q: 'How far in advance should I start the marketing flow?',
        a: 'Ideally 3–6 months before your launch date so you can build your audience and ARC reader list. However, the kit also includes a condensed version for authors who are launching sooner.',
    },
    {
        q: 'Do I need a big social media following?',
        a: 'No. The kit focuses on building from where you are right now — even from zero. It prioritises email and direct reader relationships over follower counts.',
    },
    {
        q: 'Will the email sequences work with any email platform?',
        a: 'Yes. The sequences are written as plain-text scripts you can paste into any platform — Mailchimp, ConvertKit, Klaviyo, Flodesk, or any other.',
    },
    {
        q: 'Can I reuse it for multiple books?',
        a: 'Yes. The calendar, post prompts, and email sequences are designed to be adapted for each launch. Many authors keep it as a permanent marketing reference.',
    },
];

export default function MarketingFlowPage() {
    const [openFaq, setOpenFaq] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleBuy = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tier: 'marketing-kit' }),
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
                    <div className={styles.eyebrow}>Marketing Flow Kit</div>
                    <h1 className={styles.heroTitle}>
                        A complete marketing plan from pre-launch warm-up to long-tail sales
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Week-by-week timelines, email scripts, social content, ARC systems, and a launch calendar — so you always know exactly what to do next.
                    </p>
                    <div className={styles.heroMeta}>
                        <span className={styles.heroMetaItem}>Instant PDF download</span>
                        <span className={styles.heroMetaItem}>Editable spreadsheets &amp; scripts</span>
                        <span className={styles.heroMetaItem}>6-month timeline included</span>
                    </div>
                </div>
            </section>

            {/* ── WHAT'S INSIDE ── */}
            <section className={styles.sectionAlt}>
                <div className={styles.inner}>
                    <h2 className={styles.sectionTitle}>What&apos;s inside</h2>
                    <p className={styles.sectionBody}>
                        From your first warm-up post to your post-launch review push — every action, every week, in one playbook.
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
                        <h2 className={styles.buyTitle}>Marketing Flow Kit</h2>
                        <p className={styles.buyDesc}>Main PDF playbook + editable spreadsheets, email scripts, and social media documents.</p>
                        <ul className={styles.buyIncludes}>
                            {WHATS_INSIDE.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                        <div className={styles.buyPrice}>$97 <span style={{ fontSize: '1rem', fontFamily: 'Inter', fontWeight: 400, color: 'rgba(245,240,232,0.4)' }}>AUD</span></div>
                        <p className={styles.buyPriceSub}>One-time payment · No subscription</p>
                        <button className={styles.buyBtn} onClick={handleBuy} disabled={loading}>
                            {loading ? 'Redirecting to checkout…' : 'Buy now — $97 AUD'}
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
