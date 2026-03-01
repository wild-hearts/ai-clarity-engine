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
