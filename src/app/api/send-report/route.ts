import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { email, name, amiResult } = await req.json()

  const { amiPct, categoryZh, programs, message, urgency } = amiResult

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: '你的住房福利资格测算报告 - 住易 ZhuYi',
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;">
          <div style="background:#CC2B2B;padding:16px 24px;border-radius:12px 12px 0 0;">
            <h1 style="color:white;margin:0;font-size:20px;">住易 ZhuYi</h1>
            <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:13px;">纽约华人住房福利平台</p>
          </div>
          <div style="background:white;padding:24px;border:1px solid #eee;border-top:none;border-radius:0 0 12px 12px;">
            <p style="font-size:15px;color:#333;">你好${name ? ' ' + name : ''}，</p>
            <p style="font-size:14px;color:#666;line-height:1.6;">你的住房福利资格测算报告已生成：</p>
            
            <div style="background:#FFF0F0;border:2px solid #CC2B2B;border-radius:12px;padding:20px;text-align:center;margin:20px 0;">
              <p style="color:#CC2B2B;font-size:13px;margin:0 0 8px;">你家庭的AMI百分比</p>
              <p style="color:#CC2B2B;font-size:48px;font-weight:700;margin:0;">${amiPct}%</p>
              <p style="color:#CC2B2B;font-size:14px;margin:8px 0 0;">${categoryZh}家庭</p>
            </div>

            <p style="font-size:14px;color:#333;line-height:1.6;">${message}</p>

            ${programs.length > 0 ? `
            <div style="margin:16px 0;">
              <p style="font-size:13px;font-weight:500;color:#333;margin:0 0 8px;">你可以申请的项目：</p>
              ${programs.map((p: string) => `
                <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid #f0f0f0;">
                  <span style="color:#1D7A3A;">✓</span>
                  <span style="font-size:13px;color:#333;">${p}</span>
                </div>
              `).join('')}
            </div>
            ` : ''}

            <div style="background:#FFF8E6;border:1px solid #F5CC5A;border-radius:8px;padding:12px;margin:16px 0;">
              <p style="font-size:13px;color:#7A5500;margin:0;">💡 ${urgency}</p>
            </div>

            <div style="background:#FFF0F0;border:1px solid #FFCCCC;border-radius:12px;padding:20px;margin-top:20px;">
              <p style="font-size:14px;font-weight:600;color:#CC2B2B;margin:0 0 8px;">想要全程中文辅助？</p>
              <p style="font-size:13px;color:#333;line-height:1.6;margin:0 0 12px;">
                申请通 $19.9/月<br/>
                · 实时楼盘推送<br/>
                · 中签后材料辅导<br/>
                · 年审截止日期提醒
              </p>
              <a href="https://zhuyi-lyart.vercel.app" style="display:block;background:#CC2B2B;color:white;padding:12px;border-radius:8px;text-align:center;font-size:14px;font-weight:600;text-decoration:none;">
                了解更多服务 →
              </a>
            </div>

            <p style="font-size:12px;color:#999;margin-top:24px;text-align:center;">
              住易 ZhuYi · 纽约华人住房福利平台<br/>
              zhuyi-lyart.vercel.app
            </p>
          </div>
        </div>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
