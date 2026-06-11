'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function getDaysLeft(issueDate: string): number {
  const issued = new Date(issueDate)
  const expires = new Date(issued)
  expires.setDate(expires.getDate() + 120)
  const today = new Date()
  return Math.ceil((expires.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

function getPriority(days: number) {
  if (days <= 30) return { level: '紧急', color: '#CC2B2B', bg: '#FFF0F0', emoji: '🔴' }
  if (days <= 60) return { level: '优先', color: '#E07B00', bg: '#FAEEDA', emoji: '🟠' }
  if (days <= 90) return { level: '正常', color: '#854F0B', bg: '#FFF8E6', emoji: '🟡' }
  return { level: '充裕', color: '#1D7A3A', bg: '#EAF3DE', emoji: '🟢' }
}

export default function VoucherPage() {
  const [step, setStep] = useState<'form'|'result'>('form')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name:'', phone:'', wechat:'', email:'', issueDate:'', voucherType:'section8', bedrooms:'1', borough:'', familySize:'3' })
  const [result, setResult] = useState<{days:number,priority:ReturnType<typeof getPriority>}|null>(null)

  const u = (k:string,v:string) => setForm(f=>({...f,[k]:v}))

  const handleSubmit = async () => {
    if (!form.issueDate||!form.borough||!form.wechat) return
    setLoading(true)
    const days = getDaysLeft(form.issueDate)
    const priority = getPriority(days)
    setResult({days,priority})
    try {
      await supabase.from('voucher_holders').insert({
        name: form.name, phone: form.phone, wechat: form.wechat, email: form.email||null,
        voucher_type: form.voucherType, issue_date: form.issueDate,
        days_remaining: days, priority_level: priority.level,
        bedrooms_needed: parseInt(form.bedrooms), target_borough: form.borough,
        family_size: parseInt(form.familySize), status: 'searching'
      })
      setStep('result')
    } catch(e) { console.error(e) }
    setLoading(false)
  }

  const s = (label:string, required=false) => (
    <label style={{fontSize:'13px',fontWeight:'500',color:'#333',display:'block',marginBottom:'6px'}}>
      {label}{required&&<span style={{color:'#CC2B2B'}}> *</span>}
    </label>
  )

  const input = (key:string, placeholder:string, type='text') => (
    <input type={type} value={(form as any)[key]} onChange={e=>u(key,e.target.value)} placeholder={placeholder}
      style={{width:'100%',padding:'12px',fontSize:'15px',border:'1px solid #E0E0E0',borderRadius:'8px',outline:'none',boxSizing:'border-box' as const,marginBottom:'16px'}} />
  )

  const btnRow = (key:string, options:[string,string][]) => (
    <div style={{display:'flex',gap:'8px',marginBottom:'16px',flexWrap:'wrap' as const}}>
      {options.map(([v,l])=>(
        <button key={v} onClick={()=>u(key,v)} style={{flex:1,minWidth:'60px',padding:'10px',borderRadius:'8px',
          border:(form as any)[key]===v?'2px solid #CC2B2B':'1px solid #E0E0E0',
          background:(form as any)[key]===v?'#FFF0F0':'white',
          color:(form as any)[key]===v?'#CC2B2B':'#333',
          fontWeight:(form as any)[key]===v?'600':'400',fontSize:'13px',cursor:'pointer'}}>{l}</button>
      ))}
    </div>
  )

  return (
    <main style={{minHeight:'100vh',background:'#F7F6F3',fontFamily:"'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif"}}>
      <div style={{background:'#CC2B2B',padding:'16px 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{color:'white',fontSize:'20px',fontWeight:'700'}}>
cat > ~/Downloads/zhuyi/src/app/voucher/page.tsx << 'ENDOFFILE'
'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function getDaysLeft(issueDate: string): number {
  const issued = new Date(issueDate)
  const expires = new Date(issued)
  expires.setDate(expires.getDate() + 120)
  const today = new Date()
  return Math.ceil((expires.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

function getPriority(days: number) {
  if (days <= 30) return { level: '紧急', color: '#CC2B2B', bg: '#FFF0F0', emoji: '🔴' }
  if (days <= 60) return { level: '优先', color: '#E07B00', bg: '#FAEEDA', emoji: '🟠' }
  if (days <= 90) return { level: '正常', color: '#854F0B', bg: '#FFF8E6', emoji: '🟡' }
  return { level: '充裕', color: '#1D7A3A', bg: '#EAF3DE', emoji: '🟢' }
}

export default function VoucherPage() {
  const [step, setStep] = useState<'form'|'result'>('form')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name:'', phone:'', wechat:'', email:'', issueDate:'', voucherType:'section8', bedrooms:'1', borough:'', familySize:'3' })
  const [result, setResult] = useState<{days:number,priority:ReturnType<typeof getPriority>}|null>(null)

  const u = (k:string,v:string) => setForm(f=>({...f,[k]:v}))

  const handleSubmit = async () => {
    if (!form.issueDate||!form.borough||!form.wechat) return
    setLoading(true)
    const days = getDaysLeft(form.issueDate)
    const priority = getPriority(days)
    setResult({days,priority})
    try {
      await supabase.from('voucher_holders').insert({
        name: form.name, phone: form.phone, wechat: form.wechat, email: form.email||null,
        voucher_type: form.voucherType, issue_date: form.issueDate,
        days_remaining: days, priority_level: priority.level,
        bedrooms_needed: parseInt(form.bedrooms), target_borough: form.borough,
        family_size: parseInt(form.familySize), status: 'searching'
      })
      setStep('result')
    } catch(e) { console.error(e) }
    setLoading(false)
  }

  const s = (label:string, required=false) => (
    <label style={{fontSize:'13px',fontWeight:'500',color:'#333',display:'block',marginBottom:'6px'}}>
      {label}{required&&<span style={{color:'#CC2B2B'}}> *</span>}
    </label>
  )

  const input = (key:string, placeholder:string, type='text') => (
    <input type={type} value={(form as any)[key]} onChange={e=>u(key,e.target.value)} placeholder={placeholder}
      style={{width:'100%',padding:'12px',fontSize:'15px',border:'1px solid #E0E0E0',borderRadius:'8px',outline:'none',boxSizing:'border-box' as const,marginBottom:'16px'}} />
  )

  const btnRow = (key:string, options:[string,string][]) => (
    <div style={{display:'flex',gap:'8px',marginBottom:'16px',flexWrap:'wrap' as const}}>
      {options.map(([v,l])=>(
        <button key={v} onClick={()=>u(key,v)} style={{flex:1,minWidth:'60px',padding:'10px',borderRadius:'8px',
          border:(form as any)[key]===v?'2px solid #CC2B2B':'1px solid #E0E0E0',
          background:(form as any)[key]===v?'#FFF0F0':'white',
          color:(form as any)[key]===v?'#CC2B2B':'#333',
          fontWeight:(form as any)[key]===v?'600':'400',fontSize:'13px',cursor:'pointer'}}>{l}</button>
      ))}
    </div>
  )

  return (
    <main style={{minHeight:'100vh',background:'#F7F6F3',fontFamily:"'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif"}}>
      <div style={{background:'#CC2B2B',padding:'16px 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{color:'white',fontSize:'20px',fontWeight:'700'}}>住易 ZhuYi</div>
        <div style={{color:'rgba(255,255,255,0.8)',fontSize:'12px'}}>Section 8持券找房</div>
      </div>
      <div style={{maxWidth:'480px',margin:'0 auto',padding:'24px 16px'}}>

        {step==='form' && (
          <div style={{background:'white',borderRadius:'16px',padding:'24px',boxShadow:'0 1px 3px rgba(0,0,0,0.08)'}}>
            <h1 style={{fontSize:'20px',fontWeight:'700',color:'#1a1a1a',margin:'0 0 8px'}}>登记你的住房券</h1>
            <p style={{fontSize:'13px',color:'#666',margin:'0 0 20px',lineHeight:'1.6'}}>登记后我们根据剩余时间优先为你匹配愿意接受Section 8的华人房东</p>

            {s('你的姓名')}{input('name','姓名')}
            {s('微信号',true)}{input('wechat','微信号（必填，用于发送匹配结果）')}
            {s('手机号码')}{input('phone','美国手机号')}

            <div style={{marginBottom:'16px'}}>
              {s('券类型')}
              {btnRow('voucherType',[['section8','Section 8'],['nycha','NYCHA']])}
            </div>

            <div style={{marginBottom:'16px'}}>
              {s('券的发放日期',true)}
              <input type="date" value={form.issueDate} onChange={e=>u('issueDate',e.target.value)}
                style={{width:'100%',padding:'12px',fontSize:'15px',border:'1px solid #E0E0E0',borderRadius:'8px',outline:'none',boxSizing:'border-box' as const}} />
              <p style={{fontSize:'12px',color:'#999',margin:'4px 0 0'}}>在NYCHA发给你的券上可以找到，有效期120天</p>
            </div>

            <div style={{marginBottom:'16px'}}>
              {s('需要几居室')}
              {btnRow('bedrooms',[['0','Studio'],['1','1居室'],['2','2居室'],['3','3居室+']])}
            </div>

            <div style={{marginBottom:'16px'}}>
              {s('希望住哪个区',true)}
              <select value={form.borough} onChange={e=>u('borough',e.target.value)}
                style={{width:'100%',padding:'12px',fontSize:'15px',border:'1px solid #E0E0E0',borderRadius:'8px',background:'white',outline:'none',boxSizing:'border-box' as const}}>
                <option value="">请选择</option>
                <option value="Queens">皇后区 Queens（法拉盛）</option>
                <option value="Brooklyn">布鲁克林 Brooklyn（日落公园）</option>
                <option value="Manhattan">曼哈顿 Manhattan</option>
                <option value="Bronx">布朗克斯 Bronx</option>
                <option value="Any">任何区都可以</option>
              </select>
            </div>

            <div style={{marginBottom:'24px'}}>
              {s('家庭人口数')}
              <div style={{display:'flex',gap:'8px',flexWrap:'wrap' as const}}>
                {[1,2,3,4,5,6].map(n=>(
                  <button key={n} onClick={()=>u('familySize',String(n))} style={{width:'44px',height:'44px',borderRadius:'8px',
                    border:form.familySize===String(n)?'2px solid #CC2B2B':'1px solid #E0E0E0',
                    background:form.familySize===String(n)?'#FFF0F0':'white',
                    color:form.familySize===String(n)?'#CC2B2B':'#333',
                    fontWeight:form.familySize===String(n)?'600':'400',fontSize:'15px',cursor:'pointer'}}>{n}</button>
                ))}
              </div>
            </div>

            <button onClick={handleSubmit} disabled={!form.issueDate||!form.borough||!form.wechat||loading}
              style={{width:'100%',padding:'16px',background:(!form.issueDate||!form.borough||!form.wechat)?'#E0E0E0':'#CC2B2B',
                color:'white',border:'none',borderRadius:'12px',fontSize:'16px',fontWeight:'600',
                cursor:(!form.issueDate||!form.borough||!form.wechat)?'not-allowed':'pointer'}}>
              {loading?'提交中...':'登记并查看剩余时间 →'}
            </button>
          </div>
        )}

        {step==='result' && result && (
          <div style={{background:'white',borderRadius:'16px',padding:'24px',boxShadow:'0 1px 3px rgba(0,0,0,0.08)'}}>
            <div style={{background:result.priority.bg,border:`2px solid ${result.priority.color}`,borderRadius:'12px',padding:'24px',textAlign:'center' as const,marginBottom:'20px'}}>
              <div style={{fontSize:'32px',marginBottom:'8px'}}>{result.priority.emoji}</div>
              <div style={{fontSize:'13px',color:result.priority.color,fontWeight:'500',marginBottom:'8px'}}>你的券剩余时间</div>
              <div style={{fontSize:'56px',fontWeight:'700',color:result.priority.color,lineHeight:'1'}}>{result.days}</div>
              <div style={{fontSize:'16px',color:result.priority.color,margin:'4px 0 12px'}}>天</div>
              <div style={{background:result.priority.color,color:'white',padding:'6px 16px',borderRadius:'20px',display:'inline-block',fontSize:'13px',fontWeight:'600'}}>{result.priority.level}级别</div>
            </div>

            {result.days<=30 && (
              <div style={{background:'#FFF0F0',border:'1px solid #FFCCCC',borderRadius:'8px',padding:'12px',marginBottom:'16px'}}>
                <p style={{fontSize:'13px',color:'#CC2B2B',margin:'0',lineHeight:'1.6',fontWeight:'500'}}>⚠️ 剩余不足30天，属于紧急情况。我们会优先为你匹配房东，请保持微信畅通。</p>
              </div>
            )}

            <p style={{fontSize:'14px',color:'#333',lineHeight:'1.6',margin:'0 0 12px'}}>
              你的登记已收到。我们根据你的需求（{form.borough}·{form.bedrooms==='0'?'Studio':form.bedrooms+'居室'}）在华人房东库中为你匹配房源。
            </p>
            <p style={{fontSize:'13px',color:'#666',lineHeight:'1.6',margin:'0 0 20px'}}>
              匹配结果会通过<strong>微信</strong>联系你（{form.wechat}）。
            </p>

            <div style={{background:'#F7F6F3',borderRadius:'8px',padding:'14px',marginBottom:'20px'}}>
              <p style={{fontSize:'13px',fontWeight:'500',color:'#333',margin:'0 0 6px'}}>同时建议你：</p>
              <p style={{fontSize:'12px',color:'#666',margin:'0',lineHeight:'1.8'}}>
                ① 向NYCHA申请延期（如有特殊情况可申请30-60天延期）<br/>
                ② 继续自行在Craigslist、Zillow搜索<br/>
                ③ 告知亲友帮你留意愿意接受券的房东
              </p>
            </div>

            <button onClick={()=>{setStep('form');setForm({name:'',phone:'',wechat:'',email:'',issueDate:'',voucherType:'section8',bedrooms:'1',borough:'',familySize:'3'})}}
              style={{width:'100%',padding:'12px',background:'transparent',color:'#999',border:'1px solid #E0E0E0',borderRadius:'12px',fontSize:'14px',cursor:'pointer'}}>
              帮其他家庭登记
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
