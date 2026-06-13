"use client";
import { useState } from "react";

const PLANS = [
  {
    id: "free",
    name: "免費版",
    nameEn: "FREE",
    price: "免費",
    priceSub: "永久免費",
    color: "#5A6A8A",
    border: "#D0D8E8",
    btnBg: "#F4F6FB",
    btnColor: "#5A6A8A",
    btnText: "免費使用",
    btnHref: "/ami",
    highlight: false,
    tag: "",
    features: [
      {text:"AMI收入資格測算",ok:true},
      {text:"HUD 2026年最新數據",ok:true},
      {text:"五個收入檔位對照表",ok:true},
      {text:"各區NYCHA/HPD房源數量",ok:true},
      {text:"申請狀態診斷（基礎版）",ok:true},
      {text:"中文填表指引",ok:false},
      {text:"截止日集中提醒",ok:false},
      {text:"申請狀態統一看板",ok:false},
      {text:"文件清單自動生成",ok:false},
      {text:"優先房東匹配",ok:false},
    ],
  },
  {
    id: "paopao_monthly",
    name: "申請陪跑",
    nameEn: "STARTER",
    price: "$19.9",
    priceSub: "/ 月，隨時取消",
    color: "#2A5A9A",
    border: "#2A5A9A",
    btnBg: "linear-gradient(135deg,#2A5A9A,#1A3A6A)",
    btnColor: "#fff",
    btnText: "立即訂閱",
    btnHref: null,
    highlight: false,
    tag: "",
    features: [
      {text:"AMI收入資格測算",ok:true},
      {text:"HUD 2026年最新數據",ok:true},
      {text:"五個收入檔位對照表",ok:true},
      {text:"各區NYCHA/HPD房源數量",ok:true},
      {text:"申請狀態診斷（基礎版）",ok:true},
      {text:"中文填表指引（逐欄說明）",ok:true},
      {text:"截止日集中提醒",ok:true},
      {text:"申請狀態統一看板",ok:true},
      {text:"文件清單自動生成",ok:true},
      {text:"優先房東匹配",ok:false},
    ],
  },
  {
    id: "annual_renewal",
    name: "年審通",
    nameEn: "PRO",
    price: "$79",
    priceSub: "/ 年，約$6.6/月",
    color: "#4A8F6F",
    border: "#4A8F6F",
    btnBg: "linear-gradient(135deg,#4A8F6F,#2A6A4F)",
    btnColor: "#fff",
    btnText: "訂閱年審通",
    btnHref: null,
    highlight: true,
    tag: "最受歡迎",
    features: [
      {text:"AMI收入資格測算",ok:true},
      {text:"HUD 2026年最新數據",ok:true},
      {text:"五個收入檔位對照表",ok:true},
      {text:"各區NYCHA/HPD房源數量",ok:true},
      {text:"申請狀態診斷（完整版）",ok:true},
      {text:"中文填表指引（逐欄說明）",ok:true},
      {text:"截止日集中提醒（全年）",ok:true},
      {text:"申請狀態統一看板",ok:true},
      {text:"文件清單自動生成",ok:true},
      {text:"優先房東匹配（一次）",ok:true},
    ],
  },
];

