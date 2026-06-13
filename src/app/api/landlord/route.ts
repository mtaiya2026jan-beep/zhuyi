import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    const body = await req.json()
    console.log('[LANDLORD] 登記數據:', JSON.stringify(body))
    const { data, error } = await supabase.from('landlords').insert({
      contact_name: body.name,
      contact_phone: body.phone,
      borough: body.borough,
      total_units: body.units,
      registration_status: body.status,
      accepts_section8: true,
    }).select().single()
    if (error) console.error('[LANDLORD] 插入失敗:', error.message)
    else console.log('[LANDLORD] 登記成功:', data?.id)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
