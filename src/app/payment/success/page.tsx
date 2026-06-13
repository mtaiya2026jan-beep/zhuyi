"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
const PLAN_NAMES: Record<string,string> = {
  paopao_monthly:"申請陪跑計劃",
  annual_renewal:"年審通",
  matching:"持券找房撮合服務"
};
function SuccessContent() {
  const params = useSearchParams();
  const plan = params.get("plan") || "";
  return (
    <div style={{fontFamily:"PingFang TC,sans-serif",minHeight:"100vh",background:"#F7F8FA",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{background:"#fff",borderRadius:24,padding:"48px 36px",maxWidth:480,width:"100%",margin:"0 20px",textAlign:"center",boxShadow:"0 4px 24px rgba(0,0,0,0.08)"}}>
        <div style={{fontSize:64,marginBottom:20}}>🎉</div>
        <h1 style={{fontSize:26,fontWeight:800,color:"#1A2B4A",marginBottom:12}}>付款成功！</h1>
        <div style={{fontSize:16,color:"#5A6A8A",marginBottom:8}}>你已成功訂閱</div>
        <div style={{fontSize:20,fontWeight:700,color:"#2A5A9A",marginBottom:24}}>{PLAN_NAMES[plan] || "住易服務"}</div>
        <div style={{background:"#F0FAF5",border:"1.5px solid #3A8A5A",borderRadius:14,padding:"16px 20px",marginBottom:28,textAlign:"left"}}>
          <div style={{fontSize:14,color:"#3A8A5A",fontWeight:700,marginBottom:8}}>✅ 接下來</div>
          <div style={{fontSize:13,color:"#4A5A7A",lineHeight:1.8}}>
            · 確認電郵已發送到你的信箱<br/>
            · 住易團隊將在24小時內聯繫你<br/>
            · 如有問題請聯繫 support@zhuyi.app
          </div>
        </div>
        <a href="/" style={{display:"block",padding:"14px",borderRadius:14,background:"linear-gradient(135deg,#1A2B4A 0%,#2A4A7A 100%)",color:"#fff",fontSize:16,fontWeight:700,textDecoration:"none"}}>返回首頁</a>
      </div>
    </div>
  );
}
export default function SuccessPage() {
  return <Suspense fallback={<div style={{textAlign:"center",padding:60}}>載入中...</div>}><SuccessContent /></Suspense>;
}
