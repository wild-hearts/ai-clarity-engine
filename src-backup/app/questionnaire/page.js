"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './questionnaire.module.css';

const CATEGORIES = ["Fiction", "Non-Fiction / Self-Help"];
const WRITING_STAGES = [
    "Plotting & Planning", "First Draft", "Editing & Revisions",
    "Polishing", "Ready to Publish", "Already Published"
];

export default function Questionnaire() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        category: "Fiction",
        bookTitle: "",
        genre: "",
        writingStage: "",
        blurb: "",
        // Dynamic Fields
        protagonist: "", // Fiction
        theme: "", // Fiction
        readerProblem: "", // Non-Fiction
        framework: "", // Non-Fiction
        struggle: "" // Shared
    });
    const [isGenerating, setIsGenerating] = useState(false);

    const handleCategoryToggle = (cat) => {
        setFormData(prev => ({ ...prev, category: cat }));
    };

    const handleStageToggle = (stage) => {
        setFormData(prev => ({ ...prev, writingStage: stage }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsGenerating(true);

        // Pass the form data as query parameters to the delivery page
        const params = new URLSearchParams({
            category: formData.category,
            bookTitle: formData.bookTitle,
            genre: formData.genre,
            writingStage: formData.writingStage,
            blurb: formData.blurb,
            struggle: formData.struggle
        });

        if (formData.category === "Fiction") {
            params.append("protagonist", formData.protagonist);
            params.append("theme", formData.theme);
        } else {
            params.append("readerProblem", formData.readerProblem);
            params.append("framework", formData.framework);
        }

        router.push(`/delivery?${params.toString()}`);
    };

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Your Author's AI Toolkit</h1>
                <p className={styles.subtitle}>
                    Tell us about your book. Our engine will analyze your inputs to craft your bespoke 12–18 page AI writing companion.
                </p>
            </header>

            <div className={styles.formCard}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Book Category</label>
                        <span className={styles.helpText}>Is your book Fiction or Non-Fiction?</span>
                        <div className={styles.tagContainer}>
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => handleCategoryToggle(cat)}
                                    className={`${styles.tag} ${formData.category === cat ? styles.selected : ''}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="bookTitle">Book / Working Title</label>
                        <input
                            required
                            id="bookTitle"
                            className={styles.input}
                            type="text"
                            placeholder="e.g. The Midnight Library"
                            value={formData.bookTitle}
                            onChange={e => setFormData({ ...formData, bookTitle: e.target.value })}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="genre">Genre & Sub-genre</label>
                        <input
                            required
                            id="genre"
                            className={styles.input}
                            type="text"
                            placeholder="e.g. Fantasy Romance, Sci-Fi Thriller, Historical Fiction"
                            value={formData.genre}
                            onChange={e => setFormData({ ...formData, genre: e.target.value })}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="blurb">Target Audience / Blurb / Synopsis</label>
                        <span className={styles.helpText}>What is your book about? Who is it for? Share the core conflict or hook.</span>
                        <textarea
                            required
                            id="blurb"
                            className={styles.textarea}
                            placeholder="A young woman discovers a library between life and death where each book provides a chance to try another life she could have lived..."
                            value={formData.blurb}
                            onChange={e => setFormData({ ...formData, blurb: e.target.value })}
                        />
                    </div>

                    {formData.category === 'Fiction' ? (
                        <>
                            <div className={styles.formGroup}>
                                <label className={styles.label} htmlFor="protagonist">Protagonist Profile</label>
                                <span className={styles.helpText}>Who is the main character and what is their primary external goal or internal flaw?</span>
                                <textarea
                                    required
                                    id="protagonist"
                                    className={styles.textarea}
                                    placeholder="e.g. Nora Seed is deeply depressed and full of regrets, struggling to find meaning in her life."
                                    value={formData.protagonist}
                                    onChange={e => setFormData({ ...formData, protagonist: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label} htmlFor="theme">Core Theme</label>
                                <span className={styles.helpText}>What is the central theme or message you want the reader to take away?</span>
                                <input
                                    required
                                    id="theme"
                                    className={styles.input}
                                    type="text"
                                    placeholder="e.g. It's never too late to change your path."
                                    value={formData.theme}
                                    onChange={e => setFormData({ ...formData, theme: e.target.value })}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={styles.formGroup}>
                                <label className={styles.label} htmlFor="readerProblem">Target Reader's Problem</label>
                                <span className={styles.helpText}>What specific pain point or problem does your book solve for the reader?</span>
                                <textarea
                                    required
                                    id="readerProblem"
                                    className={styles.textarea}
                                    placeholder="e.g. Readers are feeling stuck in middle-management and need a strategy to break into executive leadership."
                                    value={formData.readerProblem}
                                    onChange={e => setFormData({ ...formData, readerProblem: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label} htmlFor="framework">Core Framework/Methodology</label>
                                <span className={styles.helpText}>What is the unique framework, theory, or methodology you are teaching?</span>
                                <textarea
                                    required
                                    id="framework"
                                    className={styles.textarea}
                                    placeholder="e.g. The 3-Step Momentum Rule: Audit, Align, and Accelerate."
                                    value={formData.framework}
                                    onChange={e => setFormData({ ...formData, framework: e.target.value })}
                                />
                            </div>
                        </>
                    )}

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="struggle">Current Biggest Struggle</label>
                        <span className={styles.helpText}>What part of the writing/editing process are you struggling with the most right now?</span>
                        <input
                            required
                            id="struggle"
                            className={styles.input}
                            type="text"
                            placeholder="e.g. Pacing, dialogue, structure, avoiding fluff."
                            value={formData.struggle}
                            onChange={e => setFormData({ ...formData, struggle: e.target.value })}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Current Writing Stage</label>
                        <span className={styles.helpText}>Select the stage that best describes where you are currently at with your manuscript.</span>
                        <div className={styles.tagContainer}>
                            {WRITING_STAGES.map(stage => (
                                <button
                                    key={stage}
                                    type="button"
                                    onClick={() => handleStageToggle(stage)}
                                    className={`${styles.tag} ${formData.writingStage === stage ? styles.selected : ''}`}
                                >
                                    {stage}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`btn-primary ${styles.submitBtn} ${isGenerating ? 'btn-disabled' : ''}`}
                        disabled={isGenerating || !formData.writingStage}
                    >
                        {isGenerating ? 'Initializing AI Engine...' : 'Generate My AI Toolkit'}
                    </button>
                </form>
            </div>
        </main>
    );
}
