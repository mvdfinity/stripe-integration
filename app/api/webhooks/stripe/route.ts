import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/modules/stripe';
import { dbOperations } from '@/modules/database';
import { headers } from 'next/headers';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    console.log('Received webhook event:', event.type);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;

        if (session.payment_status === 'paid') {
          try {
            const purchase = dbOperations.createPurchase({
              stripe_session_id: session.id,
              stripe_payment_intent_id: session.payment_intent as string,
              customer_email: session.customer_details?.email || '',
              template_id: session.metadata?.templateId || '',
              template_name: session.line_items?.data?.[0]?.description || '',
              amount: session.amount_total || 0,
              currency: session.currency || 'usd',
              status: 'completed'
            });
            console.log('Purchase stored:', purchase.lastInsertRowid);
          } catch (dbError) {
            console.error('Database error:', dbError);
          }
        }
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;

        if (paymentIntent.metadata?.sessionId) {
          try {
            dbOperations.updatePurchase(
              paymentIntent.metadata.sessionId,
              'completed',
              paymentIntent.id
            );
          } catch (dbError) {
            console.error('Database update error:', dbError);
          }
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;

        if (paymentIntent.metadata?.sessionId) {
          try {
            dbOperations.updatePurchase(
              paymentIntent.metadata.sessionId,
              'failed',
              paymentIntent.id
            );
          } catch (dbError) {
            console.error('Database update error:', dbError);
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
