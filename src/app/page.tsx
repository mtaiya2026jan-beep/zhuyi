"use client";
import {useRouter} from "next/navigation";

const SCENES=[
  {
    icon:"🏠",
    title:"我想申請保障房",
    sub:"AMI測算 · Housing Connect追蹤 · 中文填表指引",
    href:"/ami",
    accent:"#3B82F6",
    bg:"#EFF6FF",
  },
  {
    icon:"🏷️",
    title:"我有 Section 8 持券",
    sub:"找房匹配 · 截止提醒 · 延期申請指引",
    href:"/voucher",
    accent:"#10B981",
    bg:"#F0FDF4",
  },
  {
    icon:"🏡",
    title:"我已入住保障房",
    sub:"年審提醒 · 變更申報 · 換房指引",
    href:"/changes",
    accent:"#8B5CF6",
    bg:"#FAF5FF",
  },
];

const STATS=[
  {num:"17.7萬",label:"NYCHA公租房"},
  {num:"10萬+",label:"Section 8持券家庭"},
  {num:"2.5萬+",label:"接受8券房東"},
  {num:"免費",label:"AMI資格測算"},
];

export default function Home(){
  const router=useRouter();
  return(
    <div style={{fontFamily:"PingFang TC,-apple-system,sans-serif",minHeight:"100vh",background:"#F2F2F7"}}>

      {/* 頂欄 */}
      <div style={{background:"#0A1628",padding:"0 20px",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{color:"#fff",fontSize:18,fontWeight:700,letterSpacing:0.5}}>住易 <span style={{color:"rgba(255,255,255,0.35)",fontSize:13,fontWeight:400}}>ZhuYi</span></div>
        <a href="/pricing" style={{fontSize:12,color:"rgba(255,255,255,0.5)",textDecoration:"none"}}>陪跑套餐</a>
      </div>

      {/* Hero */}
      <div style={{background:"#0A1628",padding:"48px 24px 56px",textAlign:"center"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",letterSpacing:3,marginBottom:16,textTransform:"uppercase"}}>紐約華人住房服務</div>
        <h1 style={{margin:"0 0 14px",fontSize:32,fontWeight:800,color:"#fff",lineHeight:1.2,letterSpacing:-0.5}}>
          保障房申請<br/><span style={{color:"#60A5FA"}}>中文全程幫你辦</span>
        </h1>
        <p style={{margin:"0 0 32px",fontSize:15,color:"rgba(255,255,255,0.45)",lineHeight:1.8}}>
          從測算資格到找到住所<br/>每一步都有中文指引
        </p>
        <button onClick={()=>router.push("/ami")}
          style={{background:"#3B82F6",color:"#fff",border:"none",borderRadius:50,padding:"15px 36px",fontSize:16,fontWeight:700,cursor:"pointer",letterSpacing:0.3}}>
          免費測算我的資格
        </button>
        <div style={{marginTop:12,fontSize:12,color:"rgba(255,255,255,0.25)"}}>無需登記 · 即時結果</div>
      </div>

      <div style={{maxWidth:600,margin:"0 auto",padding:"28px 16px 48px"}}>

        {/* 場景選擇 */}
        <div style={{fontSize:11,color:"#8E8E93",letterSpacing:1.5,marginBottom:12,paddingLeft:4,textTransform:"uppercase"}}>你的情況是？</div>
        <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:32}}>
          {SCENES.map(s=>(
            <button key={s.href} onClick={()=>router.push(s.href)}
              style={{background:"#fff",border:"none",borderRadius:18,padding:"18px 20px",textAlign:"left",
                display:"flex",alignItems:"center",gap:16,cursor:"pointer",width:"100%"}}>
              <div style={{width:46,height:46,borderRadius:14,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>
                {s.icon}
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:16,fontWeight:600,color:"#1A1A1A",marginBottom:4}}>{s.title}</div>
                <div style={{fontSize:12,color:"#8E8E93",lineHeight:1.5}}>{s.sub}</div>
              </div>
              <div style={{fontSize:22,color:"#C7C7CC",flexShrink:0}}>›</div>
            </button>
          ))}
        </div>

        {/* 數據條 */}
        <div style={{fontSize:11,color:"#8E8E93",letterSpacing:1.5,marginBottom:12,paddingLeft:4,textTransform:"uppercase"}}>紐約住房現況</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:32}}>
          {STATS.map(s=>(
            <div key={s.label} style={{background:"#fff",borderRadius:14,padding:"16px",textAlign:"center"}}>
              <div style={{fontSize:22,fontWeight:700,color:"#1A1A1A"}}>{s.num}</div>
              <div style={{fontSize:11,color:"#8E8E93",marginTop:4}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* 底部服務卡 */}
        <div style={{fontSize:11,color:"#8E8E93",letterSpacing:1.5,marginBottom:12,paddingLeft:4,textTransform:"uppercase"}}>服務</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
          <button onClick={()=>router.push("/pricing")}
            style={{background:"#0A1628",border:"none",borderRadius:18,padding:"20px 16px",textAlign:"left",cursor:"pointer"}}>
            <div style={{fontSize:14,fontWeight:700,color:"#fff",marginBottom:6}}>全程陪跑</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",lineHeight:1.6,marginBottom:14}}>基礎 $19.9<br/>全程 $49.9 / 月</div>
            <div style={{background:"#3B82F6",color:"#fff",fontSize:12,fontWeight:600,padding:"7px 14px",borderRadius:20,display:"inline-block"}}>查看套餐</div>
          </button>
          <button onClick={()=>router.push("/landlord")}
            style={{background:"#fff",border:"none",borderRadius:18,padding:"20px 16px",textAlign:"left",cursor:"pointer"}}>
            <div style={{fontSize:14,fontWeight:700,color:"#1A1A1A",marginBottom:6}}>房東登記</div>
            <div style={{fontSize:11,color:"#8E8E93",lineHeight:1.6,marginBottom:14}}>接受持券租客<br/>免費登記空房</div>
            <div style={{background:"#F2F2F7",color:"#1A1A1A",fontSize:12,fontWeight:600,padding:"7px 14px",borderRadius:20,display:"inline-block"}}>立即登記</div>
          </button>
        </div>

        <div style={{textAlign:"center",fontSize:11,color:"#C7C7CC",marginTop:8}}>
          住易 ZhuYi · 紐約華人住房福利平台
        </div>
      </div>
    </div>
  );
}
