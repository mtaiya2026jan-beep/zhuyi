'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const AMI_2025 = [
  { size: 1, ami30: 29300, ami50: 48750, ami80: 78000, ami100: 97450, ami120: 116940 },
  { size: 2, ami30: 33450, ami50: 55700, ami80: 89150, ami100: 111350, ami120: 133620 },
  { size: 3, ami30: 37650, ami50: 62650, ami80: 100300, ami100: 125300, ami120: 150360 },
  { size: 4, ami30: 41800, ami50: 69600, ami80: 111350, ami100: 139200, ami120: 167040 },
  { size: 5, ami30: 45150, ami50: 75200, ami80: 120250, ami100: 150350, ami120: 180420 },
  { size: 6, ami30: 48500, ami50: 80750, ami80: 129150, ami100: 161550, ami120: 193860 },
  { size: 7, ami30: 51850, ami50: 86350, ami80: 138100, ami100: 172650, ami120: 207180 },
  { size: 8, ami30: 55200, ami50: 91900, ami80: 147000, ami100: 183750, ami120: 220500 },
]

type Result = {
  amiPct: number
  category: string
  categoryZh: string
  color: string
  programs: string[]
  message: string
  urgency: string
}

function calcAMI(size: number, income: number): Result {
  const row = AMI_2025.find(r => r.size === size) || AMI_2025[3]
  const pct = Math.round((income / row.ami100) * 100)

  if (income <= row.ami30) {
    return {
      amiPct: pct, category: 'extremely_low', categoryZh: '极低收入',
      color: '#CC2B2B',
      programs: ['Section 8住房券（最高优先级）', 'NYCHA公共住房', 'Housing Connect 30% AMI楼盘'],
      message: '你家庭符合纽约市最高级别住房援助资格，可申请项目最多。',
      urgency: '立即申请Section 8等候名单（目前暂停，需持续关注开放通知）'
    }
  } else if (income <= row.ami50) {
    return {
      amiPct: pct, category: 'very_low', categoryZh: '低收入',
      color: '#E07B00',
      programs: ['Section 8住房券', 'Housing Connect 30-50% AMI楼盘', 'NYCHA公共住房'],
      message: '你家庭符合Section 8和大多数可负担住房项目的申请资格。',
      urgency: '建议立即注册Housing Connect账户，开始投递符合条件的楼盘'
    }
  } else if (income <= row.ami80) {
    return {
      amiPct: pct, category: 'low', categoryZh: '中低收入',
      color: '#1D7A3A',
      programs: ['Housing Connect 50-80% AMI楼盘', '部分Mitchell-Lama住房', '中等收入可负担住房'],
      message: '你家庭符合Housing Connect中等优先级楼盘的申请资格。',
      urgency: '关注Housing Connect每周新开放楼盘，持续投递申请'
    }
  } else if (income <= row.ami120) {
    return {
      amiPct: pct, category: 'moderate', categoryZh: '中等收入',
      color: '#185FA5',
      programs: ['Housing Connect 80-120% AMI楼盘', '中等收入住房项目'],
      message: '你家庭符合中等收入可负担住房项目，符合条件的楼盘较少但仍有机会。',
      urgency: '重点关注80-120% AMI的楼盘，这类竞争相对较少'
    }
  } else {
    return {
      amiPct: pct, category: 'above', categoryZh: '超出限制',
      color: '#666666',
      programs: [],
      message: '你家庭收入超出大多数可负担住房项目的收入限制。',
      urgency: '可以了解Mitchell-Lama或其他市场价住房项目'
    }
  }
}

