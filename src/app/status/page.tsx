"use client";
import {useState} from "react";
const TYPE_NAMES:Record<string,string>={section8:"Section 8 持券",nycha:"NYCHA 公房",housingconnect:"Housing Connect 保障房",hcr:"HCR 州立住房"};
function getDiag(type:string,days:number){
  if(type==="section8"){
    if(days<30) return {stage:"📬 已提交，等待確認",detail:"NYCHA通常在30天內發送確認信，請留意郵箱",next:"確保地址正確，留意NYCHA寄出的確認信",color:"#4A8F6F",bg:"#F0FAF5"};
    if(days<180) return {stage:"⏳ 等候名單審核中",detail:"Section 8等候名單審核週期通常為3至12個月",next:"保持聯繫方式最新，年度更新資料",color:"#D4A017",bg:"#FFFBEE"};
    if(days<730) return {stage:"📋 長期等候中",detail:"Section 8等候時間平均5至10年，你目前處於正常等候階段",next:"確認每年收到NYCHA更新通知，回覆確認否則會被移除名單",color:"#E87D2A",bg:"#FFF6EE"};
    return {stage:"⚠️ 需要確認狀態",detail:"等候超過2年，建議主動聯繫NYCHA確認你仍在名單上",next:"撥打NYCHA熱線 718-707-7771 或登入MyNYCHA查詢",color:"#E84A4A",bg:"#FFF0F0"};
  }
  if(type==="nycha"){
    if(days<60) return {stage:"📬 等待初步審核",detail:"NYCHA公房申請初審約需45至90天",next:"確保所有文件齊備，留意NYCHA郵件",color:"#4A8F6F",bg:"#F0FAF5"};
    if(days<365) return {stage:"⏳ 資格審核中",detail:"NYCHA正在核實你的收入和家庭資料，通常需要3至12個月",next:"如收到補充文件要求，請在30天內回覆",color:"#D4A017",bg:"#FFFBEE"};
    return {stage:"📋 長期等候",detail:"NYCHA公房平均等候5至8年，你的申請在正常範圍",next:"每年登入NYCHA系統更新資料，否則申請會被取消",color:"#E87D2A",bg:"#FFF6EE"};
  }
  if(type==="housingconnect"){
    if(days<30) return {stage:"✅ 抽籤申請已提交",detail:"Housing Connect抽籤通常在申請截止後2至4個月出結果",next:"在Housing Connect帳號查看申請狀態",color:"#4A8F6F",bg:"#F0FAF5"};
    if(days<120) return {stage:"⏳ 等待抽籤結果",detail:"抽籤結果公布需時，被選中者會收到通知",next:"登入Housing Connect查看My Applications",color:"#D4A017",bg:"#FFFBEE"};
    return {stage:"📋 等候面試或審核",detail:"被選中後還需收入審核和面試，整個流程通常需12至15個月",next:"如已被選中，準備好收入證明、身份文件、租賃歷史",color:"#2A5A9A",bg:"#EEF4FF"};
  }
  return {stage:"📋 申請進行中",detail:"你的申請正在政府審核流程中",next:"保持聯繫方式最新，留意郵件和信件通知",color:"#5A6A8A",bg:"#F4F6FB"};
}
export default function StatusPage(){
  const [type,setType]=useState("");
  const [date,setDate]=useState("");
  const [notice,setNotice]=useState("none");
  const [result,setResult]=useState<ReturnType<typeof getDiag>&{days:number}|null>(null);
  const [toast,setToast]=useState("");
  function showToast(m:string){setToast(m);setTimeout(()=>setToast(""),2500);}
  function handleDiag(){
    if(!type||!date){showToast("請填寫申請類型和申請日期");return;}
    const days=Math.round((Date.now()-new Date(date).getTime())/86400000);
    setResult({...getDiag(type,days),days});
    setTimeout(()=>document.getElementById("sr")?.scrollIntoView({behavior:"smooth"}),80);
  }
  const today=new Date().toISOString().split("T")[0];
  const sel:React.CSSProperties={width:"100%",padding:14,border:"2px solid #D0D8E8",borderRadius:12,fontSize:16,color:"#1A2B4A",background:"#FAFBFD",outline:"none"};
  return (
    <div style={{fontFamily:"PingFang TC,sans-serif",minHeight:"100vh",background:"#F7F8FA"}}>
      {toast&&<div style={{position:"fixed",bottom:30,left:"50%",transform:"translateX(-50%)",background:"#1A2B4A",color:"#fff",padding:"10px 20px",borderRadius:20,fontSize:13,zIndex:9999}}>{toast}</div>}
      <div style={{background:"#2A5A9A",padding:"0 20px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:680,margin:"0 auto",display:"flex",alignItems:"center",height:60,gap:14}}>
          <a href="/" style={{color:"#9ABCE8",fontSize:24,textDecoration:"none"}}>←</a>
          <span style={{color:"#fff",fontSize:18,fontWeight:700}}>申請狀態診斷</span>
        </div>
      </div>
      <div style={{background:"linear-gradient(160deg,#2A5A9A 0%,#1A3A6A 100%)",padding:"48px 24px 56px",textAlign:"center"}}>
        <div style={{fontSize:14,color:"#9ABCE8",letterSpacing:2,marginBottom:8}}>住易 · 免費工具</div>
        <h1 style={{margin:0,fontSize:24,fontWeight:700,color:"#fff"}}>我已經申請了 現在卡在哪裡？</h1>
        <p style={{margin:"12px 0 0",fontSize:14,color:"#9ABCE8"}}>輸入申請資訊 診斷你的申請在哪個環節</p>
      </div>
      <div style={{maxWidth:680,margin:"0 auto",padding:"24px 20px 60px"}}>
        <div style={{background:"#fff",borderRadius:20,padding:"26px 22px",boxShadow:"0 2px 14px rgba(0,0,0,0.08)",marginBottom:20}}>
          <div style={{fontSize:16,fontWeight:700,color:"#1A2B4A",marginBottom:20}}>📋 填寫申請資訊</div>
          <div style={{marginBottom:16}}>
            <label style={{display:"block",fontSize:15,color:"#5A6A8A",marginBottom:8,fontWeight:600}}>申請的是哪個項目？</label>
            <select value={type} onChange={e=>setType(e.target.value)} style={sel}>
              <option value="">請選擇</option>
              <option value="section8">Section 8 持券（NYCHA）</option>
              <option value="nycha">NYCHA 公房（公共住房）</option>
              <option value="housingconnect">Housing Connect 保障房抽籤</option>
              <option value="hcr">HCR 州立住房項目</option>
            </select>
          </div>
          <div style={{marginBottom:16}}>
            <label style={{display:"block",fontSize:15,color:"#5A6A8A",marginBottom:8,fontWeight:600}}>當時提交申請的日期</label>
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} max={today} style={sel}/>
          </div>
          <div style={{marginBottom:20}}>
            <label style={{display:"block",fontSize:15,color:"#5A6A8A",marginBottom:8,fontWeight:600}}>收到過什麼通知？（可選）</label>
            <select value={notice} onChange={e=>setNotice(e.target.value)} style={sel}>
              <option value="none">沒有收到任何通知</option>
              <option value="confirm">收到確認信或電郵</option>
              <option value="docs">收到補交文件要求</option>
              <option value="interview">收到面試通知</option>
              <option value="selected">收到被選中通知</option>
            </select>
          </div>
          <button onClick={handleDiag} style={{width:"100%",padding:16,borderRadius:14,border:"none",background:"linear-gradient(135deg,#2A5A9A 0%,#1A3A6A 100%)",color:"#fff",fontSize:18,fontWeight:700,cursor:"pointer"}}>診斷我的申請狀態</button>
        </div>
        {result&&(
          <div id="sr">
            <div style={{background:result.bg,border:"2.5px solid "+result.color,borderRadius:20,padding:22,marginBottom:16,textAlign:"center"}}>
              <div style={{fontSize:26,fontWeight:800,color:result.color,marginBottom:8}}>{result.stage}</div>
              <div style={{fontSize:13,color:"#5A6A8A"}}>申請項目：{TYPE_NAMES[type]||type} · 已申請 {result.days} 天</div>
            </div>
            <div style={{background:"#fff",borderRadius:20,padding:20,boxShadow:"0 2px 14px rgba(0,0,0,0.07)",marginBottom:16}}>
              <div style={{fontSize:14,fontWeight:700,color:"#1A2B4A",marginBottom:10}}>🔍 診斷說明</div>
              <div style={{fontSize:14,color:"#4A5A7A",lineHeight:1.8}}>{result.detail}</div>
            </div>
            <div style={{background:"#fff",borderRadius:20,padding:20,boxShadow:"0 2px 14px rgba(0,0,0,0.07)",marginBottom:16}}>
              <div style={{fontSize:14,fontWeight:700,color:"#1A2B4A",marginBottom:10}}>📋 你現在應該做什麼</div>
              <div style={{fontSize:14,color:"#2A5A9A",fontWeight:600,lineHeight:1.8}}>{result.next}</div>
            </div>
            <div style={{background:"#1A2B4A",borderRadius:16,padding:18,marginBottom:16}}>
              <div style={{fontSize:14,color:"#fff",fontWeight:700,marginBottom:6}}>想要住易全程追蹤你的申請？</div>
              <div style={{fontSize:12,color:"#9BB5D4",marginBottom:12}}>陪跑計劃包含申請狀態看板 截止日提醒 文件清單 中文指引</div>
              <a href="/paopao" style={{display:"block",padding:12,borderRadius:10,background:"linear-gradient(135deg,#FFD066,#FF9A00)",color:"#1A2B4A",fontSize:14,fontWeight:700,textAlign:"center",textDecoration:"none"}}>了解陪跑計劃 $19.9/月 →</a>
            </div>
            <button onClick={()=>setResult(null)} style={{width:"100%",padding:13,borderRadius:12,border:"2px solid #D0D8E8",background:"#fff",color:"#5A6A8A",fontSize:14,fontWeight:600,cursor:"pointer"}}>重新診斷</button>
          </div>
        )}
      </div>
    </div>
  );
}
