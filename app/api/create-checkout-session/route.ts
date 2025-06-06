import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/modules/stripe';

export async function POST(request: NextRequest) {
  try {
    const { templateId, templateName, price } = await request.json();

    if (!templateId || !templateName || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: undefined, // Let customer enter email
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: templateName,
              description: `Project template: ${templateName}`,
              metadata: {
                templateId: templateId,
              },
            },
            unit_amount: price * 100, // Stripe expects amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.nextUrl.origin}/store/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/store`,
      metadata: {
        templateId: templateId,
      },
      // Collect customer email
      customer_creation: 'always',
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
