import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize stripe with a dummy key if env var is missing during build/demo
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2023-10-16',
});

export async function POST(req) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: "Author's AI Toolkit",
              description: 'Personalised 12-18 page AI writing companion.',
            },
            unit_amount: 3900, // $39.00 AUD
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/questionnaire?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    });

    // Return the Stripe session URL for the frontend to redirect to
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe Error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
