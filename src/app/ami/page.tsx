"use client";
import { useState } from "react";
export default function AmiPage() {
  const [income, setIncome] = useState("");
  const [size, setSize] = useState(3);
  const [result, setResult] = useState<{pct:number;label:string;color:string;bg:string;border:string;programs:string[];note:string;base:number} | null>(null);
  const AMI: Record<number,number> = {1:97000,2:110850,3:124700,4:138550,5:149650,6:160750,7:171800,8:182900};
  const TIERS = [
    {maxPct:30,label:"極低收入",color:"#E84A4A",bg:"#FFF0F0",border:"#E84A4A",programs:["Section 8持券（最優先）","NYCHA公房申請","SOTA緊急住房"],note:"優先級最高，福利最多"},
    {maxPct:50,label:"很低收入",color:"#E87D2A",bg:"#FFF6EE",border:"#E87D2A",programs:["Section 8持券","Housing Connect保障房","低收入稅收抵免房"],note:"可申請大部分保障房項目"},
    {maxPct:80,label:"低收入",color:"#D4A017",bg:"#FFFBEE",border:"#D4A017",programs:["Housing Connect低價房","部分市補貼項目","工薪家庭住房計劃"],note:"仍可申請多個補貼項目"},
    {maxPct:120,label:"中等收入",color:"#4A8F6F",bg:"#F0FAF5",border:"#4A8F6F",programs:["Housing Connect中價房","421-a優惠房","部分工薪家庭項目"],note:"可申請中價保障房抽籤"},
    {maxPct:999,label:"中高收入",color:"#5A6A8A",bg:"#F4F6FB",border:"#5A6A8A",programs:["Housing Connect中高價房","市場價優先抽籤（部分樓盤）"],note:"選擇有限，建議關注市場價房源"},
  ];
  function calc() {
    const inc = parseFloat(income);
    if (!inc || inc <= 0) return;
    const base = AMI[Math.min(Math.max(size,1),8)];
    const pct = Math.round((inc/base)*100);
    const tier = TIERS.find(t => pct <= t.maxPct) ?? TIERS[TIERS.length-1];
    setResult({pct, ...tier, base});
  }
  return (
    <div style={{fontFamily:"PingFang TC,sans-serif",minHeight:"100vh",background:"#F7F8FA"}}>
      <div style={{background:"#2A5A9A",padding:"0 20px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:680,margin:"0 auto",display:"flex",alignItems:"center",height:60,gap:14}}>
          <a href="/" style={{color:"#9ABCE8",fontSize:24,textDecoration:"none",lineHeight:1}}>←</a>
          <span style={{color:"#fff",fontSize:18,fontWeight:700}}>我想申請保障房</span>
        </div>
      </div>
      <div style={{background:"linear-gradient(160deg,#2A5A9A 0%,#1A3A6A 100%)",padding:"48px 24px 56px",textAlign:"center"}}>
        <div style={{fontSize:14,color:"#9ABCE8",letterSpacing:2,marginBottom:8}}>住易 · 免費工具</div>
        <h1 style={{margin:0,fontSize:26,fontWeight:700,color:"#fff",lineHeight:1.35}}>申請保障房　第一步先測AMI</h1>
        <p style={{margin:"12px 0 0",fontSize:15,color:"#9ABCE8",lineHeight:1.7}}>測出AMI檔位 → 查看可申請項目 → 訂閱解鎖房源詳情</p>
      </div>
      <div style={{maxWidth:600,margin:"0 auto",padding:"24px 16px"}}>
        <div style={{background:"#fff",borderRadius:16,padding:24,marginBottom:20,boxShadow:"0 2px 12px rgba(0,0,0,0.07)"}}>
          <label style={{display:"block",fontSize:14,color:"#5A6A8A",marginBottom:8,fontWeight:600}}>家庭年總收入（稅前，美元）</label>
          <div style={{display:"flex",alignItems:"center",border:"1.5px solid #D0D8E8",borderRadius:10,overflow:"hidden",marginBottom:16}}>
            <span style={{padding:"0 12px",color:"#8899B0",fontSize:16}}>$</span>
            <input type="number" value={income} onChange={e=>setIncome(e.target.value)} placeholder="例：45000"
              style={{flex:1,border:"none",outline:"none",fontSize:18,padding:"12px 4px",background:"transparent"}}
              onKeyDown={e=>e.key==="Enter"&&calc()} />
          </div>
          <label style={{display:"block",fontSize:14,color:"#5A6A8A",marginBottom:8,fontWeight:600}}>家庭人數</label>
          <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
            {[1,2,3,4,5,6,7,8].map(n=>(
              <button key={n} onClick={()=>setSize(n)}
                style={{width:44,height:44,borderRadius:10,border:`1.5px solid ${size===n?"#1A2B4A":"#D0D8E8"}`,background:size===n?"#1A2B4A":"#fff",color:size===n?"#fff":"#5A6A8A",fontSize:15,fontWeight:600,cursor:"pointer"}}>
                {n}
              </button>
            ))}
          </div>
          <button onClick={calc}
            style={{width:"100%",padding:14,borderRadius:12,border:"none",background:"#1A2B4A",color:"#fff",fontSize:16,fontWeight:700,cursor:"pointer"}}>
            立即測算
          </button>
        </div>
        {result && (
          <>
            <div style={{background:result.bg,border:`2px solid ${result.border}`,borderRadius:16,padding:20,marginBottom:16,textAlign:"center"}}>
              <div style={{fontSize:13,color:result.color,fontWeight:700,marginBottom:4}}>你的家庭年收入 = {result.pct}% AMI</div>
              <div style={{fontSize:30,fontWeight:800,color:result.color,margin:"4px 0 6px"}}>{result.label}</div>
              <div style={{fontSize:13,color:"#5A6A8A"}}>{size}人家庭・2026年AMI基準：${result.base.toLocaleString()}</div>
              <div style={{display:"inline-block",marginTop:10,padding:"5px 16px",background:result.color,borderRadius:20,fontSize:13,color:"#fff",fontWeight:600}}>{result.note}</div>
            </div>
            <div style={{background:"#fff",borderRadius:16,padding:20,marginBottom:16,boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
              <div style={{fontSize:15,fontWeight:700,color:"#1A2B4A",marginBottom:12}}>✅ 你目前可以申請的項目</div>
              {result.programs.map((p,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:i<result.programs.length-1?"1px solid #F0F3F8":"none"}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:result.color,flexShrink:0}}/>
                  <span style={{fontSize:14,color:"#2A3A5A"}}>{p}</span>
                </div>
              ))}
            </div>
            <div style={{background:"#1A2B4A",borderRadius:16,padding:20,color:"#fff"}}>
              <div style={{fontSize:14,fontWeight:700,marginBottom:12}}>📋 你的下一步行動</div>
              {(result.pct<=50?[
                {icon:"🏠",text:"立即登記 Section 8 持券候補名單"},
                {icon:"🏢",text:"申請 NYCHA 公房"},
                {icon:"📋",text:"在 Housing Connect 建立帳號"},
              ]:result.pct<=80?[
                {icon:"📋",text:"在 Housing Connect 搜尋 80% AMI 以下樓盤"},
                {icon:"🏠",text:"關注 Section 8 候補名單開放通知"},
                {icon:"📅",text:"設定截止日期提醒"},
              ]:[
                {icon:"📋",text:"在 Housing Connect 搜尋符合你收入的樓盤"},
                {icon:"💬",text:"諮詢住易顧問了解更多選項"},
              ]).map((a,i)=>(
                <div key={i} style={{display:"flex",gap:10,marginBottom:10,alignItems:"flex-start"}}>
                  <span style={{fontSize:16}}>{a.icon}</span>
                  <span style={{fontSize:13,color:"#C8D8F0",lineHeight:1.6}}>{a.text}</span>
                </div>
              ))}
            </div>
          </>
        )}
        <div style={{textAlign:"center",padding:"24px 0 0",fontSize:11,color:"#A0AABF"}}>
          資料來源：HUD 2026 年紐約都會區收入限制・住易 ZhuYi
        </div>
      </div>
    </div>
  );
}
