"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './delivery.module.css';

const PERSONALISED_STEPS = [
    "Analysing your genre and reader expectations...",
    "Building your personalised 4-D prompt library...",
    "Crafting your custom revision workflow...",
    "Generating voice-preservation techniques...",
    "Creating your marketing starter kit...",
    "Assembling your 24-hour action plan...",
    "Formatting your bespoke PDF toolkit..."
];

function UniversalDelivery() {
    return (
        <div className={styles.downloadState}>
            <svg className={styles.successIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>

            <h1 className={styles.downloadTitle}>Your Prompt Vault is Ready</h1>
            <p className={styles.downloadText}>
                Your Author's AI Toolkit with 100+ copy-paste prompts, the 4-D framework, and everything you need to start using AI in your writing today.
            </p>

            <a
                href="/Authors_AI_Toolkit_Prompt_Vault.pdf"
                download
                className="btn-primary"
                style={{ width: '100%', padding: '1.25rem', textAlign: 'center', display: 'block' }}
            >
                Download The Prompt Vault (PDF)
            </a>

            <div className={styles.upsellBox}>
                <h3 className={styles.upsellTitle}>Want prompts written specifically for your book?</h3>
                <p className={styles.upsellText}>
                    Upgrade to the Bespoke Toolkit — we'll generate personalised prompts, a custom revision workflow, and a marketing starter kit tailored to your manuscript.
                </p>
                <a href="/#pricing" className={styles.upsellLink}>
                    See the Bespoke Toolkit →
                </a>
            </div>
        </div>
    );
}

function AIToolkitDelivery() {
    return (
        <div className={styles.downloadState}>
            <svg className={styles.successIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h1 className={styles.downloadTitle}>Your Author AI Toolkit is Ready</h1>
            <p className={styles.downloadText}>
                Download your PDF guide and copy-paste prompt sheets below. You can start using them immediately in Claude or ChatGPT.
            </p>
            <a
                href="/Authors_AI_Toolkit_Prompt_Vault.pdf"
                download
                className="btn-primary"
                style={{ width: '100%', padding: '1.25rem', textAlign: 'center', display: 'block' }}
            >
                Download Author AI Toolkit (PDF)
            </a>
        </div>
    );
}

function SelfPublishingDelivery() {
    return (
        <div className={styles.downloadState}>
            <svg className={styles.successIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h1 className={styles.downloadTitle}>Your Self-Publishing Flow is Ready</h1>
            <p className={styles.downloadText}>
                Download your PDF guide along with all the checklists, planners, and the platform decision matrix below.
            </p>
            <a
                href="/Self_Publishing_Flow.pdf"
                download
                className="btn-primary"
                style={{ width: '100%', padding: '1.25rem', textAlign: 'center', display: 'block' }}
            >
                Download Self-Publishing Flow (PDF)
            </a>
        </div>
    );
}

function MarketingKitDelivery() {
    return (
        <div className={styles.downloadState}>
            <svg className={styles.successIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h1 className={styles.downloadTitle}>Your Marketing Flow Kit is Ready</h1>
            <p className={styles.downloadText}>
                Download your PDF playbook with all the email scripts, social media prompts, and your six-month launch calendar below.
            </p>
            <a
                href="/Marketing_Flow_Kit.pdf"
                download
                className="btn-primary"
                style={{ width: '100%', padding: '1.25rem', textAlign: 'center', display: 'block' }}
            >
                Download Marketing Flow Kit (PDF)
            </a>
        </div>
    );
}

function FullJourneyDelivery() {
    const downloads = [
        {
            title: 'Author AI Toolkit',
            action: 'Open this first to master your drafting engine.',
            file: '/Authors_AI_Toolkit_Prompt_Vault.pdf',
            label: 'Download Author AI Toolkit',
        },
        {
            title: 'Editing Workflow',
            action: 'The 4-dimension logic for your second draft.',
            file: '/Authors_AI_Toolkit_Prompt_Vault.pdf', // replace with Editing_Workflow.pdf when ready
            label: 'Download Editing Workflow',
        },
        {
            title: 'Self-Publishing Flow',
            action: 'Your technical roadmap to global distribution.',
            file: '/Self_Publishing_Flow.pdf',
            label: 'Download Self-Publishing Flow',
        },
        {
            title: 'Marketing & AEO Kit',
            action: 'The blueprint for AI and human discovery.',
            file: '/Marketing_Flow_Kit.pdf',
            label: 'Download Marketing & AEO Kit',
        },
    ];

    return (
        <div>
            {/* ── Celebration hero ── */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <svg style={{ width: 56, height: 56, color: '#c9a050', marginBottom: '1rem' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <h1 className={styles.downloadTitle} style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', marginBottom: '0.75rem' }}>
                    Welcome to the Collective!
                </h1>
                <p style={{ color: 'rgba(245,240,232,0.65)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                    Your journey from manuscript to market officially starts now.
                </p>
                <p style={{ color: 'rgba(245,240,232,0.5)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    You&apos;ve stopped guessing and started building. Your workflows are ready for download below.
                </p>
            </div>

            {/* ── Download vault ── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
                {downloads.map((d, i) => (
                    <div key={i} style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(201,160,80,0.2)',
                        borderRadius: 12,
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                    }}>
                        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', color: '#f5f0e8', fontWeight: 700 }}>
                            {d.title}
                        </div>
                        <p style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.5)', lineHeight: 1.5, fontStyle: 'italic', margin: 0 }}>
                            {d.action}
                        </p>
                        <a
                            href={d.file}
                            download
                            className="btn-primary"
                            style={{ padding: '0.75rem 1rem', textAlign: 'center', display: 'block', fontSize: '0.85rem', marginTop: 'auto' }}
                        >
                            {d.label}
                        </a>
                    </div>
                ))}
            </div>

            {/* ── First 5-minute task ── */}
            <div style={{
                background: 'rgba(201,160,80,0.07)',
                border: '1px solid rgba(201,160,80,0.25)',
                borderRadius: 12,
                padding: '1.75rem',
                marginBottom: '2rem',
            }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#c9a050', marginBottom: '0.75rem', fontFamily: 'Inter, sans-serif' }}>
                    Your First 5-Minute Task
                </div>
                <p style={{ color: 'rgba(245,240,232,0.75)', fontSize: '0.92rem', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
                    &quot;Don&apos;t wait until you&apos;re finished to start your AEO (Answer Engine Optimization). Open the Marketing Kit now and flip to the &apos;Entity Setup&apos; page. Completing this one 5-minute task today ensures AI engines like Gemini and ChatGPT start recognizing you as an author before you even hit &apos;Publish&apos;.&quot;
                </p>
            </div>

            {/* ── Momentum closer ── */}
            <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12,
                padding: '1.75rem',
                textAlign: 'center',
            }}>
                <p style={{ color: 'rgba(245,240,232,0.65)', fontSize: '0.92rem', lineHeight: 1.75, margin: 0, fontStyle: 'italic' }}>
                    &quot;You wrote the book. We&apos;re here to make sure it&apos;s heard. If you have any questions while moving through the flows, reach out at{' '}
                    <a href="mailto:publishing@wildheartshq.com" style={{ color: '#c9a050' }}>publishing@wildheartshq.com</a>
                    &nbsp;— a real human (and a fellow author) is on the other side.&quot;
                </p>
            </div>
        </div>
    );
}


function PersonalisedDelivery({ searchParams }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const generatePdf = async () => {
            try {
                const category = searchParams.get('category') || 'Fiction';
                const bookTitle = searchParams.get('bookTitle') || 'Your Book';
                const genre = searchParams.get('genre') || 'Fiction';
                const writingStage = searchParams.get('writingStage') || 'Drafting';
                const blurb = searchParams.get('blurb') || 'A new novel';
                const struggle = searchParams.get('struggle') || 'Writing';
                const protagonist = searchParams.get('protagonist') || '';
                const theme = searchParams.get('theme') || '';
                const readerProblem = searchParams.get('readerProblem') || '';
                const framework = searchParams.get('framework') || '';

                const stepInterval = setInterval(() => {
                    setCurrentStep(prev => {
                        if (prev < PERSONALISED_STEPS.length - 1) return prev + 1;
                        return prev;
                    });
                }, 4000);

                const response = await fetch('/api/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        category, bookTitle, genre, writingStage, blurb, struggle,
                        protagonist, theme, readerProblem, framework
                    })
                });

                clearInterval(stepInterval);

                if (!response.ok) {
                    throw new Error('Failed to generate toolkit');
                }

                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                setPdfUrl(url);
                setCurrentStep(PERSONALISED_STEPS.length);
                setIsComplete(true);

            } catch (err) {
                console.error(err);
                setError(err.message);
                setIsComplete(true);
            }
        };

        generatePdf();
    }, [searchParams]);

    const handleDownload = () => {
        if (!pdfUrl) return;
        const a = document.createElement('a');
        a.href = pdfUrl;
        const bookTitle = searchParams.get('bookTitle') || 'Your_Book';
        a.download = `${bookTitle.replace(/\s+/g, '_')}_AI_Toolkit.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    if (!isComplete) {
        return (
            <div>
                <div className={styles.spinnerBox}>
                    <div className={styles.spinner}></div>
                    <div className={styles.spinnerLogo}>Ai</div>
                </div>

                <div className={styles.statusText}>
                    {PERSONALISED_STEPS[Math.min(currentStep, PERSONALISED_STEPS.length - 1)]}
                </div>

                <div className={styles.progressContainer}>
                    <div
                        className={styles.progressBar}
                        style={{ width: `${(currentStep / PERSONALISED_STEPS.length) * 100}%` }}
                    ></div>
                </div>

                <ul className={styles.actionsList}>
                    {PERSONALISED_STEPS.map((step, index) => (
                        <li
                            key={index}
                            className={`
                                ${styles.actionItem} 
                                ${index === currentStep ? styles.active : ''} 
                                ${index < currentStep ? styles.done : ''}
                            `}
                        >
                            {index < currentStep ? '✓' : index === currentStep ? '→' : '−'} {step}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.downloadState}>
                <h1 className={styles.downloadTitle} style={{ color: 'red' }}>Generation Error</h1>
                <p className={styles.downloadText}>
                    We encountered an issue generating your toolkit: {error}. Please try again or contact support.
                </p>
            </div>
        );
    }

    return (
        <div className={styles.downloadState}>
            <svg className={styles.successIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>

            <h1 className={styles.downloadTitle}>Your Bespoke Toolkit is Ready</h1>
            <p className={styles.downloadText}>
                Your personalised Author's AI Toolkit has been generated. Every prompt, workflow, and recommendation references your book directly.
            </p>

            <button onClick={handleDownload} className="btn-primary" style={{ width: '100%', padding: '1.25rem' }}>
                Download Your Bespoke Toolkit (PDF)
            </button>
        </div>
    );
}

function DeliveryContent() {
    const searchParams = useSearchParams();
    const tier = searchParams.get('tier');

    if (tier === 'universal') return <UniversalDelivery />;
    if (tier === 'ai-toolkit') return <AIToolkitDelivery />;
    if (tier === 'self-publishing') return <SelfPublishingDelivery />;
    if (tier === 'marketing-kit') return <MarketingKitDelivery />;
    if (tier === 'full-journey') return <FullJourneyDelivery />;

    return <PersonalisedDelivery searchParams={searchParams} />;
}

export default function Delivery() {
    return (
        <main className={styles.container}>
            <Suspense fallback={<div className={styles.contentCard}>Loading your toolkit environment...</div>}>
                <div className={styles.contentCard}>
                    <DeliveryContent />
                </div>
            </Suspense>
        </main>
    );
}
