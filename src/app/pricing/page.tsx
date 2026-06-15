"use client";
import {useState} from "react";

const PLANS = [
  {
    id:"free",
    name:"免費版",
    nameEn:"FREE",
    price:"$0",
    priceSub:"永久免費",
    valueMsg:"基礎工具，隨時可用",
    color:"#5A6A8A",
    border:"#D0D8E8",
    btnBg:"#F4F6FB",
    btnColor:"#5A6A8A",
    btnText:"免費使用",
    btnHref:"/ami",
    highlight:false,
    tag:"",
    priceId:null,
    features:[
      {text:"AMI收入資格測算",ok:true},
      {text:"Housing Connect 房源查閱",ok:true},
      {text:"HUD 2026年最新數據",ok:true},
      {text:"各區NYCHA/HPD房源數量",ok:true},
      {text:"申請狀態診斷（基礎版）",ok:true},
      {text:"個性化房源每週推送",ok:false},
      {text:"中文填表指引",ok:false},
      {text:"截止日集中提醒",ok:false},
      {text:"延期申請信模板",ok:false},
      {text:"優先房東匹配服務",ok:false},
    ],
  },
  {
    id:"paopao_basic",
    name:"基礎陪跑",
    nameEn:"BASIC",
    price:"$19.9",
    priceSub:"/ 月，隨時取消",
    valueMsg:"每天不到 $0.67，住房全程指引",
    color:"#2A5A9A",
    border:"#2A5A9A",
    btnBg:"linear-gradient(135deg,#2A5A9A,#1A3A6A)",
    btnColor:"#fff",
    btnText:"立即訂閱",
    btnHref:null,
    highlight:false,
    tag:"",
    priceId:"price_1Thi3JC6gUPvob2xOtMB0n6f",
    features:[
      {text:"AMI收入資格測算",ok:true},
      {text:"Housing Connect 房源查閱",ok:true},
      {text:"HUD 2026年最新數據",ok:true},
      {text:"各區NYCHA/HPD房源數量",ok:true},
      {text:"申請狀態診斷（完整版）",ok:true},
      {text:"個性化房源每週推送",ok:true},
      {text:"中文填表指引（逐欄說明）",ok:true},
      {text:"截止日集中提醒",ok:true},
      {text:"延期申請信中文模板",ok:true},
      {text:"優先房東匹配服務",ok:false},
    ],
  },
  {
    id:"paopao_pro",
    name:"全程陪跑",
    nameEn:"PRO",
    price:"$49.9",
    priceSub:"/ 月，隨時取消",
    valueMsg:"含優先房東匹配，全程住房顧問服務",
    color:"#1A6A3A",
    border:"#1A6A3A",
    btnBg:"linear-gradient(135deg,#1A6A3A,#0A4A2A)",
    btnColor:"#fff",
    btnText:"立即訂閱",
    btnHref:null,
    highlight:true,
    tag:"最完整",
    priceId:"price_1Thi3KC6gUPvob2x2IBSa9Sp",
    features:[
      {text:"AMI收入資格測算",ok:true},
      {text:"Housing Connect 房源查閱",ok:true},
      {text:"HUD 2026年最新數據",ok:true},
      {text:"各區NYCHA/HPD房源數量",ok:true},
      {text:"申請狀態診斷（完整版）",ok:true},
      {text:"個性化房源每週推送",ok:true},
      {text:"中文填表指引（逐欄說明）",ok:true},
      {text:"截止日集中提醒",ok:true},
      {text:"延期申請信中文模板",ok:true},
      {text:"優先房東匹配（住房顧問服務）",ok:true},
    ],
  },
  {
    id:"annual",
    name:"年審通",
    nameEn:"ANNUAL",
    price:"$79",
    priceSub:"/ 年，一次付清",
    valueMsg:"已入住保障房，年審不漏接",
    color:"#7A4A9A",
    border:"#7A4A9A",
    btnBg:"linear-gradient(135deg,#7A4A9A,#5A2A7A)",
    btnColor:"#fff",
    btnText:"立即訂閱",
    btnHref:null,
    highlight:false,
    tag:"",
    priceId:"price_1Thi3KC6gUPvob2xsL1119G9",
    features:[
      {text:"Section 8 年審截止提醒",ok:true},
      {text:"Housing Connect 抽籤到期通知",ok:true},
      {text:"提前30天預警",ok:true},
      {text:"中文提醒短訊/郵件",ok:true},
      {text:"個性化房源每週推送",ok:false},
      {text:"中文填表指引",ok:false},
      {text:"截止日集中提醒",ok:false},
      {text:"優先房東匹配服務",ok:false},
    ],
  },
];

