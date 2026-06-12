"use client";
import {useState} from "react";
export default function LandlordPage(){
  const [name,setName]=useState(""); const [phone,setPhone]=useState("");
  const [boro,setBoro]=useState(""); const [units,setUnits]=useState("1");
  const [status,setStatus]=useState("new"); const [submitted,setSubmitted]=useState(false);
  const [toast,setToast]=useState("");
  function showToast(m:string){setToast(m);setTimeout(()=>setToast(""),2500);}
  function handleSubmit(){
    if(!name||!phone||!boro){showToast("請填寫姓名、電話和所在區");return;}
    setSubmitted(true);
    setTimeout(()=>document.getElementById("lr")?.scrollIntoView({behavior:"smooth"}),80);
  }
  const STEPS=[
    {num:"01",icon:"✅",title:"房東資格確認",items:["房屋產權清晰，無嚴重債務糾紛","無拖欠市政稅款或水電費","無嚴重違建或建築違規記錄","1978年前建築需提供鉛漆披露文件"]},
    {num:"02",icon:"📋",title:"提交租賃申請包",items:["租賃申請表（Request for Tenancy Approval）","第8條房東登記表","鉛漆披露文件（如適用）","可透過 NYCHA Owner Extranet 線上提交"]},
    {num:"03",icon:"🔍",title:"NYCHA 房屋質量檢查（HQS）",items:["提交申請包後5個工作日內安排檢查","核查電氣安全、水管、窗戶、門鎖、煙霧及CO警報器","2025年10月起採用新版 NSPIRE 標準","不合格項目需整改並重新檢查"]},
    {num:"04",icon:"📝",title:"簽訂住房援助合同（HAP）",items:["通過檢查後與 NYCHA 簽訂 HAP 合同","確定政府補貼金額和租客自付比例","租客一般支付調整後月收入的30至40%","其餘由 NYCHA 每月直接電匯給房東"]},
    {num:"05",icon:"🔄",title:"年度續租與檢查",items:["每年需提前60天提交租金調整申請","NYCHA每年進行例行複查","及時回應租客維修請求","保持Owner Extranet帳號資料最新"]},
  ];
  const iS:React.CSSProperties={width:"100%",padding:14,border:"2px solid #D0D8E8",borderRadius:12,fontSize:16,color:"#1A2B4A",background:"#FAFBFD",outline:"none"};
  return (
    <div style={{fontFamily:"PingFang TC,sans-serif",minHeight:"100vh",background:"#F7F8FA"}}>
      {toast&&<div style={{position:"fixed",bottom:30,left:"50%",transform:"translateX(-50%)",background:"#1A2B4A",color:"#fff",padding:"10px 20px",borderRadius:20,fontSize:13,zIndex:9999}}>{toast}</div>}
      <div style={{background:"#2A5A9A",padding:"0 20px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:680,margin:"0 auto",display:"flex",alignItems:"center",height:60,gap:14}}>
          <a href="/" style={{color:"#9ABCE8",fontSize:24,textDecoration:"none",lineHeight:1}}>←</a>
          <span style={{color:"#fff",fontSize:18,fontWeight:700}}>華人房東登記</span>
        </div>
      </div>
      <div style={{background:"linear-gradient(160deg,#2A5A9A 0%,#1A3A6A 100%)",padding:"48px 24px 56px",textAlign:"center"}}>
        <div style={{fontSize:14,color:"#9ABCE8",letterSpacing:2,marginBottom:8}}>住易 · 房東服務</div>
        <h1 style={{margin:0,fontSize:24,fontWeight:700,color:"#fff",lineHeight:1.35}}>接受 Section 8 持券 穩定收租不怕空置</h1>
        <p style={{margin:"12px 0 0",fontSize:14,color:"#9ABCE8",lineHeight:1.7}}>政府直接電匯補貼 每月準時到賬 住易幫你匹配合適租客</p>
        <div style={{marginTop:16,display:"flex",justifyContent:"center",gap:24}}>
          {[["2.5萬+","紐約市8券房東"],["8.5萬","持券家庭等待配對"],["5天","檢查安排時間"]].map(([n,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontSize:18,fontWeight:800,color:"#FFD066"}}>{n}</div>
              <div style={{fontSize:11,color:"#9ABCE8",marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{maxWidth:680,margin:"0 auto",padding:"20px 20px 60px"}}>
        <div style={{background:"#FFF8EC",border:"2px solid #FFD066",borderRadius:16,padding:"16px 18px",marginBottom:20}}>
          <div style={{fontSize:14,fontWeight:700,color:"#B05A00",marginBottom:6}}>⚠️ 2025至2026 重要更新</div>
          <div style={{fontSize:13,color:"#7A5A2A",lineHeight:1.7}}>
            · NYCHA 自2025年8月起暫停對等候名單申請者發放新持券，現有持券人仍可正常找房<br/>
            · 2025年10月起採用新版 NSPIRE 檢查標準（煙霧及CO警報器要求更嚴格）
          </div>
        </div>
        <div style={{background:"#fff",borderRadius:20,padding:22,boxShadow:"0 2px 14px rgba(0,0,0,0.07)",marginBottom:20}}>
          <div style={{fontSize:16,fontWeight:700,color:"#1A2B4A",marginBottom:16}}>📋 成為8券房東：五步流程</div>
          {STEPS.map((s,i)=>(
            <div key={s.num} style={{display:"flex",gap:14,marginBottom:i<STEPS.length-1?20:0}}>
              <div style={{flexShrink:0}}>
                <div style={{width:36,height:36,borderRadius:"50%",background:"#1A2B4A",color:"#fff",fontSize:13,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>{s.num}</div>
              </div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                  <span style={{fontSize:18}}>{s.icon}</span>
                  <span style={{fontSize:15,fontWeight:700,color:"#1A2B4A"}}>{s.title}</span>
                </div>
                {s.items.map((item,j)=>(
                  <div key={j} style={{display:"flex",gap:8,marginBottom:6,alignItems:"flex-start"}}>
                    <div style={{width:5,height:5,borderRadius:"50%",background:"#2A5A9A",flexShrink:0,marginTop:7}}/>
                    <span style={{fontSize:13,color:"#4A5A7A",lineHeight:1.6}}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{background:"#fff",borderRadius:20,padding:"26px 22px",boxShadow:"0 2px 14px rgba(0,0,0,0.08)",marginBottom:20}}>
          <div style={{fontSize:16,fontWeight:700,color:"#1A2B4A",marginBottom:6}}>🏘️ 在住易登記你的房源</div>
          <div style={{fontSize:13,color:"#8899B0",marginBottom:18}}>住易優先為你匹配有持券的華人租客，免中介費</div>
          <div style={{marginBottom:16}}>
            <label style={{display:"block",fontSize:15,color:"#5A6A8A",marginBottom:8,fontWeight:600}}>你的姓名</label>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="例：王先生 / Mr. Wang" style={iS}/>
          </div>
          <div style={{marginBottom:16}}>
            <label style={{display:"block",fontSize:15,color:"#5A6A8A",marginBottom:8,fontWeight:600}}>聯繫電話</label>
            <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="例：718-555-0123" style={iS}/>
          </div>
          {[
            {label:"房源所在區",val:boro,set:setBoro,opts:[{v:"",l:"請選擇"},{v:"manhattan",l:"曼哈頓"},{v:"brooklyn",l:"布魯克林"},{v:"queens",l:"皇后區"},{v:"bronx",l:"布朗克斯"},{v:"staten",l:"史泰登島"}]},
            {label:"可出租單元數",val:units,set:setUnits,opts:[{v:"1",l:"1套"},{v:"2-5",l:"2至5套"},{v:"6-10",l:"6至10套"},{v:"11+",l:"11套以上"}]},
            {label:"目前狀態",val:status,set:setStatus,opts:[{v:"new",l:"剛開始了解，想知道流程"},{v:"ready",l:"房屋已準備好，可以接受檢查"},{v:"inspected",l:"已通過檢查，正在找租客"},{v:"existing",l:"已有8券租客，想增加房源"}]},
          ].map((f,i)=>(
            <div key={i} style={{marginBottom:16}}>
              <label style={{display:"block",fontSize:15,color:"#5A6A8A",marginBottom:8,fontWeight:600}}>{f.label}</label>
              <select value={f.val} onChange={e=>f.set(e.target.value)} style={iS}>
                {f.opts.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
              </select>
            </div>
          ))}
          <button onClick={handleSubmit} style={{width:"100%",padding:16,borderRadius:14,border:"none",background:"linear-gradient(135deg,#2A5A9A 0%,#1A3A6A 100%)",color:"#fff",fontSize:18,fontWeight:700,cursor:"pointer",boxShadow:"0 4px 16px rgba(42,90,154,0.3)"}}>提交登記</button>
        </div>
        {submitted&&(
          <div id="lr">
            <div style={{background:"#F0FAF5",border:"2.5px solid #3A8A5A",borderRadius:20,padding:22,marginBottom:16,textAlign:"center"}}>
              <div style={{fontSize:28,fontWeight:800,color:"#3A8A5A",marginBottom:8}}>✅ 登記成功</div>
              <div style={{fontSize:14,color:"#5A6A8A"}}>住易將優先為你匹配有持券的華人租客</div>
            </div>
          </div>
        )}
        <div style={{textAlign:"center",fontSize:11,color:"#A0AABF",marginTop:24}}>資料來源：NYCHA官網 2025 · 住易 ZhuYi</div>
      </div>
    </div>
  );
}
