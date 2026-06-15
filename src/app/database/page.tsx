"use client";

const ORGS = [
  {
    id: "nycha",
    name: "NYCHA",
    nameFull: "紐約市住房局",
    nameEn: "New York City Housing Authority",
    icon: "🏛️",
    color: "#1A2B4A",
    border: "#1A2B4A",
    tag: "公共租賃房",
    tagColor: "#1A6A3A",
    desc: "紐約市最大公共住房機構，管理17.7萬套公租房。租金按家庭收入30%計算，與市場價無關。",
    who: "低收入家庭、老人、殘障人士，收入需低於AMI 80%",
    how: "在NYCHA官網提交輪候申請，等候時間較長（數年）",
    url: "https://www.nyc.gov/site/nycha/applicants/apply-for-housing.page",
    urlText: "前往NYCHA申請 →",
    stats: [
      {num:"17.7萬",label:"公租房套數"},
      {num:"約50萬",label:"居住人口"},
      {num:"5-10年",label:"平均輪候期"},
    ],
  },
  {
    id: "hpd",
    name: "HPD",
    nameFull: "住房保護與發展局",
    nameEn: "Dept. of Housing Preservation & Development",
    icon: "🏠",
    color: "#2A5A9A",
    border: "#2A5A9A",
    tag: "抽籤保障房",
    tagColor: "#2A5A9A",
    desc: "通過Housing Connect平台以抽籤方式分配保障房，每年新增數萬套。申請免費，中籤後按收入審核資格。",
    who: "各收入檔位均有（30%–130% AMI），視項目而定",
    how: "在Housing Connect免費登記，系統自動匹配符合條件的項目並通知申請",
    url: "https://housingconnect.nyc.gov",
    urlText: "前往Housing Connect申請 →",
    stats: [
      {num:"2.7萬+",label:"2024年新增套數"},
      {num:"免費",label:"申請費用"},
      {num:"每日更新",label:"新項目發布"},
    ],
  },
  {
    id: "hcr",
    name: "HCR",
    nameFull: "紐約州住房與社區更新局",
    nameEn: "Homes and Community Renewal",
    icon: "🏗️",
    color: "#3A7A6A",
    border: "#3A7A6A",
    tag: "州級保障房",
    tagColor: "#3A7A6A",
    desc: "紐約州級保障房機構，管理全州包括NYC的租金管制房、低收入稅收抵免項目（LIHTC）及農村住房計劃。",
    who: "低中收入家庭，收入需低於AMI 60%–80%",
    how: "通過HCR官網查詢各項目候補名單，或聯繫當地項目管理方直接申請",
    url: "https://hcr.ny.gov/find-affordable-housing",
    urlText: "前往HCR查詢 →",
    stats: [
      {num:"全州",label:"覆蓋範圍"},
      {num:"LIHTC",label:"主要項目類型"},
      {num:"各異",label:"輪候期"},
    ],
  },
  {
    id: "section8",
    name: "Section 8 房東庫",
    nameFull: "接受住房券的華人房東",
    nameEn: "Section 8 Landlord Database",
    icon: "🤝",
    color: "#7A4A9A",
    border: "#7A4A9A",
    tag: "住易自建",
    tagColor: "#7A4A9A",
    desc: "住易正在建立接受Section 8住房券的華人房東數據庫。持券人可優先匹配，房東免費登記，未來按成功撮合分成。",
    who: "持有有效Section 8住房券的家庭",
    how: "全程陪跑用戶可獲優先匹配服務；房東可免費登記空房",
    url: "/landlord",
    urlText: "房東免費登記 →",
    stats: [
      {num:"建設中",label:"數據庫狀態"},
      {num:"免費",label:"房東登記"},
      {num:"優先",label:"全程陪跑用戶"},
    ],
  },
];

