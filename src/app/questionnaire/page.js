"use client";

import { useState } from 'react';
import styles from './questionnaire.module.css';

const COMMON_TOOLS = [
    "Notion", "Slack", "Google Workspace", "Microsoft 365",
    "HubSpot", "Salesforce", "Asana", "Trello", "QuickBooks", "Shopify"
];

export default function Questionnaire() {
    const [formData, setFormData] = useState({
        businessName: "",
        industry: "",
        businessContext: "",
        painPoints: "",
        techStack: []
    });
    const [isGenerating, setIsGenerating] = useState(false);

    const handleToolToggle = (tool) => {
        setFormData(prev => {
            const isSelected = prev.techStack.includes(tool);
            if (isSelected) {
                return { ...prev, techStack: prev.techStack.filter(t => t !== tool) };
            } else {
                return { ...prev, techStack: [...prev.techStack, tool] };
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsGenerating(true);
        // In actual implementation, we'd POST this to our /api/generate route.
        // For now, simulate redirecting to the delivery page
        setTimeout(() => {
            window.location.href = '/delivery';
        }, 1500);
    };

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Your AI Strategy Session</h1>
                <p className={styles.subtitle}>
                    Tell us about your business. Our engine will analyze your inputs to craft your bespoke 15-20 page integration strategy.
                </p>
            </header>

            <div className={styles.formCard}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="businessName">Business Name</label>
                        <input
                            required
                            id="businessName"
                            className={styles.input}
                            type="text"
                            placeholder="e.g. Wild Hearts Publishing"
                            value={formData.businessName}
                            onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="industry">Industry / Niche</label>
                        <input
                            required
                            id="industry"
                            className={styles.input}
                            type="text"
                            placeholder="e.g. Digital Marketing, Book Publishing, E-commerce"
                            value={formData.industry}
                            onChange={e => setFormData({ ...formData, industry: e.target.value })}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="context">Business Context</label>
                        <span className={styles.helpText}>What does your business do? How is your team structured? How do you currently make money?</span>
                        <textarea
                            required
                            id="context"
                            className={styles.textarea}
                            placeholder="We are a team of 3 helping indie authors publish and market their books..."
                            value={formData.businessContext}
                            onChange={e => setFormData({ ...formData, businessContext: e.target.value })}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="painPoints">Current Bottlenecks & Pain Points</label>
                        <span className={styles.helpText}>Where are you losing time? What processes feel manual or repetitive?</span>
                        <textarea
                            required
                            id="painPoints"
                            className={styles.textarea}
                            placeholder="We spend hours drafting marketing emails, formatting manuscripts, and managing social media..."
                            value={formData.painPoints}
                            onChange={e => setFormData({ ...formData, painPoints: e.target.value })}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Current Tech Stack</label>
                        <span className={styles.helpText}>Select the software you currently use (this helps us recommend integrations).</span>
                        <div className={styles.tagContainer}>
                            {COMMON_TOOLS.map(tool => (
                                <button
                                    key={tool}
                                    type="button"
                                    onClick={() => handleToolToggle(tool)}
                                    className={`${styles.tag} ${formData.techStack.includes(tool) ? styles.selected : ''}`}
                                >
                                    {tool}
                                </button>
                            ))}
                        </div>
                        <input
                            className={styles.input}
                            style={{ marginTop: '1rem' }}
                            type="text"
                            placeholder="Other tools (comma separated)..."
                        />
                    </div>

                    <button
                        type="submit"
                        className={`btn-primary ${styles.submitBtn} ${isGenerating ? 'btn-disabled' : ''}`}
                        disabled={isGenerating}
                    >
                        {isGenerating ? 'Initializing AI Engine...' : 'Generate My AI Strategy'}
                    </button>
                </form>
            </div>
        </main>
    );
}