export default function Home() {
  const [step, setStep] = useState<'form' | 'result' | 'lead'>('form')
  const [size, setSize] = useState(3)
  const [income, setIncome] = useState('')
  const [borough, setBorough] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleCalc = () => {
    const inc = parseFloat(income.replace(/,/g, ''))
    if (!inc || inc < 0) return
    const r = calcAMI(size, inc)
    setResult(r)
    setStep('result')
  }

  const handleSaveReport = async () => {
    if (!email || !result) return
    setLoading(true)
    try {
      await supabase.from('eligibility_reports').insert({
        report_type: 'ami_check',
        is_paid: false,
        payment_amount: 0,
        ami_result: {
          ami_percentage: result.amiPct,
          ami_category: result.category,
          household_size: size,
          annual_income: parseFloat(income.replace(/,/g, '')),
          borough: borough,
          programs: result.programs,
        },
        email_sent: false,
      })
      await supabase.from('users').upsert({
        email: email,
        name_zh: name,
        borough: borough,
        user_type: 'applicant',
        source: 'xiaohongshu',
        subscription_tier: 'free',
      }, { onConflict: 'email' })
      setSaved(true)
      setStep('lead')
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: '#F7F6F3',
      fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
      padding: '0',
    }}>
      {/* 顶部导航 */}
      <div style={{
        background: '#CC2B2B',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ color: 'white', fontSize: '20px', fontWeight: '700' }}>
          住易 ZhuYi
        </div>
        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>
          纽约华人住房福利平台
        </div>
      </div>

      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '24px 16px' }}>

        {/* STEP 1: 表单 */}
        {step === 'form' && (
          <div>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}>
              <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 8px' }}>
                1分钟测算你家的住房福利资格
              </h1>
              <p style={{ fontSize: '14px', color: '#666', margin: '0 0 24px', lineHeight: '1.6' }}>
                根据2025年纽约市最新AMI收入线，免费测算你家庭是否符合Section 8或Housing Connect申请条件
              </p>

              {/* 家庭人口 */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '14px', fontWeight: '500', color: '#333', display: 'block', marginBottom: '8px' }}>
                  家庭人口数（含本人）
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[1,2,3,4,5,6,7,8].map(n => (
                    <button
                      key={n}
                      onClick={() => setSize(n)}
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '8px',
                        border: size === n ? '2px solid #CC2B2B' : '1px solid #E0E0E0',
                        background: size === n ? '#FFF0F0' : 'white',
                        color: size === n ? '#CC2B2B' : '#333',
                        fontWeight: size === n ? '600' : '400',
                        fontSize: '16px',
                        cursor: 'pointer',
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                {size === 8 && (
                  <p style={{ fontSize: '12px', color: '#999', margin: '6px 0 0' }}>8人或以上按8人计算</p>
                )}
              </div>

              {/* 年收入 */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '14px', fontWeight: '500', color: '#333', display: 'block', marginBottom: '8px' }}>
                  家庭年总收入（美元，税前）
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                    fontSize: '16px', color: '#666',
                  }}>$</span>
                  <input
                    type="number"
                    placeholder="例如：45000"
                    value={income}
                    onChange={e => setIncome(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '14px 12px 14px 28px',
                      fontSize: '16px',
                      border: '1px solid #E0E0E0',
                      borderRadius: '8px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <p style={{ fontSize: '12px', color: '#999', margin: '6px 0 0' }}>
                  包括工资、自雇、现金收入、福利金等所有来源
                </p>
              </div>

              {/* 区域 */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontSize: '14px', fontWeight: '500', color: '#333', display: 'block', marginBottom: '8px' }}>
                  目前居住区域
                </label>
                <select
                  value={borough}
                  onChange={e => setBorough(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 12px',
                    fontSize: '16px',
                    border: '1px solid #E0E0E0',
                    borderRadius: '8px',
                    background: 'white',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="">请选择</option>
                  <option value="Queens">皇后区 Queens（法拉盛）</option>
                  <option value="Brooklyn">布鲁克林 Brooklyn（日落公园）</option>
                  <option value="Manhattan">曼哈顿 Manhattan（唐人街）</option>
                  <option value="Bronx">布朗克斯 Bronx</option>
                  <option value="Staten Island">史坦顿岛 Staten Island</option>
                </select>
              </div>

              <button
                onClick={handleCalc}
                disabled={!income || !borough}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: (!income || !borough) ? '#E0E0E0' : '#CC2B2B',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: (!income || !borough) ? 'not-allowed' : 'pointer',
                }}
              >
                立即测算我家的资格 →
              </button>
            </div>

            <p style={{ fontSize: '12px', color: '#999', textAlign: 'center', lineHeight: '1.6' }}>
              数据来源：HUD 2025年纽约市AMI收入线 · 完全免费 · 不收集身份信息
            </p>
          </div>
        )}

        {/* STEP 2: 结果 */}
        {step === 'result' && result && (
          <div>
            {/* 结果卡片 */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}>
              <div style={{
                background: result.color + '15',
                border: `2px solid ${result.color}`,
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '13px', color: result.color, fontWeight: '500', marginBottom: '8px' }}>
                  你家庭的AMI百分比
                </div>
                <div style={{ fontSize: '48px', fontWeight: '700', color: result.color, margin: '0' }}>
                  {result.amiPct}%
                </div>
                <div style={{ fontSize: '14px', color: result.color, fontWeight: '500', marginTop: '4px' }}>
                  {result.categoryZh}家庭
                </div>
              </div>

              <p style={{ fontSize: '14px', color: '#333', lineHeight: '1.6', margin: '0 0 16px' }}>
                {result.message}
              </p>

              {result.programs.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '13px', fontWeight: '500', color: '#333', margin: '0 0 8px' }}>
                    你可以申请的项目：
                  </p>
                  {result.programs.map((p, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '8px 0',
                      borderBottom: i < result.programs.length - 1 ? '1px solid #F0F0F0' : 'none',
                    }}>
                      <span style={{ color: '#1D7A3A', fontSize: '16px' }}>✓</span>
                      <span style={{ fontSize: '13px', color: '#333' }}>{p}</span>
                    </div>
                  ))}
                </div>
              )}

              <div style={{
                background: '#FFF8E6',
                border: '1px solid #F5CC5A',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '13px',
                color: '#7A5500',
                lineHeight: '1.6',
              }}>
                💡 {result.urgency}
              </div>
            </div>

            {/* 引导留资 */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}>
              <h2 style={{ fontSize: '17px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 8px' }}>
                保存你的测算结果
              </h2>
              <p style={{ fontSize: '13px', color: '#666', margin: '0 0 16px', lineHeight: '1.6' }}>
                留下邮箱，我们帮你追踪符合条件的楼盘开放时间，以及年审截止日期提醒。完全免费。
              </p>

              <input
                type="text"
                placeholder="你的姓名（选填）"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '15px',
                  border: '1px solid #E0E0E0',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              <input
                type="email"
                placeholder="你的邮箱地址"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '15px',
                  border: '1px solid #E0E0E0',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />

              <button
                onClick={handleSaveReport}
                disabled={!email || loading}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: !email ? '#E0E0E0' : '#CC2B2B',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: !email ? 'not-allowed' : 'pointer',
                  marginBottom: '12px',
                }}
              >
                {loading ? '保存中...' : '免费保存我的报告 →'}
              </button>

              <button
                onClick={() => setStep('form')}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'transparent',
                  color: '#999',
                  border: '1px solid #E0E0E0',
                  borderRadius: '12px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                重新测算
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: 完成 */}
        {step === 'lead' && (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px 24px',
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 12px' }}>
              报告已保存
            </h2>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: '0 0 24px' }}>
              我们会通过邮件通知你符合条件的楼盘开放时间。
              <br />
              想要获得更完整的申请辅助服务？
            </p>

            <div style={{
              background: '#FFF0F0',
              border: '1px solid #FFCCCC',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px',
              textAlign: 'left',
            }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#CC2B2B', margin: '0 0 8px' }}>
                申请通 $19.9/月
              </p>
              <p style={{ fontSize: '13px', color: '#333', lineHeight: '1.6', margin: '0 0 12px' }}>
                · 实时楼盘推送（按你的AMI自动匹配）<br />
                · 中签后材料辅导<br />
                · 年审截止日期提醒<br />
                · 中文全程客服支持
              </p>
              <a
                href="https://wa.me/your-number"
                style={{
                  display: 'block',
                  background: '#CC2B2B',
                  color: 'white',
                  padding: '12px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: '600',
                  textDecoration: 'none',
                }}
              >
                了解申请通服务 →
              </a>
            </div>

            <button
              onClick={() => { setStep('form'); setIncome(''); setEmail(''); setName(''); setSaved(false) }}
              style={{
                background: 'transparent',
                color: '#999',
                border: 'none',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              帮其他家庭测算
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