const FAQS = [
  {q:"免費版和陪跑版有什麼區別？",a:"免費版提供基礎查詢工具。陪跑版增加中文填表指引、截止日提醒、延期申請模板等全程服務，適合正在積極找房的持券人。"},
  {q:"全程陪跑的房東匹配是什麼服務？",a:"住易全程陪跑提供住房顧問服務，其中包含優先房東匹配——住易顧問會主動聯絡住易合作房東，協助安排看房及NYCHA申請包代辦。此為顧問服務，費用已包含在月費中。"},
  {q:"陪跑服務可以隨時取消嗎？",a:"可以，隨時取消，不收違約金。取消後當月服務繼續有效至週期結束。"},
  {q:"年審通和陪跑有什麼不同？",a:"年審通針對已成功租到保障房的家庭，主要功能是年審截止和抽籤到期提醒，防止因漏接通知而失去資格。陪跑套餐針對仍在找房階段的持券人。"},
  {q:"Section 8 券已超過180天還能用嗎？",a:"可以申請延期（Reasonable Accommodation），NYCHA逐案審批，無固定上限。陪跑訂閱用戶可獲延期申請中文指引及英文信件模板。"},
];

export default function PricingPage(){
  const [openFaq,setOpenFaq]=useState<number|null>(null);
  const [checkoutLoading,setCheckoutLoading]=useState<string|null>(null);

  async function handleCheckout(priceId:string){
    setCheckoutLoading(priceId);
    try{
      const res=await fetch("/api/checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({priceId})});
      const data=await res.json();
      if(data.url) window.location.href=data.url;
    }catch(e){console.error(e);}
    finally{setCheckoutLoading(null);}
  }

  return(
    <div style={{fontFamily:"PingFang TC,sans-serif",minHeight:"100vh",background:"#F7F8FA"}}>
      <div style={{background:"#2A5A9A",padding:"0 20px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:1060,margin:"0 auto",display:"flex",alignItems:"center",height:60,gap:14}}>
          <a href="/" style={{color:"#9ABCE8",fontSize:24,textDecoration:"none",lineHeight:1}}>←</a>
          <span style={{color:"#fff",fontSize:18,fontWeight:700}}>服務與定價</span>
        </div>
      </div>
      <div style={{background:"linear-gradient(160deg,#2A5A9A 0%,#1A3A6A 100%)",padding:"48px 24px 56px",textAlign:"center"}}>
        <div style={{fontSize:14,color:"#9ABCE8",letterSpacing:2,marginBottom:8}}>住易 · 透明定價</div>
        <h1 style={{margin:0,fontSize:28,fontWeight:800,color:"#fff",lineHeight:1.35}}>選擇適合你的方案</h1>
        <p style={{margin:"12px 0 16px",fontSize:15,color:"#9ABCE8",lineHeight:1.7}}>從免費測算到全程陪跑　隨時升級　隨時取消</p>
        <div style={{display:"inline-block",background:"rgba(255,208,102,0.15)",border:"1px solid rgba(255,208,102,0.4)",borderRadius:20,padding:"7px 18px",fontSize:13,color:"#FFD066",fontWeight:600}}>
          🎁 首月免費優惠碼：ZHUYI100
        </div>
      </div>

      <div style={{maxWidth:1060,margin:"0 auto",padding:"32px 20px 60px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
          {PLANS.map(plan=>(
            <div key={plan.id} style={{
              background:"#fff",borderRadius:20,overflow:"hidden",
              border:`2px solid ${plan.highlight?plan.color:"#ECEEF3"}`,
              boxShadow:plan.highlight?`0 8px 32px ${plan.color}25`:"0 2px 12px rgba(0,0,0,0.06)",
              display:"flex",flexDirection:"column",
            }}>
              {plan.tag&&(
                <div style={{background:plan.color,color:"#fff",textAlign:"center",padding:"7px",fontSize:12,fontWeight:700,letterSpacing:1}}>
                  ⭐ {plan.tag}
                </div>
              )}
              <div style={{padding:"24px 18px 16px",flex:1,display:"flex",flexDirection:"column"}}>
                <div style={{fontSize:11,color:plan.color,fontWeight:800,letterSpacing:3,marginBottom:6}}>{plan.nameEn}</div>
                <div style={{fontSize:20,fontWeight:800,color:"#1A2B4A",marginBottom:4}}>{plan.name}</div>
                <div style={{paddingBottom:14,marginBottom:14,borderBottom:"1px solid #F0F3F8"}}>
                  <div style={{display:"flex",alignItems:"baseline",gap:4,marginBottom:4}}>
                    <span style={{fontSize:28,fontWeight:800,color:plan.color}}>{plan.price}</span>
                    <span style={{fontSize:12,color:"#8A9AB0"}}>{plan.priceSub}</span>
                  </div>
                  <div style={{fontSize:11,color:"#5A7A5A",background:"#F0FAF0",borderRadius:6,padding:"4px 8px",display:"inline-block"}}>
                    💡 {plan.valueMsg}
                  </div>
                </div>
                <div style={{flex:1,display:"flex",flexDirection:"column",gap:7,marginBottom:18}}>
                  {plan.features.map((f,i)=>(
                    <div key={i} style={{display:"flex",gap:7,alignItems:"flex-start"}}>
                      <span style={{fontSize:13,color:f.ok?plan.color:"#CDD0D8",marginTop:1,flexShrink:0}}>{f.ok?"✓":"✗"}</span>
                      <span style={{fontSize:12,color:f.ok?"#2A3A5A":"#A0AABF",lineHeight:1.5}}>{f.text}</span>
                    </div>
                  ))}
                </div>
                {plan.btnHref?(
                  <a href={plan.btnHref} style={{display:"block",textAlign:"center",padding:"12px",borderRadius:12,background:plan.btnBg,color:plan.btnColor,fontSize:14,fontWeight:700,textDecoration:"none",border:`1.5px solid ${plan.border}`}}>
                    {plan.btnText}
                  </a>
                ):(
                  <button
                    onClick={()=>plan.priceId&&handleCheckout(plan.priceId)}
                    disabled={checkoutLoading===plan.priceId}
                    style={{width:"100%",padding:"12px",borderRadius:12,border:"none",background:plan.btnBg,color:plan.btnColor,fontSize:14,fontWeight:700,cursor:"pointer"}}>
                    {checkoutLoading===plan.priceId?"處理中...":plan.btnText}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{background:"#fff",borderRadius:20,padding:"24px",boxShadow:"0 2px 12px rgba(0,0,0,0.06)",marginBottom:20}}>
          <div style={{fontSize:15,fontWeight:700,color:"#1A2B4A",marginBottom:16}}>📍 四個方案對應四個階段</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
            {[
              {icon:"🔍",stage:"找房階段",plan:"基礎陪跑 $19.9/月",desc:"手持有效券，正在找接受Section 8的房東，需要中文指引和截止日提醒"},
              {icon:"🤝",stage:"急需房東匹配",plan:"全程陪跑 $49.9/月",desc:"自己找不到願意接受Section 8的房東，住易顧問優先為你匹配，含申請包代辦"},
              {icon:"🏠",stage:"已入住後",plan:"年審通 $79/年",desc:"已成功租到房，需要年審截止提醒和Housing Connect抽籤通知"},
              {icon:"💡",stage:"初步了解資格",plan:"免費版",desc:"不知道自己是否符合申請資格，先免費測算AMI和可申請項目"},
            ].map((s,i)=>(
              <div key={i} style={{background:"#F7F8FA",borderRadius:12,padding:"14px"}}>
                <div style={{fontSize:22,marginBottom:6}}>{s.icon}</div>
                <div style={{fontSize:13,fontWeight:700,color:"#1A2B4A",marginBottom:4}}>{s.stage}</div>
                <div style={{fontSize:12,color:"#2A5A9A",fontWeight:600,marginBottom:6}}>{s.plan}</div>
                <div style={{fontSize:11,color:"#5A6A8A",lineHeight:1.6}}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{background:"#fff",borderRadius:20,padding:"24px",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
          <div style={{fontSize:15,fontWeight:700,color:"#1A2B4A",marginBottom:16}}>❓ 常見問題</div>
          {FAQS.map((faq,i)=>(
            <div key={i} style={{borderBottom:i<FAQS.length-1?"1px solid #F0F3F8":"none"}}>
              <button onClick={()=>setOpenFaq(openFaq===i?null:i)}
                style={{width:"100%",textAlign:"left",padding:"14px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
                <span style={{fontSize:14,fontWeight:600,color:"#1A2B4A",lineHeight:1.5}}>{faq.q}</span>
                <span style={{fontSize:18,color:"#8A9AB0",flexShrink:0}}>{openFaq===i?"−":"+"}</span>
              </button>
              {openFaq===i&&(
                <div style={{fontSize:13,color:"#2A3A5A",lineHeight:1.8,paddingBottom:14}}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div style={{textAlign:"center",fontSize:11,color:"#A0AABF",paddingBottom:32}}>住易 ZhuYi · 紐約華人住房福利平台</div>
    </div>
  );
}
