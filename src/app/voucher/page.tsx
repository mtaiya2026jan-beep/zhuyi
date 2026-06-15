"use client";
import {useState} from "react";

function getUrgency(days:number){
  if(days<0) return {label:"🔴 已過期",sub:"持券已過期，請立即申請延期",color:"#E84A4A",bg:"#FFF0F0",border:"#E84A4A"};
  if(days<=30) return {label:"🔴 緊急",sub:"30天內到期，立即行動",color:"#E84A4A",bg:"#FFF0F0",border:"#E84A4A"};
  if(days<=60) return {label:"🟠 優先",sub:"60天內到期，盡快找房",color:"#E87D2A",bg:"#FFF6EE",border:"#E87D2A"};
  if(days<=120) return {label:"🟡 正常",sub:"120天內到期，按計劃推進",color:"#D4A017",bg:"#FFFBEE",border:"#D4A017"};
  if(days<=180) return {label:"🟢 延期中",sub:"已進入60天自動延期階段",color:"#3A8A5A",bg:"#F0FAF4",border:"#3A8A5A"};
  return {label:"🟢 充裕",sub:"超過180天，從容準備",color:"#3A8A5A",bg:"#F0FAF4",border:"#3A8A5A"};
}

export default function VoucherPage(){
  const [name,setName]=useState("");
  const [phone,setPhone]=useState("");
  const [size,setSize]=useState("3");
  const [boro,setBoro]=useState("");
  const [expiry,setExpiry]=useState("");
  const [issueDate,setIssueDate]=useState("");
  const [sub,setSub]=useState(false);
  const [days,setDays]=useState(0);
  const [urg,setUrg]=useState<ReturnType<typeof getUrgency>|null>(null);
  const [toast,setToast]=useState("");
  const [saving,setSaving]=useState(false);
  const [phase,setPhase]=useState<"initial"|"extended"|"beyond">("initial");

  function showToast(m:string){setToast(m);setTimeout(()=>setToast(""),3000);}

  function calcPhase(d:number):"initial"|"extended"|"beyond"{
    if(d>120) return "initial";
    if(d>0) return "extended";
    return "beyond";
  }

  async function handleSubmit(){
    if(!name||!phone||!expiry){showToast("請填寫姓名、電話和持券到期日");return;}
    const d=Math.round((new Date(expiry).getTime()-Date.now())/86400000);
    setPhase(calcPhase(d));
    const urgency=getUrgency(d);
    setDays(d);setUrg(urgency);setSub(true);
    setTimeout(()=>document.getElementById("vr")?.scrollIntoView({behavior:"smooth"}),80);
    setSaving(true);
    try{
      await fetch("/api/voucher",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name,phone,size,borough:boro,expiry,days:d,urgency:urgency.label,issue_date:issueDate})});
    }catch(e){console.error("[VOUCHER]",e);}
    finally{setSaving(false);}
  }

  const today=new Date().toISOString().split("T")[0];
  const BOROS=["曼哈頓","布魯克林","皇后區","布朗克斯","史泰登島"];
  const iS:React.CSSProperties={width:"100%",padding:14,border:"2px solid #D0D8E8",borderRadius:12,fontSize:16,color:"#1A2B4A",background:"#FAFBFD",outline:"none"};

  return(
    <div style={{fontFamily:"PingFang TC,sans-serif",minHeight:"100vh",background:"#F7F8FA"}}>
      {toast&&<div style={{position:"fixed",bottom:30,left:"50%",transform:"translateX(-50%)",background:"#1A2B4A",color:"#fff",padding:"10px 20px",borderRadius:20,fontSize:13,zIndex:9999}}>{toast}</div>}
      <div style={{background:"#2A5A9A",padding:"0 20px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:680,margin:"0 auto",display:"flex",alignItems:"center",height:60,gap:14}}>
          <a href="/" style={{color:"#9ABCE8",fontSize:24,textDecoration:"none",lineHeight:1}}>←</a>
          <span style={{color:"#fff",fontSize:18,fontWeight:700}}>Section 8 持券人登記</span>
        </div>
      </div>
      <div style={{background:"linear-gradient(160deg,#2A5A9A 0%,#1A3A6A 100%)",padding:"48px 24px 56px",textAlign:"center"}}>
        <div style={{fontSize:14,color:"#9ABCE8",letterSpacing:2,marginBottom:8}}>住易 · 持券找房</div>
        <h1 style={{margin:0,fontSize:24,fontWeight:700,color:"#fff",lineHeight:1.35}}>登記持券資訊　優先匹配華人房東</h1>
        <p style={{margin:"10px 0 0",fontSize:14,color:"#9ABCE8",lineHeight:1.7}}>系統根據到期時間自動設定優先級　緊急個案優先處理</p>
      </div>
      <div style={{maxWidth:680,margin:"0 auto",padding:"24px 20px 60px"}}>
        <div style={{background:"#fff",borderRadius:20,padding:"22px",boxShadow:"0 2px 14px rgba(0,0,0,0.08)",marginBottom:20,borderLeft:"4px solid #2A5A9A"}}>
          <div style={{fontSize:15,fontWeight:700,color:"#1A2B4A",marginBottom:14}}>📋 Section 8 券有效期說明</div>
          {([
            {phase:"第一階段",days:"0–120 天",color:"#D4A017",bg:"#FFFBEE",desc:"初始找房期。拿到券立即開始找房，這是最充裕的階段。"},
            {phase:"第二階段",days:"121–180 天",color:"#E87D2A",bg:"#FFF6EE",desc:"自動延期 60 天，無需申請。住易優先為你匹配房東。"},
            {phase:"第三階段",days:"超過 180 天",color:"#E84A4A",bg:"#FFF0F0",desc:"需主動向 NYCHA 申請額外延期（Reasonable Accommodation）。無固定上限，理由充分可持續申請。"},
          ] as const).map((s,i)=>(
            <div key={i} style={{display:"flex",gap:12,padding:"10px 0",borderBottom:i<2?"1px solid #F0F3F8":"none"}}>
              <div style={{minWidth:88,fontSize:11,fontWeight:700,color:s.color,background:s.bg,borderRadius:8,padding:"4px 8px",textAlign:"center",lineHeight:1.5}}>{s.phase}<br/>{s.days}</div>
              <div style={{fontSize:13,color:"#2A3A5A",lineHeight:1.6}}>{s.desc}</div>
            </div>
          ))}
          <div style={{marginTop:14,padding:"10px 14px",background:"#F0F4FF",borderRadius:10,fontSize:13,color:"#2A4A8A",lineHeight:1.6}}>
            💡 <b>重要：</b>向 NYCHA 提交完整租房申請包後，券的倒計時會<b>暫停</b>，直到 NYCHA 通知審批結果為止。
          </div>
        </div>
        <div style={{background:"#fff",borderRadius:20,padding:"22px",boxShadow:"0 2px 14px rgba(0,0,0,0.08)",marginBottom:20}}>
          <div style={{fontSize:15,fontWeight:700,color:"#1A2B4A",marginBottom:14}}>🆘 超過 180 天如何申請延期？</div>
          <div style={{fontSize:13,color:"#2A3A5A",lineHeight:1.8,marginBottom:12}}>向 NYCHA 提交 <b>Reasonable Accommodation</b> 書面申請，逐案審批，<b>無固定上限天數</b>，理由充分可持續申請。</div>
          <div style={{fontSize:14,fontWeight:700,color:"#1A2B4A",marginBottom:10}}>可接受的延期理由：</div>
          {([
            {icon:"♿",reason:"家庭成員有殘障（disability）",tip:"最容易獲批，需提供醫生證明"},
            {icon:"🏥",reason:"重病或家庭緊急情況",tip:"需提供相關醫療或法律文件"},
            {icon:"🏠",reason:"找不到接受 Section 8 的房東",tip:"在紐約市非常普遍，可作為理由"},
            {icon:"📋",reason:"已提交租房申請但被 NYCHA 拒絕",tip:"非個人過失，通常可獲批"},
            {icon:"👨‍👩‍👧‍👦",reason:"家庭人數特殊，難以找到合適戶型",tip:"大家庭或無障礙需求適用"},
            {icon:"💼",reason:"就業或工作時間障礙",tip:"影響看房能力"},
          ] as const).map((r,i)=>(
            <div key={i} style={{display:"flex",gap:10,padding:"8px 0",borderBottom:i<5?"1px solid #F0F3F8":"none",alignItems:"flex-start"}}>
              <span style={{fontSize:18,marginTop:2}}>{r.icon}</span>
              <div>
                <div style={{fontSize:14,fontWeight:600,color:"#1A2B4A"}}>{r.reason}</div>
                <div style={{fontSize:12,color:"#5A6A8A"}}>{r.tip}</div>
              </div>
            </div>
          ))}
          <div style={{marginTop:14,padding:"12px 14px",background:"#FFF0F0",borderRadius:10,fontSize:13,color:"#8A2A2A",lineHeight:1.6}}>
            ⚠️ 申請延期需提前 <b>2–3 週</b> 準備書面材料。<b>陪跑訂閱用戶</b>可獲延期申請中文指引及英文信件模板。
          </div>
        </div>
        {!sub?(
          <div style={{background:"#fff",borderRadius:20,padding:"26px 22px",boxShadow:"0 2px 14px rgba(0,0,0,0.08)",marginBottom:20}}>
            <div style={{fontSize:16,fontWeight:700,color:"#1A2B4A",marginBottom:20}}>📝 填寫基本資訊</div>
            <div style={{marginBottom:16}}>
              <label style={{display:"block",fontSize:15,color:"#5A6A8A",marginBottom:8,fontWeight:600}}>姓名（中英文均可）</label>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="例：陳小明" style={iS}/>
            </div>
            <div style={{marginBottom:16}}>
              <label style={{display:"block",fontSize:15,color:"#5A6A8A",marginBottom:8,fontWeight:600}}>聯繫電話</label>
              <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="例：917-555-0123" style={iS}/>
            </div>
            <div style={{marginBottom:16}}>
              <label style={{display:"block",fontSize:15,color:"#5A6A8A",marginBottom:8,fontWeight:600}}>家庭人數</label>
              <select value={size} onChange={e=>setSize(e.target.value)} style={iS}>
                {[1,2,3,4,5,6,7,8].map(n=><option key={n} value={n}>{n} 人</option>)}
              </select>
            </div>
            <div style={{marginBottom:16}}>
              <label style={{display:"block",fontSize:15,color:"#5A6A8A",marginBottom:8,fontWeight:600}}>希望搬到哪個區</label>
              <select value={boro} onChange={e=>setBoro(e.target.value)} style={iS}>
                <option value="">不限，均可</option>
                {BOROS.map(b=><option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div style={{marginBottom:16}}>
              <label style={{display:"block",fontSize:15,color:"#5A6A8A",marginBottom:8,fontWeight:600}}>
                發券日期 <span style={{fontSize:12,color:"#8899B0",fontWeight:400}}>(可選，印在持券信封上)</span>
              </label>
              <input type="date" value={issueDate} onChange={e=>setIssueDate(e.target.value)} max={today} style={iS}/>
            </div>
            <div style={{marginBottom:20}}>
              <label style={{display:"block",fontSize:15,color:"#5A6A8A",marginBottom:8,fontWeight:600}}>
                持券到期日 <span style={{color:"#E84A4A"}}>★ 必填</span>
              </label>
              <input type="date" value={expiry} onChange={e=>setExpiry(e.target.value)} min={today} style={iS}/>
              <div style={{fontSize:12,color:"#8899B0",marginTop:6}}>到期日印在持券信封上，通常為核發後 120 天（初始期）或 180 天（含自動延期）</div>
            </div>
            <div style={{background:"#F7F8FA",borderRadius:14,padding:14,marginBottom:18}}>
              <div style={{fontSize:14,fontWeight:700,color:"#1A2B4A",marginBottom:10}}>優先級說明</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {([
                  {e:"🔴 緊急",d:"30天內",c:"#E84A4A"},
                  {e:"🟠 優先",d:"31–60天",c:"#E87D2A"},
                  {e:"🟡 正常",d:"61–120天",c:"#D4A017"},
                  {e:"🟢 延期中",d:"121–180天",c:"#3A8A5A"},
                ] as const).map(x=>(
                  <div key={x.e} style={{display:"flex",gap:6,alignItems:"center",padding:"7px 10px",background:"#fff",borderRadius:8}}>
                    <span style={{fontSize:13,fontWeight:700,color:x.c}}>{x.e}</span>
                    <span style={{fontSize:12,color:"#6A7A9A"}}>{x.d}</span>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={handleSubmit} disabled={saving}
              style={{width:"100%",padding:16,borderRadius:14,border:"none",
                background:saving?"#8899B0":"linear-gradient(135deg,#2A5A9A 0%,#1A3A6A 100%)",
                color:"#fff",fontSize:18,fontWeight:700,cursor:saving?"not-allowed":"pointer",
                boxShadow:"0 4px 16px rgba(42,90,154,0.3)"}}>
              {saving?"登記中 ...":"提交登記"}
            </button>
          </div>
        ):(
          <div id="vr">
            {urg&&(
              <div style={{background:urg.bg,border:`2.5px solid ${urg.border}`,borderRadius:20,padding:24,marginBottom:16,textAlign:"center"}}>
                <div style={{fontSize:32,fontWeight:800,color:urg.color,marginBottom:8}}>{urg.label}</div>
                <div style={{fontSize:16,color:"#1A2B4A",fontWeight:600,marginBottom:6}}>{urg.sub}</div>
                <div style={{fontSize:14,color:"#5A6A8A"}}>距離到期還有 <b style={{color:urg.color}}>{days} 天</b></div>
              </div>
            )}
            <div style={{background:"#fff",borderRadius:20,padding:"22px",boxShadow:"0 2px 14px rgba(0,0,0,0.07)",marginBottom:16}}>
              <div style={{fontSize:16,fontWeight:700,color:"#1A2B4A",marginBottom:14}}>✅ 登記成功　你的下一步</div>
              {phase==="beyond"&&(
                <div style={{padding:"12px 14px",background:"#FFF0F0",borderRadius:10,fontSize:13,color:"#8A2A2A",marginBottom:14,lineHeight:1.6}}>
                  ⚠️ 你的券已超過 180 天，請<b>立即聯繫 NYCHA 申請延期</b>。陪跑訂閱用戶可獲申請材料指引。
                </div>
              )}
              {phase==="extended"&&(
                <div style={{padding:"12px 14px",background:"#FFF6EE",borderRadius:10,fontSize:13,color:"#7A4A0A",marginBottom:14,lineHeight:1.6}}>
                  📢 已進入 <b>第二階段（自動延期 60 天）</b>，無需申請，繼續找房即可。請提前準備 180 天後的延期材料。
                </div>
              )}
              {([
                {icon:"📞",text:days<=30?"立即致電 NYCHA 申請延期（718-707-7771）":"住易會優先為你匹配接受 Section 8 的華人房東"},
                {icon:"🔍",text:"在 Housing Connect 搜尋目前開放的保障房房源"},
                {icon:"📅",text:"距離到期還有 "+days+" 天，請保持電話暢通"},
              ] as const).map((a,i)=>(
                <div key={i} style={{display:"flex",gap:12,padding:"12px 0",borderBottom:i<2?"1px solid #F0F3F8":"none",alignItems:"flex-start"}}>
                  <span style={{fontSize:20}}>{a.icon}</span>
                  <span style={{fontSize:15,color:"#2A3A5A",lineHeight:1.7}}>{a.text}</span>
                </div>
              ))}
            </div>
            <button onClick={()=>setSub(false)}
              style={{width:"100%",padding:13,borderRadius:12,border:"2px solid #D0D8E8",background:"#fff",color:"#5A6A8A",fontSize:14,fontWeight:600,cursor:"pointer"}}>
              修改資訊 / 重新登記
            </button>
          </div>
        )}
        {/* 截止提醒 — 永遠顯示 */}
        <div style={{background:"#fff",borderRadius:16,padding:20,marginBottom:12,boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
          <div style={{fontSize:15,fontWeight:700,color:"#1A2B4A",marginBottom:6}}>⏰ 設定券截止日提醒</div>
          <div style={{fontSize:13,color:"#8899B0",marginBottom:14,lineHeight:1.6}}>住易在截止日前自動發中文提醒郵件，不漏接任何截止日</div>
          <a href="/reminders" style={{display:"block",padding:"12px",borderRadius:12,background:"#1A2B4A",color:"#fff",fontSize:14,fontWeight:700,textDecoration:"none",textAlign:"center"}}>設定截止日提醒 →</a>
        </div>

        {/* 訂閱按鈕 — 永遠顯示 */}
        <div style={{background:"linear-gradient(135deg,#2A5A9A,#1A3A6A)",borderRadius:16,padding:20,textAlign:"center",marginBottom:16}}>
          <div style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:6}}>需要中文全程指引？</div>
          <div style={{fontSize:13,color:"#9ABCE8",marginBottom:16,lineHeight:1.6}}>基礎陪跑 $19.9/月 · 全程陪跑 $49.9/月<br/>截止日提醒 · 延期申請信 · 優先房東匹配</div>
          <a href="/pricing" style={{display:"inline-block",padding:"12px 32px",borderRadius:50,background:"linear-gradient(135deg,#FFD066,#FFA500)",color:"#1A2B4A",fontSize:14,fontWeight:800,textDecoration:"none"}}>
            查看陪跑套餐 →
          </a>
        </div>

        <div style={{textAlign:"center",fontSize:11,color:"#A0AABF",paddingBottom:32}}>住易 ZhuYi · Section 8 持券找房服務</div>
      </div>
    </div>
  );
}
