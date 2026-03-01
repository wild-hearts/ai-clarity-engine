"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './workflows.module.css';

// Strip citation markers like [web:19] from content strings
function clean(str) {
    return str.replace(/\[web:\d+\]/g, '').trim();
}

const WORKFLOWS = [
    {
        id: 'workflow-ai-toolkit',
        badge: 'Start here',
        title: 'Author AI Toolkit',
        subtitle: 'Use AI like a pro at every stage of your draft.',
        route: '/author-workflows/ai-toolkit',
        perfectFor: [
            'You want to brainstorm and draft faster without losing your voice.',
            'You feel overwhelmed by random AI hacks and want a curated toolkit.',
            'You want clear guardrails so AI supports, not replaces, your creativity.',
        ],
        whatsInside: [
            'Planning prompts to outline your book, characters, and world.',
            'Drafting prompts that keep your voice consistent while speeding you up.',
            'Revision prompts for tightening scenes, dialogue, and pacing.',
            'Ethical and practical guardrails so you stay in control of your work.',
            'Quick-start path for your first 60 minutes with the toolkit.',
        ],
        format: 'Instant digital download (PDF guide + copy-paste prompt sheets).',
        buttonLabel: 'View Author AI Toolkit →',
    },
    {
        id: 'workflow-editing',
        badge: 'Polish your draft',
        title: 'Editing Workflow',
        subtitle: 'Turn your messy draft into a professional-grade manuscript.',
        route: null,
        perfectFor: [
            'Your draft is done but you do not know what to fix first.',
            'You want a clear order for structural, line, copy, and proof edits.',
            'You are preparing to work with an editor or a publishing service.',
        ],
        whatsInside: [
            'High-level roadmap of the full editing process.',
            'Developmental edit checklist to strengthen structure and story.',
            'Line and copy edit passes you can follow one step at a time.',
            'Chapter-by-chapter self-edit questions to catch common issues.',
            'Final "ready to publish" checklist for peace of mind.',
        ],
        format: 'PDF workflow guide + editable checklists and pass trackers.',
        buttonLabel: 'Coming soon',
    },
    {
        id: 'workflow-selfpublishing',
        badge: 'Production',
        title: 'Self-Publishing Flow',
        subtitle: 'From polished manuscript to live book on major retailers.',
        route: '/author-workflows/self-publishing-flow',
        perfectFor: [
            'Your manuscript is almost or fully edited and you are ready to publish.',
            'You want to avoid technical mistakes with ISBNs, files, and platforms.',
            'You want a plan for ebook, print, and other formats without guesswork.',
        ],
        whatsInside: [
            'End-to-end self-publishing master checklist from goals to post-launch.',
            'Budget and cost planner for editing, design, formatting, and printing.',
            'Platform decision matrix for KDP, IngramSpark, and other services.',
            'Metadata workbook for categories, keywords, and book descriptions.',
            'File preparation and upload checklists for ebook and print formats.',
            'Launch settings checklist so pricing, territories, and links are aligned.',
        ],
        format: 'PDF guide + editable planners, checklists, and matrices.',
        buttonLabel: 'View Self-Publishing Flow →',
    },
    {
        id: 'workflow-marketing',
        badge: 'Launch & beyond',
        title: 'Marketing Flow Kit',
        subtitle: 'A complete marketing plan from pre-launch warm-up to long-tail sales.',
        route: '/author-workflows/marketing-flow-kit',
        perfectFor: [
            'You dread marketing and never know what to do next.',
            'You want a realistic plan that fits around work, family, and writing.',
            'You want scripts, templates, and timelines instead of a blank page.',
        ],
        whatsInside: [
            'Six-month marketing timeline broken into weekly actions and milestones.',
            'Author platform and audience-building checklist for website, email, and socials.',
            'ARC and review system with outreach tracker and email templates.',
            'Email sequences for welcome, launch, and review requests you can customise.',
            'Social media content pillars, 30+ post prompts, and a weekly content planner.',
            'Launch week calendar with day-by-day tasks and post-launch follow-up.',
        ],
        format: 'Main PDF playbook + editable spreadsheets and script documents.',
        buttonLabel: 'View Marketing Flow Kit →',
    },
];

const BUNDLES = [
    {
        id: 'bundle-editing-essentials',
        badge: 'Draft + edit',
        name: 'Editing Essentials',
        description: 'Everything you need to move from rough draft to polished manuscript.',
        includes: ['Author AI Toolkit', 'Editing Workflow'],
        price: 'Set bundle price',
        buttonLabel: 'Get Editing Essentials',
        featured: false,
    },
    {
        id: 'bundle-publishing-essentials',
        badge: 'Publish + launch',
        name: 'Publishing Essentials',
        description: 'Turn your finished manuscript into a published and promoted book.',
        includes: ['Self-Publishing Flow', 'Marketing Flow Kit'],
        price: 'Set bundle price',
        buttonLabel: 'Get Publishing Essentials',
        featured: false,
    },
    {
        id: 'bundle-full-journey',
        badge: 'Best value',
        name: 'Full Author Journey',
        description: 'Follow a single guided path from first idea to long-tail book sales.',
        includes: ['Author AI Toolkit', 'Editing Workflow', 'Self-Publishing Flow', 'Marketing Flow Kit'],
        price: 'Set best value price',
        buttonLabel: 'Get Full Journey Bundle',
        featured: true,
    },
];

