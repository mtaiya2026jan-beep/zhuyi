'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type FormState = {
  contact_name: string
  contact_phone: string
  contact_wechat: string
  contact_email: string
  preferred_contact: string
  borough: string
  neighborhood: string
  unit_type: string
  bedrooms_available: string
  monthly_rent_min: string
  monthly_rent_max: string
  available_from: string
  section8_experience: string
  pets_allowed: string
  notes: string
}

const defaultForm: FormState = {
  contact_name: '',
  contact_phone: '',
  contact_wechat: '',
  contact_email: '',
  preferred_contact: 'wechat',
  borough: '',
  neighborhood: '',
  unit_type: '',
  bedrooms_available: '1',
  monthly_rent_min: '',
  monthly_rent_max: '',
  available_from: '',
  section8_experience: 'none',
  pets_allowed: 'false',
  notes: '',
}

export default function LandlordPage() {
  const [step, setStep] = useState<'form' | 'done'>('form')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<FormState>(defaultForm)

  const u = (k: keyof FormState, v: string) => setForm(f => ({ ...f, [k]: v }))

  const disabled = !form.contact_wechat || !form.borough || !form.unit_type || !form.monthly_rent_min

  const handleSubmit = async () => {
    if (disabled) return
    setLoading(true)
    try {
      await supabase.from('landlords').insert({
        contact_name: form.contact_name,
        contact_phone: form.contact_phone,
        contact_wechat: form.contact_wechat,
        contact_email: form.contact_email || null,
        preferred_contact: form.preferred_contact,
        borough: form.borough,
        neighborhood: form.neighborhood,
        unit_type: form.unit_type,
        bedrooms_available: parseInt(form.bedrooms_available),
        monthly_rent_min: parseFloat(form.monthly_rent_min),
        monthly_rent_max: form.monthly_rent_max ? parseFloat(form.monthly_rent_max) : null,
        available_from: form.available_from || null,
        accepts_section8: true,
        section8_experience: form.section8_experience,
        pets_allowed: form.pets_allowed === 'true',
        notes: form.notes,
        is_verified: false,
        is_active: true,
      })
      setStep('done')
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const iStyle = {
    width: '100%', padding: '12px', fontSize: '15px',
    border: '1px solid #E0E0E0', borderRadius: '8px',
    outline: 'none', boxSizing: 'border-box' as const,
    marginBottom: '16px', background: 'white',
  }

  const lStyle = {
    fontSize: '13px', fontWeight: '500' as const,
    color: '#333', display: 'block', marginBottom: '6px',
  }

  const btnBase = (active: boolean, color = '#0F6E56', bg = '#E1F5EE') => ({
    flex: 1, padding: '10px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px',
    border: active ? `2px solid ${color}` : '1px solid #E0E0E0',
    background: active ? bg : 'white',
    color: active ? color : '#333',
    fontWeight: active ? '600' as const : '400' as const,
  })

  return (
    <main style={{
      minHeight: '100vh', background: '#F7F6F3',
      fontFamily: "'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
    }}>
      <div style={{
        background: '#0F6E56', padding: '16px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ color: 'white', fontSize: '20px', fontWeight: '700' }}>住易 ZhuYi</div>
        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>华人房东登记</div>
      </div>

      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '24px 16px' }}>

        {step === 'form' && (
          <div>
            {/* 顶部说明 */}
            <div style={{
              background: '#E1F5EE', border: '1px solid #9FE1CB',
              borderRadius: '12px', padding: '16px', marginBottom: '20px',
            }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#085041', margin: '0 0 6px' }}>
                🏢 为什么登记接受Section 8？
              </p>
              <p style={{ fontSize: '13px', color: '#0F6E56', margin: '0', lineHeight: '1.6' }}>
                · 政府直接付租金，稳定无拖欠<br />
                · 我们帮你筛选合格华人租客<br />
                · 免费登记，无佣金收取
              </p>
            </div>

            <div style={{
              background: 'white', borderRadius: '16px',
              padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}>
              <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 20px' }}>
                登记你的房源
              </h1>

              {/* 联系信息 */}
              <p style={{ fontSize: '12px', fontWeight: '600', color: '#999', margin: '0 0 14px', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>联系方式</p>

              <label style={lStyle}>你的姓名</label>
              <input value={form.contact_name} onChange={e => u('contact_name', e.target.value)}
                placeholder="姓名" style={iStyle} />

              <label style={lStyle}>微信号 <span style={{ color: '#0F6E56' }}>*</span></label>
              <input value={form.contact_wechat} onChange={e => u('contact_wechat', e.target.value)}
                placeholder="微信号（必填，用于发送租客匹配信息）" style={iStyle} />

              <label style={lStyle}>手机号码</label>
              <input value={form.contact_phone} onChange={e => u('contact_phone', e.target.value)}
                placeholder="美国手机号" style={iStyle} />

              <label style={lStyle}>首选联系方式</label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                {([['wechat', '微信'], ['phone', '电话'], ['email', '邮件']] as [string, string][]).map(([v, l]) => (
                  <button key={v} onClick={() => u('preferred_contact', v)}
                    style={btnBase(form.preferred_contact === v)}>{l}</button>
                ))}
              </div>

              {/* 房源信息 */}
              <p style={{ fontSize: '12px', fontWeight: '600', color: '#999', margin: '16px 0 14px', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>房源信息</p>

              <label style={lStyle}>所在区域 <span style={{ color: '#0F6E56' }}>*</span></label>
              <select value={form.borough} onChange={e => u('borough', e.target.value)} style={iStyle}>
                <option value="">请选择</option>
                <option value="Queens">皇后区 Queens（法拉盛）</option>
                <option value="Brooklyn">布鲁克林 Brooklyn（日落公园）</option>
                <option value="Manhattan">曼哈顿 Manhattan</option>
                <option value="Bronx">布朗克斯 Bronx</option>
                <option value="Staten Island">史坦顿岛 Staten Island</option>
              </select>

              <label style={lStyle}>具体街区（选填）</label>
              <input value={form.neighborhood} onChange={e => u('neighborhood', e.target.value)}
                placeholder="如：法拉盛Main St附近" style={iStyle} />

              <label style={lStyle}>房型 <span style={{ color: '#0F6E56' }}>*</span></label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' as const }}>
                {([['studio', 'Studio'], ['1br', '1居室'], ['2br', '2居室'], ['3br', '3居室+'], ['mixed', '多套']] as [string, string][]).map(([v, l]) => (
                  <button key={v} onClick={() => u('unit_type', v)}
                    style={{ ...btnBase(form.unit_type === v), flex: 'none', minWidth: '72px' }}>{l}</button>
                ))}
              </div>

              <label style={lStyle}>可出租间数</label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} onClick={() => u('bedrooms_available', String(n))}
                    style={{ width: '44px', height: '44px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', border: form.bedrooms_available === String(n) ? '2px solid #0F6E56' : '1px solid #E0E0E0', background: form.bedrooms_available === String(n) ? '#E1F5EE' : 'white', color: form.bedrooms_available === String(n) ? '#0F6E56' : '#333', fontWeight: form.bedrooms_available === String(n) ? '600' : '400' }}>
                    {n}
                  </button>
                ))}
              </div>

              <label style={lStyle}>月租金范围（美元）<span style={{ color: '#0F6E56' }}>*</span></label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', alignItems: 'center' }}>
                <input value={form.monthly_rent_min} onChange={e => u('monthly_rent_min', e.target.value)}
                  placeholder="最低 如：1800" type="number"
                  style={{ ...iStyle, marginBottom: 0, flex: 1 }} />
                <span style={{ color: '#999', flexShrink: 0 }}>—</span>
                <input value={form.monthly_rent_max} onChange={e => u('monthly_rent_max', e.target.value)}
                  placeholder="最高（选填）" type="number"
                  style={{ ...iStyle, marginBottom: 0, flex: 1 }} />
              </div>

              <label style={lStyle}>最早可入住日期（选填）</label>
              <input type="date" value={form.available_from} onChange={e => u('available_from', e.target.value)}
                style={iStyle} />

              {/* Section 8经验 */}
              <p style={{ fontSize: '12px', fontWeight: '600', color: '#999', margin: '4px 0 14px', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>Section 8经验</p>

              <label style={lStyle}>你之前做过Section 8房东吗？</label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                {([['none', '第一次'], ['some', '做过1-2次'], ['experienced', '很熟悉']] as [string, string][]).map(([v, l]) => (
                  <button key={v} onClick={() => u('section8_experience', v)}
                    style={btnBase(form.section8_experience === v)}>{l}</button>
                ))}
              </div>

              <label style={lStyle}>是否允许宠物？</label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                {([['false', '不允许'], ['true', '允许']] as [string, string][]).map(([v, l]) => (
                  <button key={v} onClick={() => u('pets_allowed', v)}
                    style={btnBase(form.pets_allowed === v)}>{l}</button>
                ))}
              </div>

              <label style={lStyle}>其他说明（选填）</label>
              <textarea value={form.notes} onChange={e => u('notes', e.target.value)}
                placeholder="如：只接受小家庭、需要信用记录等"
                rows={3}
                style={{ ...iStyle, resize: 'vertical' as const }} />

              <button onClick={handleSubmit} disabled={disabled || loading}
                style={{
                  width: '100%', padding: '16px',
                  background: disabled ? '#E0E0E0' : '#0F6E56',
                  color: 'white', border: 'none', borderRadius: '12px',
                  fontSize: '16px', fontWeight: '600',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                }}>
                {loading ? '提交中...' : '免费登记我的房源 →'}
              </button>

              <p style={{ fontSize: '12px', color: '#999', textAlign: 'center' as const, marginTop: '12px' }}>
                提交后住易团队会在48小时内核验，核验通过即进入匹配池
              </p>
            </div>
          </div>
        )}

        {step === 'done' && (
          <div style={{
            background: 'white', borderRadius: '16px',
            padding: '32px 24px', textAlign: 'center' as const,
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 12px' }}>
              房源登记成功
            </h2>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: '0 0 20px' }}>
              我们会在48小时内通过微信联系你（{form.contact_wechat}）完成核验。
              核验通过后，符合条件的持券租客信息会发送给你。
            </p>

            <div style={{
              background: '#E1F5EE', border: '1px solid #9FE1CB',
              borderRadius: '12px', padding: '16px', marginBottom: '20px', textAlign: 'left' as const,
            }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#085041', margin: '0 0 8px' }}>
                接下来的流程：
              </p>
              <p style={{ fontSize: '12px', color: '#0F6E56', margin: '0', lineHeight: '1.8' }}>
                ① 住易团队微信联系确认房源信息<br />
                ② 核验通过，房源进入华人租客匹配池<br />
                ③ 有符合条件的持券租客时，我们推送给你<br />
                ④ 双方确认后安排看房，签约
              </p>
            </div>

            <button onClick={() => { setStep('form'); setForm(defaultForm) }}
              style={{
                width: '100%', padding: '12px', background: 'transparent',
                color: '#999', border: '1px solid #E0E0E0',
                borderRadius: '12px', fontSize: '14px', cursor: 'pointer',
              }}>
              登记另一套房源
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
