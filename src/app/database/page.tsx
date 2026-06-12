"use client";
const CARDS=[
  {icon:"🏢",name:"NYCHA 公房",eng:"NY City Housing Authority",stats:"17.7萬套住宅 · 243個社區",desc:"紐約市最大公共住房機構，提供低租金公房，等候名單長期開放",tags:["低收入優先","長期租約","5個區均有"],color:"#1A2B4A",bg:"#F0F4FA"},
  {icon:"🏗️",name:"HPD 保障房",eng:"Housing Preservation & Development",stats:"年均1萬+開放單元 · Housing Connect抽籤",desc:"通過Housing Connect平台抽籤申請，覆蓋30%至165% AMI各收入層",tags:["抽籤制","各收入層均有","新建樓盤為主"],color:"#2A5A9A",bg:"#EEF4FF"},
  {icon:"🏠",name:"HCR 州立住房",eng:"NY Homes & Community Renewal",stats:"覆蓋紐約州全境 · 含市郊地區",desc:"紐約州住房局，負責州Section 8項目及市郊保障房",tags:["州Section 8","市郊選項","長島/北部"],color:"#3A7A6A",bg:"#F0FAF5"},
  {icon:"🎫",name:"全美接受8券房東",eng:"Section 8 Accepted Landlords",stats:"紐約2.5萬+房東 · Section 8持券全美通用",desc:"住易數據庫收錄接受持券的華人友好房東，精準匹配",tags:["全美可用","華人友好","持券必看"],color:"#7A3A9A",bg:"#F5F0FF"},
];
export default function DatabasePage(){
  return (
    <div style={{fontFamily:"PingFang TC,sans-serif",minHeight:"100vh",background:"#F7F8FA"}}>
      <div style={{background:"#B05A00",padding:"0 24px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:680,margin:"0 auto",display:"flex",alignItems:"center",height:60,gap:14}}>
          <a href="/" style={{color:"#FFD099",fontSize:24,textDecoration:"none"}}>←</a>
          <span style={{color:"#fff",fontSize:18,fontWeight:700}}>福利住房數據庫</span>
          <span style={{marginLeft:"auto",fontSize:12,color:"#FFD099",background:"rgba(255,255,255,0.15)",padding:"4px 10px",borderRadius:10}}>每月更新</span>
        </div>
      </div>
      <div style={{background:"linear-gradient(160deg,#B05A00 0%,#7A3A00 100%)",padding:"48px 24px 56px",textAlign:"center"}}>
        <div style={{fontSize:14,color:"#FFD099",letterSpacing:2,marginBottom:8}}>住易 · 房源數據庫</div>
        <h1 style={{margin:0,fontSize:24,fontWeight:700,color:"#fff"}}>三大機構 + 全美8券房東</h1>
        <p style={{margin:"10px 0 0",fontSize:14,color:"#FFD099"}}>數據每月更新 找對門才能申請對</p>
      </div>
      <div style={{maxWidth:680,margin:"0 auto",padding:"20px 20px 60px"}}>
        {CARDS.map(c=>(
          <div key={c.name} style={{background:"#fff",borderRadius:20,padding:22,boxShadow:"0 2px 14px rgba(0,0,0,0.08)",marginBottom:16,borderLeft:"5px solid "+c.color}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
              <span style={{fontSize:32}}>{c.icon}</span>
              <div>
                <div style={{fontSize:17,fontWeight:800,color:"#1A2B4A"}}>{c.name}</div>
                <div style={{fontSize:11,color:"#8899B0"}}>{c.eng}</div>
              </div>
            </div>
            <div style={{fontSize:13,fontWeight:700,color:c.color,marginBottom:6}}>{c.stats}</div>
            <div style={{fontSize:14,color:"#4A5A7A",lineHeight:1.7,marginBottom:12}}>{c.desc}</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {c.tags.map(t=><span key={t} style={{fontSize:12,color:c.color,background:c.bg,padding:"4px 10px",borderRadius:20,fontWeight:600}}>{t}</span>)}
            </div>
          </div>
        ))}
        <div style={{background:"#1A2B4A",borderRadius:16,padding:20,textAlign:"center"}}>
          <div style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:8}}>想要住易幫你匹配最適合的房源？</div>
          <div style={{fontSize:13,color:"#9BB5D4",marginBottom:16}}>告訴我們你的AMI檔位和希望住的區域</div>
          <a href="/ami" style={{display:"inline-block",padding:"13px 28px",borderRadius:12,background:"#fff",color:"#1A2B4A",fontSize:15,fontWeight:700,textDecoration:"none"}}>先做 AMI 測算 →</a>
        </div>
      </div>
    </div>
  );
}
