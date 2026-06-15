"use client";

const ORGS=[
  {
    id:"nycha",
    name:"NYCHA",
    nameFull:"紐約市住房局",
    nameEn:"New York City Housing Authority",
    icon:"🏛️",
    color:"#1A2B4A",
    tag:"公共租賃房",
    tagColor:"#1A6A3A",
    status:"closed",
    statusLabel:"⚫ 輪候名單已關閉",
    statusColor:"#E84A4A",
    desc:"紐約市最大公共住房機構，管理17.7萬套公租房。租金按家庭收入30%計算，與市場價無關。",
    stats:[
      {num:"17.7萬",label:"公租房套數"},
      {num:"25萬+",label:"輪候家庭數"},
      {num:"數年至10年+",label:"預估等待時間"},
    ],
    details:[
      "輪候名單於2026年4月已關閉，目前不接受新申請",
      "現有輪候者可登入NYCHA Self-Service Portal查看排位",
      "老人、殘障人士、退伍軍人、無家可歸者可獲優先排位",
      "收入需低於AMI 50%（4口之家約$69,275）",
    ],
    alert:"⚠️ 目前輪候名單已關閉，新申請者需等待下次開放。上次開放為2024年6月，隨機抽選20萬戶進入輪候。",
    url:"/ami",
    urlText:"先測算AMI資格 →",
    officialUrl:"https://selfserve.nycha.info",
    officialUrlText:"NYCHA官網查輪候",
    guide:[
      "登入 selfserve.nycha.info 查詢現有申請狀態",
      "確保聯繫方式和地址保持最新，以免錯過通知",
      "關注NYCHA官網，等待下次輪候名單開放公告",
    ],
  },
  {
    id:"hpd",
    name:"HPD / Housing Connect",
    nameFull:"住房保護與發展局",
    nameEn:"Dept. of Housing Preservation & Development",
    icon:"🏠",
    color:"#2A5A9A",
    tag:"抽籤保障房",
    tagColor:"#2A5A9A",
    status:"open",
    statusLabel:"🟢 每日有新項目",
    statusColor:"#1A6A3A",
    desc:"通過Housing Connect平台以抽籤方式分配保障房，每年新增數萬套。申請免費，中籤後按收入審核資格。",
    stats:[
      {num:"2.7萬+",label:"2024年新增套數"},
      {num:"免費",label:"申請費用"},
      {num:"每日",label:"新項目發布"},
    ],
    details:[
      "在Housing Connect免費登記後，系統自動匹配符合條件項目",
      "各收入檔位均有（30%–130% AMI），視項目而定",
      "中籤後需提交收入證明、身份文件等材料",
      "⭐ 新增：紐約州HAVP住房券（2026年3月起）不限移民身份",
    ],
    alert:"💡 HAVP是新項目：紐約州住房券，不需要輪候名單，由政府合作機構代申請，不限移民身份。聯繫住易了解申請方式。",
    url:"/ami",
    urlText:"先測算AMI資格 →",
    officialUrl:"https://housingconnect.nyc.gov",
    officialUrlText:"Housing Connect申請",
    guide:[
      "在housingconnect.nyc.gov免費建立帳號",
      "填寫家庭收入和人口，系統自動推送符合條件項目",
      "每個項目申請只需幾分鐘，多申請多機會",
      "中籤後住易可提供中文填表指引",
    ],
  },
  {
    id:"hcr",
    name:"HCR",
    nameFull:"紐約州住房與社區更新局",
    nameEn:"Homes and Community Renewal",
    icon:"🏗️",
    color:"#3A7A6A",
    tag:"州級保障房",
    tagColor:"#3A7A6A",
    status:"varies",
    statusLabel:"🟡 各項目不同",
    statusColor:"#8A6A00",
    desc:"紐約州級保障房機構，管理全州租金管制房、低收入稅收抵免項目（LIHTC）及農村住房計劃。",
    stats:[
      {num:"全州",label:"覆蓋範圍"},
      {num:"60%–80%",label:"適用AMI範圍"},
      {num:"LIHTC",label:"主要項目類型"},
    ],
    details:[
      "主要管理低收入稅收抵免房（LIHTC），收入需低於AMI 60%",
      "通過各項目管理方直接申請，無統一平台",
      "部分項目有較短輪候期（相比NYCHA）",
      "適合已有固定居住需求、不急於搬遷的家庭",
    ],
    alert:"",
    url:"/ami",
    urlText:"先測算AMI資格 →",
    officialUrl:"https://hcr.ny.gov/find-affordable-housing",
    officialUrlText:"HCR官網查詢",
    guide:[
      "進入hcr.ny.gov，選擇'Find Affordable Housing'",
      "輸入所在區域和家庭收入篩選合適項目",
      "聯繫各項目管理方詢問輪候狀態",
    ],
  },
  {
    id:"section8",
    name:"Section 8 房東庫",
    nameFull:"接受住房券的華人房東",
    nameEn:"Section 8 Landlord Database",
    icon:"🤝",
    color:"#7A4A9A",
    tag:"住易自建",
    tagColor:"#7A4A9A",
    status:"building",
    statusLabel:"🔨 建設中",
    statusColor:"#7A4A9A",
    desc:"住易正在建立接受Section 8住房券的華人房東數據庫。持券人可優先匹配，房東免費登記。",
    stats:[
      {num:"建設中",label:"數據庫狀態"},
      {num:"免費",label:"房東登記"},
      {num:"優先",label:"全程陪跑用戶"},
    ],
    details:[
      "全程陪跑用戶可獲優先房東匹配服務",
      "房東免費登記，住易主動為你推送合資格持券租客",
      "持券人找到房東後，住易協助辦理NYCHA申請手續",
      "目前積極引流房東登記，數據庫持續擴大",
    ],
    alert:"",
    url:"/landlord",
    urlText:"房東免費登記 →",
    officialUrl:"",
    officialUrlText:"",
    guide:[],
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
        <p style={{margin:"10px 0 0",fontSize:14,color:"#9ABCE8"}}>最新輪候狀態 · 中文申請指引 · 2026年數據</p>
      </div>
      <div style={{maxWidth:760,margin:"0 auto",padding:"24px 16px 60px"}}>
        {ORGS.map(org=>(
          <div key={org.id} style={{background:"#fff",borderRadius:20,marginBottom:16,boxShadow:"0 2px 12px rgba(0,0,0,0.06)",overflow:"hidden"}}>
            <div style={{padding:"20px 20px 0"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:14,marginBottom:12}}>
                <div style={{fontSize:40,flexShrink:0}}>{org.icon}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
                    <span style={{fontSize:20,fontWeight:800,color:org.color}}>{org.name}</span>
                    <span style={{fontSize:11,background:org.tagColor+"18",color:org.tagColor,borderRadius:6,padding:"2px 8px",fontWeight:600}}>{org.tag}</span>
                    <span style={{fontSize:11,background:"#F4F6FB",color:org.statusColor,borderRadius:6,padding:"2px 8px",fontWeight:600}}>{org.statusLabel}</span>
                  </div>
                  <div style={{fontSize:12,color:"#8A9AB0"}}>{org.nameEn}</div>
                </div>
              </div>
              <p style={{fontSize:14,color:"#2A3A5A",lineHeight:1.8,margin:"0 0 12px"}}>{org.desc}</p>

              {org.alert&&(
                <div style={{background:"#FFF8E8",border:"1.5px solid #FFD066",borderRadius:10,padding:"10px 12px",marginBottom:12,fontSize:12,color:"#7A5A2A",lineHeight:1.7}}>
                  {org.alert}
                </div>
              )}

              <div style={{display:"flex",gap:8,marginBottom:14}}>
                {org.stats.map((s,i)=>(
                  <div key={i} style={{flex:1,textAlign:"center",background:org.color+"08",borderRadius:10,padding:"8px 4px"}}>
                    <div style={{fontSize:13,fontWeight:800,color:org.color}}>{s.num}</div>
                    <div style={{fontSize:10,color:"#8A9AB0",marginTop:2}}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div style={{marginBottom:14}}>
                <div style={{fontSize:13,fontWeight:700,color:"#1A2B4A",marginBottom:8}}>📋 重要資訊：</div>
                {org.details.map((d,i)=>(
                  <div key={i} style={{display:"flex",gap:8,marginBottom:6,alignItems:"flex-start"}}>
                    <div style={{width:5,height:5,borderRadius:"50%",background:org.color,flexShrink:0,marginTop:7}}/>
                    <span style={{fontSize:13,color:"#2A3A5A",lineHeight:1.6}}>{d}</span>
                  </div>
                ))}
              </div>

              {org.guide.length>0&&(
                <div style={{background:"#F0F4FF",borderRadius:10,padding:"12px 14px",marginBottom:14}}>
                  <div style={{fontSize:12,fontWeight:700,color:"#2A5A9A",marginBottom:8}}>💡 中文申請指引：</div>
                  {org.guide.map((g,i)=>(
                    <div key={i} style={{display:"flex",gap:8,marginBottom:5,alignItems:"flex-start"}}>
                      <span style={{fontSize:12,color:"#2A5A9A",fontWeight:700,flexShrink:0}}>{i+1}.</span>
                      <span style={{fontSize:12,color:"#2A3A5A",lineHeight:1.6}}>{g}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{display:"flex",gap:0}}>
              <a href={org.url} target={org.url.startsWith("http")?"_blank":"_self"} rel="noopener noreferrer"
                style={{flex:1,display:"block",padding:"14px 12px",background:org.color,color:"#fff",fontSize:13,fontWeight:700,textDecoration:"none",textAlign:"center"}}>
                {org.urlText}
              </a>
              {org.officialUrl&&(
                <a href={org.officialUrl} target="_blank" rel="noopener noreferrer"
                  style={{flex:1,display:"block",padding:"14px 12px",background:org.color+"CC",color:"#fff",fontSize:13,fontWeight:600,textDecoration:"none",textAlign:"center",borderLeft:"1px solid rgba(255,255,255,0.2)"}}>
                  {org.officialUrlText}
                </a>
              )}
            </div>
          </div>
        ))}

        <div style={{background:"#1A2B4A",borderRadius:16,padding:"20px",textAlign:"center"}}>
          <div style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:6}}>需要全程中文指引？</div>
          <div style={{fontSize:13,color:"#9ABCE8",marginBottom:14}}>住易陪跑用戶可獲個性化房源推送、中文填表指引及優先房東匹配</div>
          <a href="/pricing" style={{display:"inline-block",padding:"11px 28px",borderRadius:10,background:"linear-gradient(135deg,#FFD066,#FFA500)",color:"#1A2B4A",fontSize:14,fontWeight:700,textDecoration:"none"}}>
            查看陪跑套餐 →
          </a>
        </div>
      </div>
    </div>
  );
}
