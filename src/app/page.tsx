"use client";
import {useRouter} from "next/navigation";
const CARDS=[
  {icon:"🏠",title:"我想申請保障房",sub:"AMI測算  找到可申請項目",href:"/ami",color:"#1A2B4A"},
  {icon:"🏷️",title:"我有 Section 8 持券",sub:"登記持券  優先匹配華人房東",href:"/voucher",color:"#2A5A9A"},
  {icon:"🏘️",title:"我是華人房東",sub:"登記房源  接受持券租客",href:"/landlord",color:"#3A7A6A"},
  {icon:"📋",title:"我已經申請了",sub:"診斷進度  查看卡在哪個環節",href:"/status",color:"#7A4A9A"},
  {icon:"🏛️",title:"福利住房數據庫",sub:"三大機構房源  全美8券房東  每月更新",href:"/database",color:"#B05A00"},
  {icon:"🎯",title:"基礎陪跑 $19.9/月",sub:"Housing Connect追蹤  中文填表指引  截止日提醒",href:"/pricing",color:"#2A5A9A"},
  {icon:"🤝",title:"全程陪跑 $49.9/月",sub:"以上全部  優先房東匹配  申請包辦服務",href:"/pricing",color:"#1A6A5A"},
  {icon:"📅",title:"年審通 $79/年",sub:"Section 8年審截止  Housing Connect抽籤到期提醒",href:"/pricing",color:"#7A4A9A"},
];
export default function Home(){
  const router=useRouter();
  return (
    <div style={{fontFamily:"PingFang TC,Noto Sans TC,sans-serif",minHeight:"100vh",background:"#F7F8FA"}}>
      <div style={{background:"#1A2B4A",padding:"0 24px"}}>
        <div style={{maxWidth:680,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:60}}>
          <div style={{color:"#fff",fontSize:22,fontWeight:800}}>住易 <span style={{fontSize:14,color:"#7A9CC8",fontWeight:400}}>ZhuYi</span></div>
          <div style={{fontSize:13,color:"#7A9CC8"}}>紐約華人住房福利平台</div>
        </div>
      </div>
      <div style={{background:"linear-gradient(160deg,#2A5A9A 0%,#1A3A6A 100%)",padding:"48px 24px 56px",textAlign:"center"}}>
        <div style={{maxWidth:520,margin:"0 auto"}}>
          <div style={{fontSize:15,color:"#9ABCE8",letterSpacing:2,marginBottom:14}}>深耕紐約  服務華人</div>
          <h1 style={{fontSize:32,fontWeight:800,color:"#fff",lineHeight:1.35,marginBottom:16}}>紐約保障房福利<br/>你也可以申請到</h1>
          <p style={{fontSize:15,color:"#9BB5D4",lineHeight:1.8}}>專為華人移民家庭設計  幫你看懂政策  測算資格  找到匹配房源</p>
          <div style={{marginTop:14,fontSize:12,color:"rgba(255,255,255,0.45)",letterSpacing:1}}>全程中文 · 免費測算 · 2026 HUD最新數據</div>
        </div>
      </div>
      <div style={{maxWidth:680,margin:"0 auto",padding:"0 20px 50px"}}>
        <div style={{fontSize:17,color:"#8899B0",margin:"36px 0 18px",textAlign:"center",fontWeight:500}}>請選擇你的情況</div>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          {CARDS.map(c=>(
            <button key={c.href+c.title} onClick={()=>router.push(c.href)}
              style={{background:"#fff",border:"none",borderRadius:24,padding:"30px 28px",textAlign:"left",
                boxShadow:"0 2px 16px rgba(0,0,0,0.08)",display:"flex",alignItems:"center",gap:24,cursor:"pointer"}}>
              <div style={{fontSize:50,flexShrink:0}}>{c.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:21,fontWeight:700,color:"#1A2B4A",marginBottom:6}}>{c.title}</div>
                <div style={{fontSize:14,color:"#8899B0"}}>{c.sub}</div>
              </div>
              <div style={{fontSize:24,color:c.color,fontWeight:700,flexShrink:0}}>→</div>
            </button>
          ))}
        </div>
        <div style={{marginTop:28,background:"#fff",borderRadius:18,padding:"18px 22px",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
          <div style={{display:"flex",justifyContent:"center",textAlign:"center"}}>
            {[["17.7萬","NYCHA公房套數"],["10萬+","Section 8持券家庭"],["2.5萬+","接受8券房東"],["10萬+","紐約華人移民家庭"]].map(([num,label],i,arr)=>(
              <div key={label} style={{flex:1,borderRight:i<arr.length-1?"1px solid #ECEEF3":"none",padding:"4px 0"}}>
                <div style={{fontSize:20,fontWeight:800,color:"#1A2B4A"}}>{num}</div>
                <div style={{fontSize:11,color:"#8899B0",marginTop:4}}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{textAlign:"center",marginTop:14,fontSize:12,color:"#B0BBC8"}}>住易 ZhuYi · 紐約華人住房福利平台</div>
      </div>
    </div>
  );
}
