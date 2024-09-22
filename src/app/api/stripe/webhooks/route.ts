import { NextRequest } from 'next/server'

import Stripe from 'stripe'

import { prisma } from '@/services/database'
import { stripe } from '@/services/stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature || '',
      process.env.STRIPE_WEBHOOK_SECRET as string
    )
  } catch (error: any) {
    console.error(`Webhook Error: ${error.message}`)
    return new Response(`Webhook Error: ${error.message}`, { status: 400 })
  }

  switch (event.type) {
    case "customer.created":
      await prisma.client.create({
        data: {
          stripeId: event.data.object.id,
          name: event.data.object.name as string,
          email: event.data.object.email as string
        }
      })
      break

    case "payment_intent.succeeded":
      await prisma.client.update({
        where: {
          stripeId: event.data.object.customer as string
        },
        data: {
          amount: event.data.object.amount / 100,
          currency: event.data.object.currency
        }
      })
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 })
}