const FAQS = [
    {
        q: 'Do I need all four workflows?',
        a: 'No. You can start wherever you are in your author journey. If you already have a finished manuscript, you might begin with the Self-Publishing Flow and Marketing Flow Kit, then come back for the AI Toolkit and Editing Workflow for your next book.',
    },
    {
        q: 'What formats do I receive?',
        a: 'Each workflow includes a core PDF guide plus editable planners, checklists, and templates. Where it makes sense, you will also receive spreadsheets and script documents you can duplicate and customise.',
    },
    {
        q: 'Can I reuse these workflows for multiple books?',
        a: 'Yes. The checklists, planners, and scripts are designed to be reused and adapted for every book you write and publish.',
    },
    {
        q: 'Will this work if I am traditionally published?',
        a: 'Yes, especially the Editing Workflow and Marketing Flow Kit. Some technical parts of the Self-Publishing Flow may not apply if your publisher controls production and distribution.',
    },
    {
        q: 'Is this coaching or a done-for-you service?',
        a: 'These are self-paced workflow kits. You follow the steps and use the templates yourself. Where relevant, we highlight tasks you may want to outsource, such as editing or cover design.',
    },
];

function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function AuthorWorkflows() {
    const [openFaq, setOpenFaq] = useState(null);

    return (
        <main style={{ background: '#0d0b09' }}>
            {/* ===== HERO ===== */}
            <section className={styles.hero}>
                <div className={styles.heroBg} />
                <div className={styles.heroOverlay} />

                <div className={`${styles.heroContent} animate-fade-in`}>
                    <div className={styles.heroEyebrow}>Wild Hearts Publishing</div>

                    <h1 className={styles.heroTitle}>
                        A complete workflow from first draft to fully published, marketed book
                    </h1>

                    <p className={styles.heroSubtitle}>
                        Four step-by-step kits with checklists, timelines, and templates so you always know what to do next.
                    </p>

                    <div className={styles.heroButtons}>
                        <button
                            className={styles.btnPrimary}
                            onClick={() => scrollTo('workflow-overview')}
                        >
                            Explore author workflows
                        </button>
                        <button
                            className={styles.btnSecondary}
                            onClick={() => scrollTo('workflow-ai-toolkit')}
                        >
                            Start with the Author AI Toolkit
                        </button>
                    </div>

                    <p className={styles.heroSupport}>
                        Built by Wild Hearts Publishing for indie authors who want professional results without traditional gatekeepers.
                    </p>
                </div>
            </section>

            {/* ===== WORKFLOW OVERVIEW ===== */}
            <section className={styles.overviewSection} id="workflow-overview">
                <div className={styles.sectionInner}>
                    <h2 className={styles.sectionTitle}>Four workflows. One clear path.</h2>
                    <p className={styles.overviewBody}>
                        Each workflow is a complete, guided system you can follow from start to finish. Use them individually, or connect them into a single author journey.
                    </p>
                    <div className={styles.overviewSteps}>
                        {[
                            { label: '1. Author AI Toolkit', desc: 'Draft and revise faster with ethical, author-first AI support.' },
                            { label: '2. Editing Workflow', desc: 'Shape your draft into a strong, submission-ready manuscript.' },
                            { label: '3. Self-Publishing Flow', desc: 'Handle every technical and production decision from manuscript to store page.' },
                            { label: '4. Marketing Flow Kit', desc: 'Plan and execute your launch and long-tail marketing, week by week.' },
                        ].map((step, i) => (
                            <div key={i} className={styles.overviewStep}>
                                <div className={styles.overviewStepLabel}>{step.label}</div>
                                <p className={styles.overviewStepDesc}>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CARD GRID ===== */}
            <section className={styles.cardGridSection}>
                <div className={styles.sectionInner}>
                    <h2 className={styles.sectionTitle}>Author workflow kits</h2>
                    <div className={styles.cardGrid}>
                        {WORKFLOWS.map((wf) => (
                            <div key={wf.id} className={styles.workflowCard} id={wf.id}>
                                <div className={styles.cardBadge}>{wf.badge}</div>
                                <h3 className={styles.cardTitle}>{wf.title}</h3>
                                <p className={styles.cardSubtitle}>{wf.subtitle}</p>

                                <div className={styles.cardSection}>
                                    <div className={styles.cardSectionLabel}>Perfect for</div>
                                    <ul className={styles.cardList}>
                                        {wf.perfectFor.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className={styles.cardSection}>
                                    <div className={styles.cardSectionLabel}>What&apos;s inside</div>
                                    <ul className={`${styles.cardList} ${styles.insideList}`}>
                                        {wf.whatsInside.map((item, i) => (
                                            <li key={i}>{clean(item)}</li>
                                        ))}
                                    </ul>
                                </div>

                                <p className={styles.cardFormat}>{wf.format}</p>
                                {wf.route ? (
                                    <Link href={wf.route} className={styles.cardCta}>{wf.buttonLabel}</Link>
                                ) : (
                                    <button className={styles.cardCta} disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>{wf.buttonLabel}</button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== HOW IT FITS TOGETHER ===== */}
            <section className={styles.roadmapSection}>
                <div className={styles.sectionInner}>
                    <h2 className={styles.sectionTitle}>How the workflows fit together</h2>
                    <p className={styles.roadmapBody}>
                        You can jump in where you are today, or follow the full journey from idea to long-term sales.
                    </p>
                    <div className={styles.roadmapSteps}>
                        {[
                            { title: 'Draft with support', desc: 'Use the Author AI Toolkit to plan, draft, and revise with AI as a smart assistant, not a co-author.' },
                            { title: 'Edit with confidence', desc: 'Follow the Editing Workflow to transform your draft into a clean, coherent manuscript.' },
                            { title: 'Publish professionally', desc: 'Use the Self-Publishing Flow to handle files, metadata, platforms, and ISBNs step by step.' },
                            { title: 'Launch and grow', desc: 'Run the Marketing Flow Kit to launch your book, collect reviews, and keep sales moving.' },
                        ].map((step, i) => (
                            <div key={i} className={styles.roadmapStep}>
                                <div className={styles.roadmapNumber}>{i + 1}</div>
                                <div className={styles.roadmapContent}>
                                    <div className={styles.roadmapTitle}>{step.title}</div>
                                    <p className={styles.roadmapDesc}>{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== WHO FOR ===== */}
            <section className={styles.whoForSection}>
                <div className={styles.sectionInner}>
                    <h2 className={styles.sectionTitle}>Who these workflows are for</h2>
                    <div className={styles.twoColGrid}>
                        <div className={styles.twoColCard}>
                            <div className={styles.twoColSubtitle}>Perfect for you if…</div>
                            <ul className={styles.twoColList}>
                                <li>You are an indie or hybrid author who wants a clear plan at every stage.</li>
                                <li>You want to save time and energy by following proven checklists instead of piecing advice together.</li>
                                <li>You like doing the work yourself, but want professional guidance as you go.</li>
                            </ul>
                        </div>
                        <div className={`${styles.twoColCard} ${styles.twoColCardAlt}`}>
                            <div className={styles.twoColSubtitle}>Probably not for you if…</div>
                            <ul className={styles.twoColList}>
                                <li>You want a full-service team to do everything for you from start to finish.</li>
                                <li>You are looking for genre-specific coaching, not general publishing workflows.</li>
                                <li>You expect guaranteed sales or bestseller status instead of a guided process.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== BUNDLE PRICING ===== */}
            <section className={styles.pricingSection} id="bundle-pricing">
                <div className={styles.sectionInner}>
                    <h2 className={styles.sectionTitle}>Choose your workflow or bundle the journey</h2>
                    <p className={styles.sectionSubtitle}>
                        Start with one kit or get the full set at a bundled price.
                    </p>
                    <div className={styles.pricingGrid}>
                        {BUNDLES.map((bundle) => (
                            <div
                                key={bundle.id}
                                className={`${styles.pricingCard} ${bundle.featured ? styles.pricingCardFeatured : ''}`}
                            >
                                {bundle.featured && (
                                    <div className={styles.pricingFeaturedBadge}>Best value</div>
                                )}
                                {!bundle.featured && (
                                    <div className={styles.pricingBadge}>{bundle.badge}</div>
                                )}
                                <h3 className={styles.pricingName}>{bundle.name}</h3>
                                <p className={styles.pricingDesc}>{bundle.description}</p>
                                <ul className={styles.pricingIncludes}>
                                    {bundle.includes.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                                <div className={styles.pricingPrice}>{bundle.price}</div>
                                <button className={styles.pricingCta}>{bundle.buttonLabel}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== FAQ ===== */}
            <section className={styles.faqSection}>
                <div className={styles.sectionInner}>
                    <h2 className={styles.sectionTitle}>Frequently asked questions</h2>
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
                                {openFaq === i && (
                                    <div className={styles.faqAnswer}>{faq.a}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== FINAL CTA ===== */}
            <section className={styles.calloutSection}>
                <div className={styles.calloutInner}>
                    <div className={styles.sectionInner}>
                        <h2 className={styles.calloutTitle}>Ready to stop guessing your next step?</h2>
                        <p className={styles.calloutBody}>
                            Choose the workflow that matches where you are today, and let Wild Hearts guide you from first draft to a finished, published, and marketed book.
                        </p>
                        <button
                            className={styles.calloutBtn}
                            onClick={() => scrollTo('workflow-grid')}
                        >
                            Choose your workflow
                        </button>
                    </div>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className={styles.footer}>
                <div className={styles.sectionInner}>
                    <p className={styles.footerText}>
                        Wild Hearts Author Workflows —{' '}
                        <a
                            href="https://wildheartspublishing.com.au"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.footerLink}
                        >
                            Wild Hearts Publishing
                        </a>
                    </p>
                </div>
            </footer>
        </main>
    );
}
