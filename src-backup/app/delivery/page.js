"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './delivery.module.css';

const LOADING_STEPS = [
    "Analyzing genre tropes and themes...",
    "Drafting custom revision workflows...",
    "Preserving authorial voice patterns...",
    "Generating personalized writing prompts...",
    "Formatting your bespoke PDF toolkit..."
];

function DeliveryContent() {
    const searchParams = useSearchParams();
    const [currentStep, setCurrentStep] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const generatePdf = async () => {
            try {
                // Read parameters bound from the questionnaire form
                const category = searchParams.get('category') || 'Fiction';
                const bookTitle = searchParams.get('bookTitle') || 'Your Book';
                const genre = searchParams.get('genre') || 'Fiction';
                const writingStage = searchParams.get('writingStage') || 'Drafting';
                const blurb = searchParams.get('blurb') || 'A new novel';
                const struggle = searchParams.get('struggle') || 'Writing';

                // Dynamic Category Params
                const protagonist = searchParams.get('protagonist') || '';
                const theme = searchParams.get('theme') || '';
                const readerProblem = searchParams.get('readerProblem') || '';
                const framework = searchParams.get('framework') || '';

                // Step animation logic
                const stepInterval = setInterval(() => {
                    setCurrentStep(prev => {
                        if (prev < LOADING_STEPS.length - 1) return prev + 1;
                        return prev;
                    });
                }, 4000);

                // Call the generation API Route
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

                // Convert PDF stream to a downloadable blob URL
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                setPdfUrl(url);
                setCurrentStep(LOADING_STEPS.length);
                setIsComplete(true);

            } catch (err) {
                console.error(err);
                setError(err.message);
                setIsComplete(true); // Stop loading so they see the error
            }
        };

        generatePdf();
    }, [searchParams]);

    const handleDownload = () => {
        if (!pdfUrl) return;

        // Trigger actual download of the stream
        const a = document.createElement('a');
        a.href = pdfUrl;
        const bookTitle = searchParams.get('bookTitle') || 'Your_Book';
        a.download = `${bookTitle.replace(/\\s+/g, '_')}_AI_Toolkit.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className={styles.contentCard}>
            {!isComplete ? (
                <div>
                    <div className={styles.spinnerBox}>
                        <div className={styles.spinner}></div>
                        <div className={styles.spinnerLogo}>Ai</div>
                    </div>

                    <div className={styles.statusText}>
                        {LOADING_STEPS[Math.min(currentStep, LOADING_STEPS.length - 1)]}
                    </div>

                    <div className={styles.progressContainer}>
                        <div
                            className={styles.progressBar}
                            style={{ width: `${(currentStep / LOADING_STEPS.length) * 100}%` }}
                        ></div>
                    </div>

                    <ul className={styles.actionsList}>
                        {LOADING_STEPS.map((step, index) => (
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
            ) : error ? (
                <div className={styles.downloadState}>
                    <h1 className={styles.downloadTitle} style={{ color: 'red' }}>Generation Error</h1>
                    <p className={styles.downloadText}>
                        We encountered an issue generating your toolkit: {error}. Please try again.
                    </p>
                </div>
            ) : (
                <div className={styles.downloadState}>
                    <svg className={styles.successIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>

                    <h1 className={styles.downloadTitle}>Your Toolkit is Ready</h1>
                    <p className={styles.downloadText}>
                        Your bespoke Author's AI Toolkit has been successfully generated. Click below to view and download your playbook.
                    </p>

                    <button onClick={handleDownload} className="btn-primary" style={{ width: '100%', padding: '1.25rem' }}>
                        Download PDF Toolkit
                    </button>
                </div>
            )}
        </div>
    );
}

export default function Delivery() {
    return (
        <main className={styles.container}>
            <Suspense fallback={<div className={styles.contentCard}>Loading your toolkit environment...</div>}>
                <DeliveryContent />
            </Suspense>
        </main>
    );
}