export default function DatabasePage(){
  return(
    <div style={{fontFamily:"PingFang TC,sans-serif",minHeight:"100vh",background:"#F7F8FA"}}>
      <div style={{background:"#1A2B4A",padding:"0 20px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:760,margin:"0 auto",display:"flex",alignItems:"center",height:60,gap:14}}>
          <a href="/" style={{color:"#7A9CC8",fontSize:24,textDecoration:"none",lineHeight:1}}>←</a>
          <span style={{color:"#fff",fontSize:18,fontWeight:700}}>福利住房數據庫</span>
        </div>
      </div>

      <div style={{background:"linear-gradient(160deg,#1A2B4A 0%,#2A4A7A 100%)",padding:"40px 24px 48px",textAlign:"center"}}>
        <div style={{fontSize:14,color:"#9ABCE8",letterSpacing:2,marginBottom:8}}>住易 · 官方資源</div>
        <h1 style={{margin:0,fontSize:26,fontWeight:800,color:"#fff",lineHeight:1.4}}>紐約保障房三大機構</h1>
        <p style={{margin:"10px 0 0",fontSize:14,color:"#9ABCE8",lineHeight:1.7}}>NYCHA · HPD · HCR　+ 住易Section 8房東庫</p>
      </div>

      <div style={{maxWidth:760,margin:"0 auto",padding:"24px 16px 60px"}}>
        {ORGS.map(org=>(
          <div key={org.id} style={{background:"#fff",borderRadius:20,marginBottom:16,boxShadow:"0 2px 12px rgba(0,0,0,0.06)",overflow:"hidden",border:`1.5px solid ${org.border}18`}}>
            <div style={{padding:"20px 20px 0"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:14,marginBottom:14}}>
                <div style={{fontSize:40,flexShrink:0}}>{org.icon}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
                    <span style={{fontSize:20,fontWeight:800,color:org.color}}>{org.name}</span>
                    <span style={{fontSize:11,background:org.tagColor+"18",color:org.tagColor,borderRadius:6,padding:"2px 8px",fontWeight:600}}>{org.tag}</span>
                  </div>
                  <div style={{fontSize:13,color:"#5A6A8A",marginBottom:2}}>{org.nameFull}</div>
                  <div style={{fontSize:11,color:"#8A9AB0"}}>{org.nameEn}</div>
                </div>
              </div>
              <p style={{fontSize:14,color:"#2A3A5A",lineHeight:1.8,margin:"0 0 14px"}}>{org.desc}</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                <div style={{background:"#F7F8FA",borderRadius:10,padding:"10px 12px"}}>
                  <div style={{fontSize:11,color:"#8A9AB0",marginBottom:4}}>適合人群</div>
                  <div style={{fontSize:13,color:"#1A2B4A",lineHeight:1.5}}>{org.who}</div>
                </div>
                <div style={{background:"#F7F8FA",borderRadius:10,padding:"10px 12px"}}>
                  <div style={{fontSize:11,color:"#8A9AB0",marginBottom:4}}>如何申請</div>
                  <div style={{fontSize:13,color:"#1A2B4A",lineHeight:1.5}}>{org.how}</div>
                </div>
              </div>
              <div style={{display:"flex",gap:8,marginBottom:16}}>
                {org.stats.map((s,i)=>(
                  <div key={i} style={{flex:1,textAlign:"center",background:org.color+"08",borderRadius:10,padding:"8px 4px"}}>
                    <div style={{fontSize:16,fontWeight:800,color:org.color}}>{s.num}</div>
                    <div style={{fontSize:11,color:"#8A9AB0",marginTop:2}}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <a href={org.url} target={org.url.startsWith("http")?"_blank":"_self"} rel="noopener noreferrer"
              style={{display:"block",padding:"14px 20px",background:org.color,color:"#fff",
                fontSize:14,fontWeight:700,textDecoration:"none",textAlign:"center"}}>
              {org.urlText}
            </a>
          </div>
        ))}

        <div style={{background:"#1A2B4A",borderRadius:16,padding:"20px",marginTop:8,textAlign:"center"}}>
          <div style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:6}}>需要全程中文指引？</div>
          <div style={{fontSize:13,color:"#9ABCE8",marginBottom:14,lineHeight:1.6}}>住易陪跑用戶可獲個性化房源推送、中文填表指引及優先房東匹配</div>
          <a href="/pricing" style={{display:"inline-block",padding:"11px 28px",borderRadius:10,
            background:"linear-gradient(135deg,#FFD066,#FFA500)",color:"#1A2B4A",
            fontSize:14,fontWeight:700,textDecoration:"none"}}>
            查看陪跑套餐 →
          </a>
        </div>
      </div>
    </div>
  );
}
