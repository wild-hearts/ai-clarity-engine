"use client";

import { useState, useEffect } from 'react';
import styles from './delivery.module.css';

const LOADING_STEPS = [
    "Analyzing business bottlenecks...",
    "Cross-referencing tech stack with AI tool registry...",
    "Drafting custom automation workflows...",
    "Compiling bespoke prompt kit...",
    "Formatting your personalized PDF..."
];

export default function Delivery() {
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Simulate generation process over 8 seconds.
        // In a real app, this would poll the backend API or use a Webhook/Server-Sent-Events.
        let currentProgress = 0;

        const progressInterval = setInterval(() => {
            currentProgress += 1;
            setProgress(currentProgress);

            if (currentProgress >= 100) {
                clearInterval(progressInterval);
                setIsComplete(true);
            } else {
                // Calculate which step we should be on based on progress
                const stepIndex = Math.floor((currentProgress / 100) * LOADING_STEPS.length);
                setCurrentStep(Math.min(stepIndex, LOADING_STEPS.length - 1));
            }
        }, 80); // 100 * 80ms = 8000ms (8 seconds)

        return () => clearInterval(progressInterval);
    }, []);

    const handleDownload = () => {
        // Simulate file download
        alert("In the real implementation, this streams the generated PDF back down to the browser!");
    };

    return (
        <main className={styles.container}>
            <div className={styles.contentCard}>

                {!isComplete ? (
                    <div>
                        <div className={styles.spinnerBox}>
                            <div className={styles.spinner}></div>
                            <div className={styles.spinnerLogo}>Ai</div>
                        </div>

                        <div className={styles.statusText}>
                            {LOADING_STEPS[currentStep]}
                        </div>

                        <div className={styles.progressContainer}>
                            <div
                                className={styles.progressBar}
                                style={{ width: `${progress}%` }}
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
                ) : (
                    <div className={styles.downloadState}>
                        <svg className={styles.successIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>

                        <h1 className={styles.downloadTitle}>Your Strategy is Ready</h1>
                        <p className={styles.downloadText}>
                            Your bespoke AI Clarity Engine PDF has been successfully generated. Click below to view and download your playbook.
                        </p>

                        <button onClick={handleDownload} className="btn-primary" style={{ width: '100%', padding: '1.25rem' }}>
                            Download PDF Strategy
                        </button>
                    </div>
                )}

            </div>
        </main>
    );
}
