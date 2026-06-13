import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const PLANS = {
  paopao_monthly: { price_id: 'price_1Thi3JC6gUPvob2xOtMB0n6f', mode: 'subscription' as const },
  annual_renewal: { price_id: 'price_1Thi3KC6gUPvob2xsL1119G9', mode: 'subscription' as const },
  matching:       { price_id: 'price_1Thi3KC6gUPvob2x2IBSa9Sp', mode: 'payment' as const },
}

export async function POST(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2026-05-27.dahlia' })
    const { plan } = await req.json()
    const p = PLANS[plan as keyof typeof PLANS]
    if (!p) return NextResponse.json({ error: '無效的方案' }, { status: 400 })
    const origin = req.headers.get('origin') || 'https://zhuyi-lyart.vercel.app'
    const session = await stripe.checkout.sessions.create({
      mode: p.mode,
      line_items: [{ price: p.price_id, quantity: 1 }],
      success_url: origin + '/payment/success?session_id={CHECKOUT_SESSION_ID}&plan=' + plan,
      cancel_url: origin + '/paopao',
      locale: 'zh',
      allow_promotion_codes: true,
    })
    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
