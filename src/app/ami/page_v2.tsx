'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const AMI_2025 = [
  { size: 1, ami30: 29300, ami50: 48750, ami80: 78000, ami100: 97450 },
  { size: 2, ami30: 33450, ami50: 55700, ami80: 89150, ami100: 111350 },
  { size: 3, ami30: 37650, ami50: 62650, ami80: 100300, ami100: 125300 },
  { size: 4, ami30: 41800, ami50: 69600, ami80: 111350, ami100: 139200 },
  { size: 5, ami30: 45150, ami50: 75200, ami80: 120250, ami100: 150350 },
  { size: 6, ami30: 48500, ami50: 80750, ami80: 129150, ami100: 161550 },
  { size: 7, ami30: 51850, ami50: 86350, ami80: 138100, ami100: 172650 },
  { size: 8, ami30: 55200, ami50: 91900, ami80: 147000, ami100: 183750 },
]

const TIERS = [
  {
    label: '极低收入',
    range: '≤ 30% AMI',
    min: 0, max: 30,
    color: '#CC2B2B', bg: '#FFF0F0', border: '#FFCCCC',
    icon: '✅',
    programs: ['Section 8住房券（最高优先级）', 'NYCHA公共住房申请', 'Housing Connect所有楼盘'],
  },
  {
    label: '低收入',
    range: '31–50% AMI',
    min: 31, max: 50,
    color: '#E07B00', bg: '#FAEEDA', border: '#FAC775',
    icon: '✅',
    programs: ['Section 8住房券', 'Housing Connect 30–50% AMI楼盘', 'NYCHA公共住房申请'],
  },
  {
    label: '中低收入',
    range: '51–80% AMI',
    min: 51, max: 80,
    color: '#1D7A3A', bg: '#EAF3DE', border: '#C0DD97',
    icon: '✅',
    programs: ['Housing Connect 50–80% AMI楼盘', '部分Mitchell-Lama住房'],
  },
  {
    label: '中等收入',
    range: '81–120% AMI',
    min: 81, max: 120,
    color: '#854F0B', bg: '#FFF8E6', border: '#F5CC5A',
    icon: '⚠️',
    programs: ['Housing Connect 80–120% AMI楼盘（极少数）'],
  },
  {
    label: '超出限制',
    range: '> 120% AMI',
    min: 121, max: 999,
    color: '#666666', bg: '#F5F5F5', border: '#E0E0E0',
    icon: '❌',
    programs: ['不符合大多数可负担住房申请条件'],
  },
]

type Result = {
  amiPct: number
  tierIndex: number
}

function calcAMI(size: number, income: number): Result {
  const row = AMI_2025.find(r => r.size === size) || AMI_2025[3]
  const pct = Math.round((income / row.ami100) * 100)
  const tierIndex = TIERS.findIndex(t => pct >= t.min && pct <= t.max)
  return { amiPct: pct, tierIndex: tierIndex === -1 ? 4 : tierIndex }
}

