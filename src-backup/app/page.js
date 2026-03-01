"use client";

import Link from 'next/link';
import { useState } from 'react';
import styles from './landing.module.css';

export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout error:', data.error);
        alert('Something went wrong. Please try again.');
        setIsProcessing(false);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Something went wrong. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <main className={styles.hero}>
      {/* Background aesthetics */}
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>

      <div className={`${styles.heroContent} animate-fade-in`}>
        <div className={styles.badge}>
          For Authors & Writers
        </div>

        <h1 className={styles.title}>
          Author's AI Toolkit<br />
          <span className={styles.titleHighlight}>Your Personalised AI Writing Companion</span>
        </h1>

        <p className={styles.subtitle}>
          Built for your book, your genre, your stage. Get a bespoke 12–18 page toolkit with genre-specific prompts, revision workflows, and voice-preservation techniques—delivered instantly.
        </p>

        <div className={styles.priceCard}>
          <div className={styles.price}>
            $39 <span className={styles.currency}>AUD</span>
          </div>

          <ul className={styles.deliverablesList}>
            <li>
              <svg className={styles.checkIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Personalised 12–18 Page PDF Toolkit</span>
            </li>
            <li>
              <svg className={styles.checkIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Genre-specific Writing Prompts</span>
            </li>
            <li>
              <svg className={styles.checkIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Custom Revision Workflows</span>
            </li>
            <li>
              <svg className={styles.checkIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Voice-preservation Techniques</span>
            </li>
          </ul>

          <button
            className={`btn-primary ${styles.ctaButton} ${isProcessing ? 'btn-disabled' : ''}`}
            onClick={handleCheckout}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing SECURE Checkout...' : 'Get Your Custom AI Toolkit'}
          </button>
        </div>
      </div>
    </main>
  );
}
