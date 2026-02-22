"use client";

import Link from 'next/link';
import { useState } from 'react';
import styles from './landing.module.css';

export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = () => {
    setIsProcessing(true);
    // In actual implementation, this would call our Stripe API route.
    // For now, we simulate a redirect to the questionnaire.
    setTimeout(() => {
      window.location.href = '/questionnaire';
    }, 800);
  };

  return (
    <main className={styles.hero}>
      {/* Background aesthetics */}
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>

      <div className={`${styles.heroContent} animate-fade-in`}>
        <div className={styles.badge}>
          For Entrepreneurs & Small Business Owners
        </div>

        <h1 className={styles.title}>
          AI Clarity Engine<br />
          <span className={styles.titleHighlight}>Without the Session</span>
        </h1>

        <p className={styles.subtitle}>
          Stop feeling overwhelmed by Artificial Intelligence. Get a completely bespoke, 15-20 page AI integration strategy tailored to your exact business—delivered in minutes.
        </p>

        <div className={styles.priceCard}>
          <div className={styles.price}>
            $67 <span className={styles.currency}>AUD</span>
          </div>

          <ul className={styles.deliverablesList}>
            <li>
              <svg className={styles.checkIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Personalised 15-20 Page Strategy PDF</span>
            </li>
            <li>
              <svg className={styles.checkIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Custom-built AI Tool Recommendations</span>
            </li>
            <li>
              <svg className={styles.checkIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Bespoke Prompt Kit for Your Tasks</span>
            </li>
            <li>
              <svg className={styles.checkIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Immediate Automated Delivery</span>
            </li>
          </ul>

          <button
            className={`btn-primary ${styles.ctaButton} ${isProcessing ? 'btn-disabled' : ''}`}
            onClick={handleCheckout}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing SECURE Checkout...' : 'Get Your Custom AI Strategy'}
          </button>
        </div>
      </div>
    </main>
  );
}