const FAQS = [
  {q:"可以隨時取消嗎？",a:"可以。訂閱計劃隨時取消，取消後當期結束前仍可使用，不會繼續扣款。"},
  {q:"支持哪些付款方式？",a:"支持Visa、Mastercard、American Express等信用卡及借記卡，通過Stripe安全加密處理。"},
  {q:"首月免費優惠碼怎麼用？",a:"在Stripe付款頁面點擊「添加促銷碼」，輸入 ZHUYI100 即可享受首月免費。限用100次。"},
  {q:"免費版和付費版有什麼區別？",a:"免費版可使用AMI測算和基礎診斷。付費版增加中文填表指引、截止日提醒、申請狀態看板和文件清單功能。"},
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string|null>(null);
  const [toast, setToast] = useState("");

  function showToast(m:string){setToast(m);setTimeout(()=>setToast(""),3000);}

  async function handleCheckout(plan:string){
    setLoading(plan);
    try{
      const res=await fetch("/api/checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({plan})});
      const data=await res.json();
      if(data.url){window.location.href=data.url;}
      else{showToast("付款頁面載入失敗，請稍後再試");setLoading(null);}
    }catch{showToast("網絡錯誤，請稍後再試");setLoading(null);}
  }

  return (
    <div style={{fontFamily:"PingFang TC,sans-serif",minHeight:"100vh",background:"#F7F8FA"}}>
      {toast&&<div style={{position:"fixed",bottom:30,left:"50%",transform:"translateX(-50%)",background:"#1A2B4A",color:"#fff",padding:"10px 20px",borderRadius:20,fontSize:13,zIndex:9999}}>{toast}</div>}

      <div style={{background:"#2A5A9A",padding:"0 20px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:960,margin:"0 auto",display:"flex",alignItems:"center",height:60,gap:14}}>
          <a href="/" style={{color:"#9ABCE8",fontSize:24,textDecoration:"none",lineHeight:1}}>←</a>
          <span style={{color:"#fff",fontSize:18,fontWeight:700}}>服務與定價</span>
        </div>
      </div>

      <div style={{background:"linear-gradient(160deg,#2A5A9A 0%,#1A3A6A 100%)",padding:"48px 24px 56px",textAlign:"center"}}>
        <div style={{fontSize:14,color:"#9ABCE8",letterSpacing:2,marginBottom:8}}>住易 · 透明定價</div>
        <h1 style={{margin:0,fontSize:28,fontWeight:800,color:"#fff",lineHeight:1.35}}>選擇適合你的方案</h1>
        <p style={{margin:"12px 0 16px",fontSize:15,color:"#9ABCE8",lineHeight:1.7}}>從免費測算到全程陪跑  隨時升級  隨時取消</p>
        <div style={{display:"inline-block",background:"rgba(255,208,102,0.15)",border:"1px solid rgba(255,208,102,0.4)",borderRadius:20,padding:"7px 18px",fontSize:13,color:"#FFD066",fontWeight:600}}>
          🎁 首月免費優惠碼：ZHUYI100
        </div>
      </div>

      <div style={{maxWidth:960,margin:"0 auto",padding:"32px 20px 60px"}}>

        {/* 三欄定價 */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:20}}>
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
              <div style={{padding:"24px 20px 16px",flex:1,display:"flex",flexDirection:"column"}}>
                <div style={{fontSize:11,color:plan.color,fontWeight:800,letterSpacing:3,marginBottom:6}}>{plan.nameEn}</div>
                <div style={{fontSize:22,fontWeight:800,color:"#1A2B4A",marginBottom:16}}>{plan.name}</div>
                <div style={{paddingBottom:18,marginBottom:18,borderBottom:"1px solid #F0F3F8"}}>
                  <span style={{fontSize:38,fontWeight:800,color:plan.color}}>{plan.price}</span>
                  <div style={{fontSize:12,color:"#8899B0",marginTop:4}}>{plan.priceSub}</div>
                </div>
                <div style={{flex:1}}>
                  {plan.features.map((f,i)=>(
                    <div key={i} style={{display:"flex",gap:8,marginBottom:9,alignItems:"flex-start"}}>
                      <span style={{fontSize:13,color:f.ok?plan.color:"#D0D8E8",flexShrink:0,fontWeight:700,marginTop:1}}>{f.ok?"✓":"✗"}</span>
                      <span style={{fontSize:13,color:f.ok?"#2A3A5A":"#B0BBC8",lineHeight:1.5}}>{f.text}</span>
                    </div>
                  ))}
                </div>
                <div style={{marginTop:20}}>
                  {plan.btnHref?(
                    <a href={plan.btnHref} style={{
                      display:"block",padding:"13px",borderRadius:12,
                      background:plan.btnBg,color:plan.btnColor,
                      fontSize:15,fontWeight:700,textAlign:"center",textDecoration:"none",
                    }}>{plan.btnText}</a>
                  ):(
                    <button onClick={()=>handleCheckout(plan.id)} disabled={!!loading}
                      style={{
                        width:"100%",padding:"13px",borderRadius:12,border:"none",
                        background:loading===plan.id?"#aaa":plan.btnBg,
                        color:plan.btnColor,fontSize:15,fontWeight:700,
                        cursor:loading?"not-allowed":"pointer",
                      }}>
                      {loading===plan.id?"處理中...":plan.btnText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 撮合佣金 */}
        <div style={{background:"#fff",borderRadius:20,padding:"22px 24px",border:"1.5px solid #D0D8E8",marginBottom:24}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
            <div style={{flex:1}}>
              <div style={{fontSize:11,color:"#B05A00",fontWeight:800,letterSpacing:3,marginBottom:6}}>ADD-ON</div>
              <div style={{fontSize:18,fontWeight:800,color:"#1A2B4A",marginBottom:6}}>🤝 持券成功找房撮合</div>
              <div style={{fontSize:13,color:"#6A7A9A",lineHeight:1.7}}>
                住易為Section 8持券人配對接受8券的華人房東<br/>
                成功簽約後一次性收費 · 不成功不收費
              </div>
            </div>
            <div style={{textAlign:"center",flexShrink:0}}>
              <div style={{fontSize:32,fontWeight:800,color:"#B05A00"}}>$1,400</div>
              <div style={{fontSize:12,color:"#8899B0",marginBottom:10}}>成功簽約後收取</div>
              <a href="/voucher" style={{display:"inline-block",padding:"10px 20px",borderRadius:10,background:"#B05A00",color:"#fff",fontSize:13,fontWeight:700,textDecoration:"none"}}>登記找房 →</a>
            </div>
          </div>
        </div>

        {/* 常見問題 */}
        <div style={{fontSize:17,fontWeight:700,color:"#1A2B4A",marginBottom:14,textAlign:"center"}}>常見問題</div>
        {FAQS.map((item,i)=>(
          <div key={i} style={{background:"#fff",borderRadius:14,padding:"16px 18px",marginBottom:8,border:"1px solid #ECEEF3"}}>
            <div style={{fontSize:14,fontWeight:700,color:"#1A2B4A",marginBottom:5}}>Q: {item.q}</div>
            <div style={{fontSize:13,color:"#5A6A8A",lineHeight:1.7}}>A: {item.a}</div>
          </div>
        ))}

        <div style={{textAlign:"center",fontSize:11,color:"#A0AABF",marginTop:20}}>
          安全支付 · Stripe加密 · 住易 ZhuYi · 紐約華人住房福利平台
        </div>
      </div>
    </div>
  );
}
