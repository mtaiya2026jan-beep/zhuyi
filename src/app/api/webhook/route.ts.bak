import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2026-05-27.dahlia' })
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') as string
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET as string)
  } catch (err: any) {
    return NextResponse.json({ error: 'Webhook錯誤: ' + err.message }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    console.log('[WEBHOOK] 付款成功:', session.id)
    try {
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
      const plan = session.metadata?.plan || ''
      const isAnnual = plan === 'annual_renewal'
      const now = new Date()
      const end = new Date(now.getTime() + (isAnnual?365:30)*24*60*60*1000)
      await supabase.from('subscriptions').insert({
        stripe_customer_id: session.customer as string || null,
        stripe_price_id: plan === 'paopao_monthly' ? 'price_1Thi3JC6gUPvob2xOtMB0n6f'
                       : plan === 'annual_renewal'  ? 'price_1Thi3KC6gUPvob2xsL1119G9'
                       :                              'price_1Thi3KC6gUPvob2x2IBSa9Sp',
        product_name: plan,
        amount: (session.amount_total || 0) / 100,
        currency: session.currency || 'usd',
        interval: isAnnual ? 'year' : 'month',
        status: 'active',
        current_period_start: now.toISOString(),
        current_period_end: end.toISOString(),
      })
      console.log('[WEBHOOK] subscriptions寫入成功')
    } catch (e: any) { console.error('[WEBHOOK] DB失敗:', e.message) }
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as Stripe.Subscription
    try {
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
      await supabase.from('subscriptions').update({
        status:'cancelled',
        canceled_at: new Date().toISOString()
      }).eq('stripe_customer_id', sub.customer as string)
    } catch(e:any){ console.error('[WEBHOOK] 取消失敗:', e.message) }
  }

  return NextResponse.json({ received: true })
}
