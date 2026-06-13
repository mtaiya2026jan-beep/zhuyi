import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    const { name, phone, size, borough, expiry, days, urgency } = await req.json()
    const { data, error } = await supabase.from('voucher_holders').insert({
      name, phone,
      family_size: parseInt(size),
      target_borough: borough || null,
      issue_date: new Date().toISOString().split('T')[0],
      days_remaining: days,
      priority_level: urgency,
      voucher_type: 'section8',
      status: 'searching',
    }).select().single()
    if (error) {
      console.error('[VOUCHER] 插入失敗:', error.message)
      console.log('[VOUCHER] 備份:', JSON.stringify({name,phone,size,borough,expiry,days,urgency}))
    } else {
      console.log('[VOUCHER] 登記成功:', data?.id)
    }
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
