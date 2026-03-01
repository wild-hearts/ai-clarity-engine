"use client";

import { useState } from 'react';
import styles from './landing.module.css';

const TOOLKIT_FEATURES = [
  {
    icon: "🎯",
    title: "Genre-Specific AI Analysis",
    desc: "Deep dive into your genre's tropes, reader expectations, and how your theme fits — tailored to your actual book."
  },
  {
    icon: "✍️",
    title: "20+ Personalised Copy-Paste Prompts",
    desc: "Every prompt references your characters, your plot, your genre. Fill nothing in — just paste and go."
  },
  {
    icon: "🔧",
    title: "Custom Revision Workflow",
    desc: "Based on your writing stage and biggest struggle, not a generic checklist that applies to everyone."
  },
  {
    icon: "🛡️",
    title: "Voice Preservation Techniques",
    desc: "Specific methods to stop AI from flattening your style. Your voice stays yours."
  },
  {
    icon: "📣",
    title: "Marketing Starter Kit",
    desc: "Blurb drafts, social media hooks, and launch prompts — all written around your actual book."
  },
  {
    icon: "⚡",
    title: "24-Hour Action Plan",
    desc: "Not a 30-day roadmap. A single-day plan to get AI working in your writing workflow today."
  }
];

const FAQS = [
  {
    q: "Will this work for my genre?",
    a: "Yes. You tell us your genre, sub-genre, and book details during the questionnaire. Every section of your toolkit is generated specifically for your genre's conventions, reader expectations, and tropes."
  },
  {
    q: "What AI tools do I need?",
    a: "A free account with Claude (claude.ai) or ChatGPT (chat.openai.com) is enough to start. The toolkit includes prompts that work with any major AI tool — no expensive subscriptions required."
  },
  {
    q: "Is this AI writing my book for me?",
    a: "No. This toolkit teaches you how to use AI as an editorial partner, brainstorming tool, and marketing assistant. Your voice, your story, your words. AI is the tool — you're the author."
  },
  {
    q: "How is this different from free AI prompts online?",
    a: "Free prompts are generic. They don't know your book, your characters, your genre, or your stage. Every prompt in your toolkit directly references your manuscript details — that's why they actually work."
  },
  {
    q: "What do I actually get?",
    a: "A professionally formatted PDF (12-18 pages) generated instantly after you complete a short questionnaire about your book. It includes personalised prompts, workflows, marketing copy, and an action plan — all specific to your project."
  }
];

