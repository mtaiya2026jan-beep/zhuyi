"use client";
import {useState} from "react";

const T={
  zh:{
    nav:"華人房東登記",
    hero_sub:"住易 · 房東服務",
    hero_title:"接受 Section 8 持券\n穩定收租不怕空置",
    hero_desc:"政府直接電匯補貼 每月準時到賬 住易幫你匹配合適租客",
    stats:[["2.5萬+","紐約市8券房東"],["8.5萬","持券家庭等待配對"],["5天","檢查安排時間"]],
    alert_title:"⚠️ 2025至2026 重要更新",
    alert_body:"· NYCHA 自2025年8月起暫停對等候名單申請者發放新持券，現有持券人仍可正常找房\n· 2025年10月起採用新版 NSPIRE 檢查標準（煙霧及CO警報器要求更嚴格）",
    steps_title:"📋 成為8券房東：五步流程",
    steps:[
      {num:"01",icon:"✅",title:"房東資格確認",items:["房屋產權清晰，無嚴重債務糾紛","無拖欠市政稅款或水電費","無嚴重違建或建築違規記錄","1978年前建築需提供鉛漆披露文件"]},
      {num:"02",icon:"📋",title:"提交租賃申請包",items:["租賃申請表（Request for Tenancy Approval）","第8條房東登記表","鉛漆披露文件（如適用）","可透過 NYCHA Owner Extranet 線上提交"]},
      {num:"03",icon:"🔍",title:"NYCHA 房屋質量檢查（HQS）",items:["提交申請包後5個工作日內安排檢查","核查電氣安全、水管、窗戶、門鎖、煙霧及CO警報器","2025年10月起採用新版 NSPIRE 標準","不合格項目需整改並重新檢查"]},
      {num:"04",icon:"📝",title:"簽訂住房援助合同（HAP）",items:["通過檢查後與 NYCHA 簽訂 HAP 合同","確定政府補貼金額和租客自付比例","租客一般支付調整後月收入的30至40%","其餘由 NYCHA 每月直接電匯給房東"]},
      {num:"05",icon:"🔄",title:"年度續租與檢查",items:["每年需提前60天提交租金調整申請","NYCHA每年進行例行複查","及時回應租客維修請求","保持Owner Extranet帳號資料最新"]},
    ],
    form_title:"🏘️ 在住易登記你的房源",
    form_desc:"住易優先為你匹配有持券的華人租客，免中介費",
    name_label:"你的姓名",name_ph:"例：王先生 / Mr. Wang",
    phone_label:"聯繫電話",phone_ph:"例：718-555-0123",
    boro_label:"房源所在區",
    units_label:"可出租單元數",
    status_label:"目前狀態",
    boros:[{v:"",l:"請選擇"},{v:"manhattan",l:"曼哈頓"},{v:"brooklyn",l:"布魯克林"},{v:"queens",l:"皇后區"},{v:"bronx",l:"布朗克斯"},{v:"staten",l:"史泰登島"}],
    units:[{v:"1",l:"1套"},{v:"2-5",l:"2至5套"},{v:"6-10",l:"6至10套"},{v:"11+",l:"11套以上"}],
    statuses:[{v:"new",l:"剛開始了解，想知道流程"},{v:"ready",l:"房屋已準備好，可以接受檢查"},{v:"inspected",l:"已通過檢查，正在找租客"},{v:"existing",l:"已有8券租客，想增加房源"}],
    submit:"提交登記",
    success_title:"✅ 登記成功",
    success_desc:"住易將優先為你匹配有持券的華人租客",
    error:"請填寫姓名、電話和所在區",
    footer:"資料來源：NYCHA官網 2025 · 住易 ZhuYi",
    lang_btn:"English",
  },
  en:{
    nav:"Landlord Registration",
    hero_sub:"ZhuYi · Landlord Services",
    hero_title:"Accept Section 8 Vouchers\nStable Rent, No Vacancy Worries",
    hero_desc:"Government subsidy deposited monthly · ZhuYi matches you with qualified tenants",
    stats:[["25,000+","NYC Section 8 Landlords"],["85,000","Voucher Families Waiting"],["5 Days","Inspection Turnaround"]],
    alert_title:"⚠️ 2025–2026 Important Updates",
    alert_body:"· NYCHA suspended issuing new vouchers to waitlist applicants since August 2025; existing voucher holders may still search\n· New NSPIRE inspection standards effective October 2025 (stricter smoke & CO detector requirements)",
    steps_title:"📋 Become a Section 8 Landlord: 5 Steps",
    steps:[
      {num:"01",icon:"✅",title:"Landlord Eligibility",items:["Clear property title, no serious debt disputes","No outstanding municipal taxes or utility arrears","No serious building code violations","Lead paint disclosure required for pre-1978 buildings"]},
      {num:"02",icon:"📋",title:"Submit Tenancy Package",items:["Request for Tenancy Approval (RTA) form","Section 8 Landlord Registration form","Lead paint disclosure (if applicable)","Submit via NYCHA Owner Extranet online"]},
      {num:"03",icon:"🔍",title:"NYCHA Housing Quality Standards (HQS) Inspection",items:["Inspection scheduled within 5 business days","Checks electrical, plumbing, windows, locks, smoke & CO detectors","New NSPIRE standards effective October 2025","Failed items must be corrected and re-inspected"]},
      {num:"04",icon:"📝",title:"Sign Housing Assistance Payment (HAP) Contract",items:["Sign HAP contract with NYCHA after passing inspection","Government subsidy and tenant share determined","Tenant typically pays 30–40% of adjusted monthly income","NYCHA directly deposits the rest to landlord monthly"]},
      {num:"05",icon:"🔄",title:"Annual Renewal & Inspection",items:["Submit rent increase request 60 days before renewal","NYCHA conducts annual inspection","Respond promptly to tenant maintenance requests","Keep Owner Extranet account information current"]},
    ],
    form_title:"🏘️ List Your Unit on ZhuYi",
    form_desc:"ZhuYi prioritizes matching you with Chinese-American voucher tenants — no broker fee",
    name_label:"Your Name",name_ph:"e.g. Mr. Wang / 王先生",
    phone_label:"Phone Number",phone_ph:"e.g. 718-555-0123",
    boro_label:"Borough",
    units_label:"Available Units",
    status_label:"Current Status",
    boros:[{v:"",l:"Select borough"},{v:"manhattan",l:"Manhattan"},{v:"brooklyn",l:"Brooklyn"},{v:"queens",l:"Queens"},{v:"bronx",l:"Bronx"},{v:"staten",l:"Staten Island"}],
    units:[{v:"1",l:"1 unit"},{v:"2-5",l:"2–5 units"},{v:"6-10",l:"6–10 units"},{v:"11+",l:"11+ units"}],
    statuses:[{v:"new",l:"Just learning, want to understand the process"},{v:"ready",l:"Unit is ready for inspection"},{v:"inspected",l:"Passed inspection, looking for tenant"},{v:"existing",l:"Already have Section 8 tenant, adding more units"}],
    submit:"Submit Registration",
    success_title:"✅ Registration Successful",
    success_desc:"ZhuYi will prioritize matching you with qualified voucher tenants",
    error:"Please fill in name, phone, and borough",
    footer:"Source: NYCHA Official 2025 · ZhuYi",
    lang_btn:"中文",
  },
};

