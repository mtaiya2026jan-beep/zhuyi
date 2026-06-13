"use client";
import { useState } from "react";
const FEATURES=[
  {icon:"📋",title:"中文填表指引",desc:"逐步中文說明，每個欄位怎麼填、填什麼，不用擔心看不懂英文表格",free:false},
  {icon:"🔍",title:"自助在線申請步驟",desc:"Housing Connect、NYCHA、HCR三個平台的申請流程圖解，按步驟操作不迷路",free:false},
  {icon:"📅",title:"截止日集中提醒",desc:"Section 8年審截止、Housing Connect抽籤到期、NYCHA確認截止，統一管理不漏接",free:false},
  {icon:"📊",title:"申請狀態統一看板",desc:"所有申請項目集中顯示進度，知道每個申請卡在哪個環節",free:false},
  {icon:"📁",title:"文件清單自動生成",desc:"根據你的家庭情況和申請項目，自動列出需要準備的所有文件",free:false},
  {icon:"💬",title:"常見問題中文解答",desc:"收到政府信件看不懂？AI即時中文解釋，複雜問題轉人工顧問跟進",free:false},
  {icon:"📍",title:"按區房源數量查詢",desc:"五個區NYCHA、HPD、Section 8房東數量一目了然",free:true},
  {icon:"📊",title:"AMI資格測算",desc:"輸入收入即知道你屬於哪個檔位、可申請哪些項目",free:true},
];
export default function PaopaoPage(){
  const [loading,setLoading]=useState<string|null>(null);
  async function handleCheckout(plan:string){
    setLoading(plan);
    try{
      const res=await fetch("/api/checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({plan})});
      const data=await res.json();
      if(data.url){window.location.href=data.url;}
      else{alert("付款頁面載入失敗，請稍後再試");setLoading(null);}
    }catch{alert("網絡錯誤，請稍後再試");setLoading(null);}
  }
  return (
    <div style={{fontFamily:"PingFang TC,sans-serif",minHeight:"100vh",background:"#F7F8FA"}}>
      <div style={{background:"#2A5A9A",padding:"0 24px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:680,margin:"0 auto",display:"flex",alignItems:"center",height:60,gap:14}}>
          <a href="/" style={{color:"#9ABCE8",fontSize:24,textDecoration:"none",lineHeight:1}}>←</a>
          <span style={{color:"#fff",fontSize:18,fontWeight:700}}>申請陪跑計劃</span>
          <span style={{marginLeft:"auto",fontSize:13,color:"#FFD066",fontWeight:700}}>$19.9 / 月</span>
        </div>
      </div>
      <div style={{background:"linear-gradient(160deg,#2A5A9A 0%,#1A3A6A 100%)",padding:"48px 24px 56px",textAlign:"center"}}>
        <div style={{fontSize:14,color:"#9ABCE8",letterSpacing:2,marginBottom:8}}>住易 · 付費服務</div>
        <h1 style={{margin:0,fontSize:26,fontWeight:700,color:"#fff",lineHeight:1.35}}>申請全程陪你跑 一個都不漏</h1>
        <p style={{margin:"12px 0 0",fontSize:15,color:"#9ABCE8",lineHeight:1.7}}>從填表到提交 從提醒到跟進 全程中文輔助</p>
        <div style={{marginTop:20}}>
          <span style={{fontSize:36,fontWeight:800,color:"#FFD066"}}>$19.9</span>
          <span style={{fontSize:16,color:"#9ABCE8",marginLeft:4}}>/ 月</span>
        </div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginTop:4}}>隨時取消 無需合約</div>
      </div>
      <div style={{maxWidth:680,margin:"0 auto",padding:"20px 20px 60px"}}>
        <div style={{background:"#fff",borderRadius:20,padding:20,boxShadow:"0 2px 14px rgba(0,0,0,0.07)",marginBottom:16}}>
          {FEATURES.map((f,i)=>(
            <div key={f.title} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"12px 0",borderBottom:i<FEATURES.length-1?"1px solid #F0F3F8":"none"}}>
              <span style={{fontSize:20,flexShrink:0}}>{f.icon}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:700,color:"#1A2B4A",marginBottom:3}}>{f.title}</div>
                <div style={{fontSize:12,color:"#6A7A9A",lineHeight:1.6}}>{f.desc}</div>
              </div>
              <div style={{flexShrink:0,padding:"4px 10px",borderRadius:20,fontSize:12,fontWeight:700,background:f.free?"#E8F5EE":"#EEF4FF",color:f.free?"#4A8F6F":"#2A5A9A"}}>{f.free?"免費":"訂閱"}</div>
            </div>
          ))}
        </div>
        <div style={{background:"#1A2B4A",borderRadius:20,padding:24,textAlign:"center",marginBottom:12}}>
          <div style={{fontSize:16,color:"#fff",fontWeight:700,marginBottom:4}}>申請陪跑計劃</div>
          <div style={{fontSize:28,fontWeight:800,color:"#FFD066",marginBottom:4}}>$19.9<span style={{fontSize:14,color:"#9BB5D4",fontWeight:400}}> / 月</span></div>
          <div style={{fontSize:12,color:"#9BB5D4",marginBottom:16}}>隨時取消 無需合約</div>
          <button onClick={()=>handleCheckout("paopao_monthly")} disabled={!!loading}
            style={{width:"100%",padding:15,borderRadius:14,border:"none",
              background:loading==="paopao_monthly"?"#555":"linear-gradient(135deg,#FFD066 0%,#FF9A00 100%)",
              color:"#1A2B4A",fontSize:17,fontWeight:800,cursor:loading?"not-allowed":"pointer",
              boxShadow:"0 4px 16px rgba(255,154,0,0.4)"}}>
            {loading==="paopao_monthly"?"處理中...":"立即訂閱 開始陪跑 →"}
          </button>
        </div>
        <div style={{background:"#fff",borderRadius:20,padding:24,textAlign:"center",marginBottom:12,border:"2px solid #4A8F6F"}}>
          <div style={{fontSize:16,color:"#1A2B4A",fontWeight:700,marginBottom:4}}>年審通</div>
          <div style={{fontSize:28,fontWeight:800,color:"#4A8F6F",marginBottom:4}}>$79<span style={{fontSize:14,color:"#8899B0",fontWeight:400}}> / 年</span></div>
          <div style={{fontSize:12,color:"#8899B0",marginBottom:16}}>Section 8 / NYCHA 年審截止統一提醒</div>
          <button onClick={()=>handleCheckout("annual_renewal")} disabled={!!loading}
            style={{width:"100%",padding:13,borderRadius:12,border:"none",
              background:loading==="annual_renewal"?"#aaa":"#4A8F6F",
              color:"#fff",fontSize:15,fontWeight:700,cursor:loading?"not-allowed":"pointer"}}>
            {loading==="annual_renewal"?"處理中...":"訂閱年審通 →"}
          </button>
        </div>
        <div style={{textAlign:"center",fontSize:11,color:"#A0AABF",marginTop:8,marginBottom:16}}>安全支付 · Stripe加密 · 隨時取消 · 支持信用卡／借記卡</div>
        <div style={{background:"#F0F4FA",borderRadius:16,padding:18,textAlign:"center"}}>
          <div style={{fontSize:13,color:"#5A6A8A",marginBottom:12}}>還沒準備好？先免費使用這些工具</div>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            <a href="/ami" style={{padding:"10px 18px",borderRadius:10,background:"#fff",border:"1.5px solid #D0D8E8",color:"#2A5A9A",fontSize:13,fontWeight:600,textDecoration:"none"}}>📊 AMI測算</a>
            <a href="/status" style={{padding:"10px 18px",borderRadius:10,background:"#fff",border:"1.5px solid #D0D8E8",color:"#2A5A9A",fontSize:13,fontWeight:600,textDecoration:"none"}}>📋 申請診斷</a>
            <a href="/" style={{padding:"10px 18px",borderRadius:10,background:"#fff",border:"1.5px solid #D0D8E8",color:"#5A6A8A",fontSize:13,fontWeight:600,textDecoration:"none"}}>← 返回首頁</a>
          </div>
        </div>
      </div>
    </div>
  );
}