export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleCheckout = async (tier) => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/checkout', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier })
      });
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

  const scrollToPrice = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.blob1}></div>
        <div className={styles.blob2}></div>

        <div className={`${styles.heroContent} animate-fade-in`}>
          <div className={styles.badge}>For Authors &amp; Writers</div>

          <h1 className={styles.title}>
            Stop Guessing.<br />
            <span className={styles.titleHighlight}>Start Using AI Like an Author Who's Done It.</span>
          </h1>

          <p className={styles.subtitle}>
            Get a bespoke AI toolkit built around <em>your</em> book, <em>your</em> genre, and <em>your</em> stage — with personalised prompts, revision workflows, and voice-preservation techniques. Delivered instantly as a PDF.
          </p>

          <button className="btn-primary" onClick={scrollToPrice} style={{ padding: '1.25rem 3rem', fontSize: '1.125rem' }}>
            Get Your Toolkit — From $19 AUD
          </button>

          <p className={styles.trustLine}>
            Built from 14 published books &amp; thousands of hours with AI tools.
          </p>
        </div>
      </section>

      {/* ===== THE PROBLEM ===== */}
      <section className={styles.problemSection}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>Sound Familiar?</h2>
          <div className={styles.problemGrid}>
            <div className={styles.problemCard}>
              <p>You've tried AI but got back generic, surface-level feedback that could apply to literally any book.</p>
            </div>
            <div className={styles.problemCard}>
              <p>You're not sure which AI tools are worth paying for — or if any of them actually help with writing.</p>
            </div>
            <div className={styles.problemCard}>
              <p>You're worried AI will flatten your voice and make your writing sound like everyone else's.</p>
            </div>
            <div className={styles.problemCard}>
              <p>Every "AI for writers" guide is written by a developer who's never published a chapter.</p>
            </div>
          </div>
          <p className={styles.problemPunchline}>
            The problem isn't AI. It's that nobody's shown you how to use it <em>for your book</em>.
          </p>
        </div>
      </section>

      {/* ===== WHAT'S INSIDE ===== */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>What's In Your Toolkit</h2>
          <p className={styles.sectionSubtitle}>
            Every section is generated from your questionnaire answers. Nothing generic. Nothing recycled.
          </p>
          <div className={styles.featuresGrid}>
            {TOOLKIT_FEATURES.map((f, i) => (
              <div key={i} className={styles.featureCard}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className={styles.howSection}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>1</div>
              <h3 className={styles.stepTitle}>Purchase</h3>
              <p className={styles.stepDesc}>Secure checkout via Stripe. One payment, no subscription.</p>
            </div>
            <div className={styles.stepArrow}>→</div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>2</div>
              <h3 className={styles.stepTitle}>Tell Us About Your Book</h3>
              <p className={styles.stepDesc}>Short questionnaire — genre, stage, characters, and what you're struggling with.</p>
            </div>
            <div className={styles.stepArrow}>→</div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>3</div>
              <h3 className={styles.stepTitle}>Download Your Toolkit</h3>
              <p className={styles.stepDesc}>Your bespoke PDF is generated in under 60 seconds. Download and start immediately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CREDIBILITY ===== */}
      <section className={styles.credSection}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>Built by an Author, Not a Tech Bro</h2>
          <div className={styles.credContent}>
            <p>
              This toolkit was created by an author who's published 14 books, built a publishing platform with 21 AI editors across 4 providers, and spends real money every month on AI tools — not to experiment with, but to actually ship books.
            </p>
            <p>
              Former lawyer. Analytical by training. Everything in this toolkit comes from testing what works, cutting what doesn't, and refusing to accept "good enough" from AI output.
            </p>
            <div className={styles.credStats}>
              <div className={styles.credStat}>
                <span className={styles.credNumber}>14</span>
                <span className={styles.credLabel}>Books Published</span>
              </div>
              <div className={styles.credStat}>
                <span className={styles.credNumber}>21</span>
                <span className={styles.credLabel}>AI Editors Built</span>
              </div>
              <div className={styles.credStat}>
                <span className={styles.credNumber}>4</span>
                <span className={styles.credLabel}>AI Providers Tested</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHO THIS IS FOR ===== */}
      <section className={styles.audienceSection}>
        <div className={styles.sectionInner}>
          <div className={styles.audienceGrid}>
            <div className={styles.audienceCard}>
              <h3 className={styles.audienceTitle}>This Is For You If:</h3>
              <ul className={styles.audienceList}>
                <li>You're writing a book and want AI to make the process faster and better</li>
                <li>You've tried AI prompts that gave you useless, generic responses</li>
                <li>You want to keep your voice while getting real editorial feedback</li>
                <li>You need help with marketing, blurbs, or launch content</li>
                <li>You're at any stage — plotting, drafting, editing, or published</li>
              </ul>
            </div>
            <div className={`${styles.audienceCard} ${styles.audienceCardNot}`}>
              <h3 className={styles.audienceTitle}>This Is NOT For You If:</h3>
              <ul className={styles.audienceList}>
                <li>You want AI to write your book for you</li>
                <li>You're looking for a course or video program</li>
                <li>You don't have a book idea or manuscript in progress</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className={styles.pricingSection} id="pricing">
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>Choose Your Toolkit</h2>
          <p className={styles.sectionSubtitle}>
            Both options teach you the 4-D prompting method. The difference is whether you fill in the blanks or we do it for you.
          </p>

          <div className={styles.pricingGrid}>
            {/* UNIVERSAL TIER */}
            <div className={styles.priceCard}>
              <div className={styles.tierLabel}>The Prompt Vault</div>
              <div className={styles.price}>
                $19 <span className={styles.currency}>AUD</span>
              </div>
              <p className={styles.priceOnce}>One-time payment</p>

              <ul className={styles.deliverablesList}>
                {[
                  "100+ Copy-Paste AI Prompts (fill in the brackets)",
                  "The 4-D Prompting Framework",
                  "Revision Workflow Templates",
                  "Voice-Preservation Techniques",
                  "Marketing Prompt Templates",
                  "24-Hour AI Action Plan",
                  "Works for Any Genre or Stage"
                ].map((item, i) => (
                  <li key={i}>
                    <svg className={styles.checkIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`btn-primary ${styles.ctaButton} ${styles.ctaSecondary} ${isProcessing ? 'btn-disabled' : ''}`}
                onClick={() => handleCheckout('universal')}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Get The Prompt Vault'}
              </button>

              <p className={styles.guarantee}>Instant PDF download</p>
            </div>

            {/* PERSONALISED TIER */}
            <div className={`${styles.priceCard} ${styles.priceCardFeatured}`}>
              <div className={styles.featuredBadge}>Most Popular</div>
              <div className={styles.tierLabel}>Your Bespoke Toolkit</div>
              <div className={styles.price}>
                $49 <span className={styles.currency}>AUD</span>
              </div>
              <p className={styles.priceOnce}>One-time payment</p>

              <ul className={styles.deliverablesList}>
                {[
                  "20+ Prompts Written for YOUR Book",
                  "Genre-Specific Analysis of Your Manuscript",
                  "The 4-D Prompting Framework",
                  "Custom Revision Workflow for Your Struggle",
                  "Voice-Preservation for Your Style",
                  "Marketing Kit (Blurbs, Social, Launch — for Your Book)",
                  "Personalised 24-Hour Action Plan"
                ].map((item, i) => (
                  <li key={i}>
                    <svg className={styles.checkIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`btn-primary ${styles.ctaButton} ${isProcessing ? 'btn-disabled' : ''}`}
                onClick={() => handleCheckout('personalised')}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Get Your Bespoke Toolkit'}
              </button>

              <p className={styles.guarantee}>Short questionnaire → AI-generated in 60 seconds</p>
            </div>
          </div>

          <p className={styles.pricingFootnote}>
            Powered by Stripe. Secure payment. Both options delivered instantly.
          </p>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className={styles.faqSection}>
        <div className={styles.sectionInner}>
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
                {openFaq === i && (
                  <div className={styles.faqAnswer}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className={styles.footer}>
        <div className={styles.sectionInner}>
          <p className={styles.footerText}>
            Author's AI Toolkit — A{' '}
            <a href="https://wildheartspublishing.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
              Wild Hearts Publishing
            </a>{' '}
            Product
          </p>
        </div>
      </footer>
    </main>
  );
}