export default function LandlordPage(){
  const [lang,setLang]=useState<"zh"|"en">("zh");
  const t=T[lang];
  const [name,setName]=useState("");
  const [phone,setPhone]=useState("");
  const [boro,setBoro]=useState("");
  const [units,setUnits]=useState("1");
  const [status,setStatus]=useState("new");
  const [submitted,setSubmitted]=useState(false);
  const [toast,setToast]=useState("");

  function showToast(m:string){setToast(m);setTimeout(()=>setToast(""),2500);}

  async function handleSubmit(){
    if(!name||!phone||!boro){showToast(t.error);return;}
    try{
      await fetch("/api/landlord",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({contact_name:name,contact_phone:phone,borough:boro,bedrooms_available:units,accepts_section8:true,is_active:true,status})});
    }catch(e){console.error(e);}
    setSubmitted(true);
    setTimeout(()=>document.getElementById("lr")?.scrollIntoView({behavior:"smooth"}),80);
  }

  const iS:React.CSSProperties={width:"100%",padding:14,border:"2px solid #D0D8E8",borderRadius:12,fontSize:16,color:"#1A2B4A",background:"#FAFBFD",outline:"none"};

  return(
    <div style={{fontFamily:"PingFang TC,sans-serif",minHeight:"100vh",background:"#F7F8FA"}}>
      {toast&&<div style={{position:"fixed",bottom:30,left:"50%",transform:"translateX(-50%)",background:"#1A2B4A",color:"#fff",padding:"10px 20px",borderRadius:20,fontSize:13,zIndex:9999}}>{toast}</div>}

      <div style={{background:"#2A5A9A",padding:"0 20px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:680,margin:"0 auto",display:"flex",alignItems:"center",height:60,gap:14}}>
          <a href="/" style={{color:"#9ABCE8",fontSize:24,textDecoration:"none",lineHeight:1}}>←</a>
          <span style={{color:"#fff",fontSize:18,fontWeight:700,flex:1}}>{t.nav}</span>
          <button onClick={()=>setLang(lang==="zh"?"en":"zh")}
            style={{padding:"6px 14px",borderRadius:20,border:"1.5px solid #9ABCE8",background:"transparent",color:"#9ABCE8",fontSize:13,fontWeight:600,cursor:"pointer"}}>
            {t.lang_btn}
          </button>
        </div>
      </div>

      <div style={{background:"linear-gradient(160deg,#2A5A9A 0%,#1A3A6A 100%)",padding:"48px 24px 56px",textAlign:"center"}}>
        <div style={{fontSize:14,color:"#9ABCE8",letterSpacing:2,marginBottom:8}}>{t.hero_sub}</div>
        <h1 style={{margin:0,fontSize:24,fontWeight:700,color:"#fff",lineHeight:1.5,whiteSpace:"pre-line"}}>{t.hero_title}</h1>
        <p style={{margin:"12px 0 0",fontSize:14,color:"#9ABCE8",lineHeight:1.7}}>{t.hero_desc}</p>
        <div style={{marginTop:16,display:"flex",justifyContent:"center",gap:24}}>
          {t.stats.map(([n,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontSize:18,fontWeight:800,color:"#FFD066"}}>{n}</div>
              <div style={{fontSize:11,color:"#9ABCE8",marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{maxWidth:680,margin:"0 auto",padding:"20px 20px 60px"}}>
        <div style={{background:"#FFF8EC",border:"2px solid #FFD066",borderRadius:16,padding:"16px 18px",marginBottom:20}}>
          <div style={{fontSize:14,fontWeight:700,color:"#B05A00",marginBottom:6}}>{t.alert_title}</div>
          <div style={{fontSize:13,color:"#7A5A2A",lineHeight:1.7,whiteSpace:"pre-line"}}>{t.alert_body}</div>
        </div>

        <div style={{background:"#fff",borderRadius:20,padding:22,boxShadow:"0 2px 14px rgba(0,0,0,0.07)",marginBottom:20}}>
          <div style={{fontSize:16,fontWeight:700,color:"#1A2B4A",marginBottom:16}}>{t.steps_title}</div>
          {t.steps.map((s,i)=>(
            <div key={s.num} style={{display:"flex",gap:14,marginBottom:i<t.steps.length-1?20:0}}>
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
          <div style={{fontSize:16,fontWeight:700,color:"#1A2B4A",marginBottom:6}}>{t.form_title}</div>
          <div style={{fontSize:13,color:"#8899B0",marginBottom:18}}>{t.form_desc}</div>
          <div style={{marginBottom:16}}>
            <label style={{display:"block",fontSize:15,color:"#5A6A8A",marginBottom:8,fontWeight:600}}>{t.name_label}</label>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder={t.name_ph} style={iS}/>
          </div>
          <div style={{marginBottom:16}}>
            <label style={{display:"block",fontSize:15,color:"#5A6A8A",marginBottom:8,fontWeight:600}}>{t.phone_label}</label>
            <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder={t.phone_ph} style={iS}/>
          </div>
          {[
            {label:t.boro_label,val:boro,set:setBoro,opts:t.boros},
            {label:t.units_label,val:units,set:setUnits,opts:t.units},
            {label:t.status_label,val:status,set:setStatus,opts:t.statuses},
          ].map((f,i)=>(
            <div key={i} style={{marginBottom:16}}>
              <label style={{display:"block",fontSize:15,color:"#5A6A8A",marginBottom:8,fontWeight:600}}>{f.label}</label>
              <select value={f.val} onChange={e=>f.set(e.target.value)} style={iS}>
                {f.opts.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
              </select>
            </div>
          ))}
          <button onClick={handleSubmit} style={{width:"100%",padding:16,borderRadius:14,border:"none",background:"linear-gradient(135deg,#2A5A9A 0%,#1A3A6A 100%)",color:"#fff",fontSize:18,fontWeight:700,cursor:"pointer"}}>
            {t.submit}
          </button>
        </div>

        {submitted&&(
          <div id="lr">
            <div style={{background:"#F0FAF5",border:"2.5px solid #3A8A5A",borderRadius:20,padding:22,marginBottom:16,textAlign:"center"}}>
              <div style={{fontSize:28,fontWeight:800,color:"#3A8A5A",marginBottom:8}}>{t.success_title}</div>
              <div style={{fontSize:14,color:"#5A6A8A"}}>{t.success_desc}</div>
            </div>
          </div>
        )}
        <div style={{textAlign:"center",fontSize:11,color:"#A0AABF",marginTop:24}}>{t.footer}</div>
      </div>
    </div>
  );
}
