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
      await supabase.from('subscriptions').insert({
        stripe_session_id: session.id,
        stripe_customer_id: session.customer as string || null,
        plan,
        amount: session.amount_total || 0,
        status: 'active',
        customer_email: session.customer_details?.email || null,
        customer_name: session.customer_details?.name || null,
        period_end: new Date(Date.now() + (isAnnual?365:30)*24*60*60*1000).toISOString(),
      })
      console.log('[WEBHOOK] subscriptions寫入成功')
    } catch (e: any) {
      console.error('[WEBHOOK] DB失敗:', e.message)
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as Stripe.Subscription
    try {
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
      await supabase.from('subscriptions').update({status:'cancelled'}).eq('stripe_customer_id', sub.customer as string)
    } catch(e:any){ console.error('[WEBHOOK] 取消更新失敗:', e.message) }
  }

  return NextResponse.json({ received: true })
}