export default function AMIPage() {
  const [step, setStep] = useState<'form' | 'result' | 'done'>('form')
  const [size, setSize] = useState(3)
  const [income, setIncome] = useState('')
  const [borough, setBorough] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)

  const handleCalc = () => {
    const inc = parseFloat(income.replace(/,/g, ''))
    if (!inc || inc < 0) return
    setResult(calcAMI(size, inc))
    setStep('result')
  }

  const handleSave = async () => {
    if (!email || !result) return
    setLoading(true)
    try {
      const tier = TIERS[result.tierIndex]
      await supabase.from('users').upsert({
        email, name_zh: name, borough,
        user_type: 'applicant', source: 'xiaohongshu', subscription_tier: 'free'
      }, { onConflict: 'email' })
      await supabase.from('eligibility_reports').insert({
        report_type: 'ami_check', is_paid: false, payment_amount: 0,
        ami_result: {
          ami_percentage: result.amiPct,
          ami_category: tier.label,
          household_size: size,
          annual_income: parseFloat(income.replace(/,/g, '')),
          borough,
          programs: tier.programs,
        }, email_sent: false
      })
      setStep('done')
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  const iStyle = {
    width: '100%', padding: '12px', fontSize: '15px',
    border: '1px solid #E0E0E0', borderRadius: '8px',
    outline: 'none', boxSizing: 'border-box' as const,
  }

  const activeTier = result ? TIERS[result.tierIndex] : null

  return (
    <main style={{ minHeight: '100vh', background: '#F7F6F3', fontFamily: "'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif" }}>
      <div style={{ background: '#CC2B2B', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="/" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', textDecoration: 'none' }}>← 首页</a>
          <div style={{ color: 'white', fontSize: '20px', fontWeight: '700' }}>住易 ZhuYi</div>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>AMI资格测算</div>
      </div>

      <div style={{ maxWidth: '520px', margin: '0 auto', padding: '24px 16px' }}>

        {/* 表单 */}
        {step === 'form' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 8px' }}>
              1分钟测算你家的住房福利资格
            </h1>
            <p style={{ fontSize: '14px', color: '#666', margin: '0 0 24px', lineHeight: '1.6' }}>
              根据2025年纽约市最新AMI收入线，免费测算是否符合Section 8或Housing Connect申请条件
            </p>

            <label style={{ fontSize: '14px', fontWeight: '500', color: '#333', display: 'block', marginBottom: '8px' }}>家庭人口数（含本人）</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {[1,2,3,4,5,6,7,8].map(n => (
                <button key={n} onClick={() => setSize(n)} style={{
                  width: '48px', height: '48px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px',
                  border: size === n ? '2px solid #CC2B2B' : '1px solid #E0E0E0',
                  background: size === n ? '#FFF0F0' : 'white',
                  color: size === n ? '#CC2B2B' : '#333',
                  fontWeight: size === n ? '600' : '400',
                }}>{n}</button>
              ))}
            </div>

            <label style={{ fontSize: '14px', fontWeight: '500', color: '#333', display: 'block', marginBottom: '8px' }}>家庭年总收入（美元，税前）</label>
            <div style={{ position: 'relative', marginBottom: '6px' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', color: '#666' }}>$</span>
              <input type="number" placeholder="例如：45000" value={income} onChange={e => setIncome(e.target.value)}
                style={{ ...iStyle, paddingLeft: '28px' }} />
            </div>
            <p style={{ fontSize: '12px', color: '#999', margin: '0 0 20px' }}>包括工资、自雇、现金收入、福利金等所有来源</p>

            <label style={{ fontSize: '14px', fontWeight: '500', color: '#333', display: 'block', marginBottom: '8px' }}>目前居住区域</label>
            <select value={borough} onChange={e => setBorough(e.target.value)}
              style={{ ...iStyle, background: 'white', marginBottom: '24px' }}>
              <option value="">请选择</option>
              <option value="Queens">皇后区 Queens（法拉盛）</option>
              <option value="Brooklyn">布鲁克林 Brooklyn（日落公园）</option>
              <option value="Manhattan">曼哈顿 Manhattan（唐人街）</option>
              <option value="Bronx">布朗克斯 Bronx</option>
              <option value="Staten Island">史坦顿岛 Staten Island</option>
            </select>

            <button onClick={handleCalc} disabled={!income || !borough} style={{
              width: '100%', padding: '16px', fontSize: '16px', fontWeight: '600',
              background: (!income || !borough) ? '#E0E0E0' : '#CC2B2B',
              color: 'white', border: 'none', borderRadius: '12px',
              cursor: (!income || !borough) ? 'not-allowed' : 'pointer',
            }}>立即测算我家的资格 →</button>
            <p style={{ fontSize: '12px', color: '#999', textAlign: 'center', marginTop: '12px' }}>
              数据来源：HUD 2025年纽约市AMI收入线 · 完全免费
            </p>
          </div>
        )}

        {/* 结果页 */}
        {step === 'result' && result && activeTier && (
          <div>
            {/* 你的AMI数字 */}
            <div style={{
              background: activeTier.bg, border: `2px solid ${activeTier.border}`,
              borderRadius: '16px', padding: '24px', marginBottom: '16px',
              textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}>
              <p style={{ fontSize: '13px', color: activeTier.color, fontWeight: '500', margin: '0 0 4px' }}>你家庭的AMI百分比</p>
              <div style={{ fontSize: '64px', fontWeight: '700', color: activeTier.color, lineHeight: '1' }}>{result.amiPct}%</div>
              <div style={{ marginTop: '12px', display: 'inline-block', background: activeTier.color, color: 'white', padding: '6px 18px', borderRadius: '20px', fontSize: '14px', fontWeight: '600' }}>
                {activeTier.icon} {activeTier.label}
              </div>
            </div>

            {/* 可视化档位对照 */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#333', margin: '0 0 14px' }}>资格档位对照</p>
              {TIERS.map((tier, i) => {
                const isMe = i === result.tierIndex
                return (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '10px',
                    padding: '12px', borderRadius: '10px', marginBottom: '8px',
                    background: isMe ? tier.bg : 'transparent',
                    border: isMe ? `2px solid ${tier.border}` : '1.5px solid #F0F0F0',
                    transition: 'all 0.1s',
                  }}>
                    {/* 左侧指示 */}
                    <div style={{ flexShrink: 0, paddingTop: '2px' }}>
                      {isMe ? (
                        <div style={{
                          width: '28px', height: '28px', borderRadius: '50%',
                          background: tier.color, color: 'white',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '12px', fontWeight: '700',
                        }}>我</div>
                      ) : (
                        <div style={{
                          width: '28px', height: '28px', borderRadius: '50%',
                          background: '#F5F5F5',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '14px',
                        }}>{tier.icon}</div>
                      )}
                    </div>

                    {/* 内容 */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '13px', fontWeight: isMe ? '700' : '500', color: isMe ? tier.color : '#333' }}>
                          {tier.label}
                        </span>
                        <span style={{ fontSize: '11px', color: isMe ? tier.color : '#999', fontWeight: isMe ? '600' : '400' }}>
                          {tier.range}
                        </span>
                        {isMe && (
                          <span style={{ fontSize: '11px', background: tier.color, color: 'white', padding: '1px 7px', borderRadius: '10px', fontWeight: '600' }}>
                            你在这里
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '12px', color: isMe ? tier.color : '#999', lineHeight: '1.6' }}>
                        {tier.programs.join(' · ')}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* 行动建议 */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#333', margin: '0 0 10px' }}>💡 你现在应该做什么</p>
              {activeTier.tierIndex <= 1 && (
                <p style={{ fontSize: '13px', color: '#333', lineHeight: '1.7', margin: '0' }}>
                  你的收入符合Section 8和大多数Housing Connect楼盘。<br />
                  ① 立即注册Housing Connect账号开始投递申请<br />
                  ② 同步申请NYCHA公共住房等候名单<br />
                  ③ 留下邮箱，我们帮你追踪符合条件的楼盘开放时间
                </p>
              )}
              {activeTier && result.tierIndex === 2 && (
                <p style={{ fontSize: '13px', color: '#333', lineHeight: '1.7', margin: '0' }}>
                  你的收入符合Housing Connect中等价位楼盘，但不符合Section 8。<br />
                  ① 在Housing Connect筛选50–80% AMI楼盘投递申请<br />
                  ② 留下邮箱，我们推送符合你条件的楼盘
                </p>
              )}
              {activeTier && result.tierIndex === 3 && (
                <p style={{ fontSize: '13px', color: '#333', lineHeight: '1.7', margin: '0' }}>
                  符合条件的楼盘较少，但仍有机会。<br />
                  ① 重点关注Housing Connect 80–120% AMI楼盘<br />
                  ② 了解Mitchell-Lama中等收入住房项目
                </p>
              )}
              {activeTier && result.tierIndex === 4 && (
                <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.7', margin: '0' }}>
                  你的收入超出大多数可负担住房项目的限制。<br />
                  如果家庭收入有变化，可以重新测算。
                </p>
              )}
            </div>

            {/* 留资 */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <h2 style={{ fontSize: '17px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 8px' }}>保存报告到邮箱</h2>
              <p style={{ fontSize: '13px', color: '#666', margin: '0 0 16px', lineHeight: '1.6' }}>
                留下邮箱，我们帮你追踪符合条件的楼盘开放时间，完全免费。
              </p>
              <input type="text" placeholder="你的姓名（选填）" value={name} onChange={e => setName(e.target.value)}
                style={{ ...iStyle, marginBottom: '12px' }} />
              <input type="email" placeholder="你的邮箱地址" value={email} onChange={e => setEmail(e.target.value)}
                style={{ ...iStyle, marginBottom: '16px' }} />
              <button onClick={handleSave} disabled={!email || loading} style={{
                width: '100%', padding: '14px', fontSize: '15px', fontWeight: '600',
                background: !email ? '#E0E0E0' : '#CC2B2B',
                color: 'white', border: 'none', borderRadius: '12px',
                cursor: !email ? 'not-allowed' : 'pointer', marginBottom: '12px',
              }}>
                {loading ? '保存中...' : '免费发送到我的邮箱 →'}
              </button>
              <button onClick={() => setStep('form')} style={{
                width: '100%', padding: '12px', background: 'transparent', color: '#999',
                border: '1px solid #E0E0E0', borderRadius: '12px', fontSize: '14px', cursor: 'pointer',
              }}>重新测算</button>
            </div>
          </div>
        )}

        {/* 完成 */}
        {step === 'done' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '32px 24px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 12px' }}>报告已保存</h2>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: '0 0 24px' }}>
              我们会通过邮件通知你符合条件的楼盘开放时间。
            </p>
            <div style={{ background: '#FFF0F0', border: '1px solid #FFCCCC', borderRadius: '12px', padding: '20px', marginBottom: '20px', textAlign: 'left' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#CC2B2B', margin: '0 0 8px' }}>申请通 $19.9/月</p>
              <p style={{ fontSize: '13px', color: '#333', lineHeight: '1.6', margin: '0' }}>
                · 实时楼盘推送（按你的AMI自动匹配）<br />
                · 中签后材料辅导<br />
                · 年审截止日期提醒
              </p>
            </div>
            <button onClick={() => { setStep('form'); setIncome(''); setEmail(''); setName('') }}
              style={{ background: 'transparent', color: '#999', border: 'none', fontSize: '14px', cursor: 'pointer' }}>
              帮其他家庭测算
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
