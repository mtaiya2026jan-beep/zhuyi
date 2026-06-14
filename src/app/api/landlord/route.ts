import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const { name, phone, borough, units, status } = await req.json()
    const { data, error } = await supabase.from('landlords').insert({
      contact_name: name,
      contact_phone: phone,
      borough: borough || null,
      bedrooms_available: parseInt(units) || 1,
      accepts_section8: true,
      is_active: true,
      section8_experience: status || 'new',
    }).select().single()
    if (error) {
      console.error('[LANDLORD] 插入失败:', error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    console.log('[LANDLORD] 登記成功:', data?.id)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
