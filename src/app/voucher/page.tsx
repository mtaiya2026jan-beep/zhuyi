"use client";
import {useState} from "react";
function getUrgency(days:number){
  if(days<=30) return {label:"🔴 緊急",sub:"30天內到期，立刻行動",color:"#E84A4A",bg:"#FFF0F0",border:"#E84A4A"};
  if(days<=60) return {label:"🟠 優先",sub:"60天內到期，盡快找房",color:"#E87D2A",bg:"#FFF6EE",border:"#E87D2A"};
  if(days<=120) return {label:"🟡 正常",sub:"120天內到期，按計劃推進",color:"#D4A017",bg:"#FFFBEE",border:"#D4A017"};
  return {label:"🟢 充裕",sub:"超過120天，從容準備",color:"#3A8A5A",bg:"#F0FAF4",border:"#3A8A5A"};
}
export default function VoucherPage(){
  const [name,setName]=useState(""); const [phone,setPhone]=useState("");
  const [size,setSize]=useState("3"); const [boro,setBoro]=useState("");
  const [expiry,setExpiry]=useState(""); const [sub,setSub]=useState(false);
  const [days,setDays]=useState(0); const [urg,setUrg]=useState<ReturnType<typeof getUrgency>|null>(null);
  const [toast,setToast]=useState(""); const [saving,setSaving]=useState(false);

  function showToast(m:string){setToast(m);setTimeout(()=>setToast(""),2500);}

  async function handleSubmit(){
    if(!name||!phone||!expiry){showToast("請填寫姓名、電話和持券到期日");return;}
    const d=Math.round((new Date(expiry).getTime()-Date.now())/86400000);
    if(d<0){showToast("持券已過期，請聯繫住房局申請延期");return;}
    const urgency=getUrgency(d);
    setDays(d);setUrg(urgency);setSub(true);
    setTimeout(()=>document.getElementById("vr")?.scrollIntoView({behavior:"smooth"}),80);

    // 寫入Supabase
    setSaving(true);
    try {
      const res = await fetch("/api/voucher",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name,phone,size,borough:boro,expiry,days:d,urgency:urgency.label})
      });
      const data = await res.json();
      console.log("[VOUCHER] 登記結果:", data);
    } catch(e) {
      console.error("[VOUCHER] 登記失敗:", e);
    } finally {
      setSaving(false);
    }
  }

  const today=new Date().toISOString().split("T")[0];
  const BOROS=["曼哈頓","布魯克林","皇后區","布朗克斯","史泰登島"];
  const iS:React.CSSProperties={width:"100%",padding:14,border:"2px solid #D0D8E8",borderRadius:12,fontSize:16,color:"#1A2B4A",background:"#FAFBFD",outline:"none"};

  return (
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
        <p style={{margin:"10px 0 0",fontSize:14,color:"#9ABCE8",lineHeight:1.7}}>系統根據到期時間自動設定優先級  緊急個案優先處理</p>
      </div>
      <div style={{maxWidth:680,margin:"0 auto",padding:"24px 20px 60px"}}>
        <div style={{background:"#fff",borderRadius:20,padding:"26px 22px",boxShadow:"0 2px 14px rgba(0,0,0,0.08)",marginBottom:20}}>
          <div style={{fontSize:16,fontWeight:700,color:"#1A2B4A",marginBottom:20}}>📋 填寫基本資訊</div>
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
            <label style={{display:"block",fontSize:15,color:"#5A6A8A",marginBottom:8,fontWeight:600}}>希望搬到紐約哪個區</label>
            <select value={boro} onChange={e=>setBoro(e.target.value)} style={iS}>
              <option value="">不限，均可</option>
              {BOROS.map(b=><option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div style={{marginBottom:20}}>
            <label style={{display:"block",fontSize:15,color:"#5A6A8A",marginBottom:8,fontWeight:600}}>持券到期日 <span style={{color:"#E84A4A"}}>★ 必填</span></label>
            <input type="date" value={expiry} onChange={e=>setExpiry(e.target.value)} min={today} style={iS}/>
            <div style={{fontSize:12,color:"#8899B0",marginTop:6}}>到期日印在持券信封上，通常為核發後90至120天</div>
          </div>
          <div style={{background:"#F7F8FA",borderRadius:14,padding:14,marginBottom:18}}>
            <div style={{fontSize:14,fontWeight:700,color:"#1A2B4A",marginBottom:10}}>優先級說明</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {[{e:"🔴 緊急",d:"30天內",c:"#E84A4A"},{e:"🟠 優先",d:"60天內",c:"#E87D2A"},{e:"🟡 正常",d:"120天內",c:"#D4A017"},{e:"🟢 充裕",d:"120天以上",c:"#3A8A5A"}].map(x=>(
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
            {saving?"登記中...":"提交登記"}
          </button>
        </div>

        {sub&&urg&&(
          <div id="vr">
            <div style={{background:urg.bg,border:"2.5px solid "+urg.border,borderRadius:20,padding:24,marginBottom:16,textAlign:"center"}}>
              <div style={{fontSize:32,fontWeight:800,color:urg.color,marginBottom:8}}>{urg.label}</div>
              <div style={{fontSize:16,color:"#1A2B4A",fontWeight:600,marginBottom:6}}>{urg.sub}</div>
              <div style={{fontSize:14,color:"#5A6A8A"}}>距離到期還有 <b style={{color:urg.color}}>{days} 天</b></div>
            </div>
            <div style={{background:"#fff",borderRadius:20,padding:22,boxShadow:"0 2px 14px rgba(0,0,0,0.07)",marginBottom:16}}>
              <div style={{fontSize:16,fontWeight:700,color:"#1A2B4A",marginBottom:14}}>✅ 登記成功　你的下一步</div>
              {[
                {icon:"📞",text:days<=30?"立即致電住房局申請延期（Extension）":"住易會優先為你匹配接受Section 8的華人房東"},
                {icon:"🔍",text:"在 Housing Connect 搜尋目前開放的保障房房源"},
                {icon:"📅",text:"距離到期還有 "+days+" 天，請保持電話暢通"},
              ].map((a,i)=>(
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
        <div style={{textAlign:"center",fontSize:11,color:"#A0AABF",marginTop:24}}>住易 ZhuYi · Section 8 持券找房服務</div>
      </div>
    </div>
  );
}
