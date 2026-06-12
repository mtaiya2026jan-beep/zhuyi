"use client";
import {useRouter} from "next/navigation";
const CARDS=[
  {icon:"🏠",title:"我想申請保障房",sub:"AMI測算  找到可申請項目",href:"/ami",color:"#1A2B4A"},
  {icon:"🎫",title:"我有 Section 8 持券",sub:"登記持券  優先匹配華人房東",href:"/voucher",color:"#2A5A9A"},
  {icon:"🏘️",title:"我是華人房東",sub:"登記房源  接受持券租客",href:"/landlord",color:"#3A7A6A"},
  {icon:"📋",title:"我已經申請了",sub:"診斷進度  查看卡在哪個環節",href:"/status",color:"#7A4A9A"},
  {icon:"🏛️",title:"福利住房數據庫",sub:"三大機構房源  全美8券房東  每月更新",href:"/database",color:"#B05A00"},
];
const PRICING=[
  {icon:"🆓",label:"AMI資格測算",desc:"輸入收入即知道你屬於哪個檔位、可申請哪些項目",price:"永久免費",priceColor:"#4AE89A",free:true},
  {icon:"📋",label:"申請全程指引",desc:"中文填表指導、文件清單、截止日提醒、申請狀態追蹤",price:"$19.9 / 月",priceColor:"#FFD066",free:false},
  {icon:"📅",label:"年審截止日提醒",desc:"Section 8 年審截止、Housing Connect 抽籤到期，統一管理不漏接",price:"$79 / 年",priceColor:"#FFD066",free:false},
  {icon:"🤝",label:"持券成功找房撮合",desc:"為持券人配對接受 Section 8 的華人房東，簽約後一次性收費",price:"$1,400 / 單",priceColor:"#FFD066",free:false},
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
            <button key={c.href} onClick={()=>router.push(c.href)}
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
            {[["17.7萬","NYCHA公房套數"],["8.5萬","紐約市8券家庭"],["2.5萬+","接受8券房東"],["10萬+","紐約華人家庭"]].map(([num,label],i,arr)=>(
              <div key={label} style={{flex:1,borderRight:i<arr.length-1?"1px solid #ECEEF3":"none",padding:"4px 0"}}>
                <div style={{fontSize:20,fontWeight:800,color:"#1A2B4A"}}>{num}</div>
                <div style={{fontSize:11,color:"#8899B0",marginTop:4}}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginTop:14,background:"#1A2B4A",borderRadius:18,padding:"18px 20px"}}>
          <div style={{fontSize:12,color:"#7A9CC8",textAlign:"center",marginBottom:12,letterSpacing:1}}>服務收費說明</div>
          {PRICING.map((p,i)=>(
            <div key={p.label}>
              {i>0&&<div style={{height:1,background:"rgba(255,255,255,0.08)",margin:"10px 0"}}/>}
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                  <span style={{fontSize:17,marginTop:2}}>{p.icon}</span>
                  <div>
                    <div style={{fontSize:14,color:p.free?"#fff":"#C8D8F0",fontWeight:600}}>{p.label}</div>
                    <div style={{fontSize:11,color:"#7A9CC8",marginTop:2}}>{p.desc}</div>
                  </div>
                </div>
                <span style={{fontSize:14,fontWeight:p.free?800:700,color:p.priceColor,whiteSpace:"nowrap"}}>{p.price}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:18,fontSize:12,color:"#B0BBC8"}}>住易 ZhuYi · 紐約華人住房福利平台</div>
      </div>
    </div>
  );
}
