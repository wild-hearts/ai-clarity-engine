import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2023-10-16',
});

const TIERS = {
  universal: {
    name: "The Prompt Vault — Author's AI Toolkit",
    description: '100+ copy-paste AI prompts, 4-D prompting framework, revision workflows, marketing templates, and 24-hour action plan.',
    amount: 1900, // $19.00 AUD
    successPath: '/delivery?tier=universal',
  },
  personalised: {
    name: "Your Bespoke Toolkit — Author's AI Toolkit",
    description: 'Personalised AI toolkit with 20+ prompts written for your book, genre-specific analysis, custom revision workflow, and marketing starter kit.',
    amount: 4900, // $49.00 AUD
    successPath: '/questionnaire',
  },
  // ── Workflow product pages ──────────────────────────────────
  'ai-toolkit': {
    name: "Author AI Toolkit",
    description: 'Planning, drafting, and revision prompts plus ethical guardrails and a 60-minute quick-start path. PDF guide + copy-paste prompt sheets.',
    amount: 4700, // $47.00 AUD
    successPath: '/delivery?tier=ai-toolkit',
  },
  'self-publishing': {
    name: "Self-Publishing Flow",
    description: 'End-to-end self-publishing checklist, budget planner, platform matrix, metadata workbook, and file upload checklists.',
    amount: 9700, // $97.00 AUD
    successPath: '/delivery?tier=self-publishing',
  },
  'marketing-kit': {
    name: "Marketing Flow Kit",
    description: 'Six-month timeline, ARC system, email sequences, social content pillars, launch calendar, and the 2026 AEO Blueprint.',
    amount: 9700, // $97.00 AUD
    successPath: '/delivery?tier=marketing-kit',
  },
  'full-journey': {
    name: "The Full Author Journey Bundle",
    description: 'All four workflow kits — AI Toolkit, Editing Flow, Self-Publishing Flow, and Marketing & AEO Kit — plus lifetime access to all future workflow updates.',
    amount: 19700, // $197.00 AUD
    successPath: '/delivery?tier=full-journey',
  },
};

export async function POST(req) {
  try {
    const body = await req.json();
    const tier = TIERS[body.tier] || TIERS.personalised;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: tier.name,
              description: tier.description,
            },
            unit_amount: tier.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}${tier.successPath}${tier.successPath.includes('?') ? '&' : '?'}session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe Error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
