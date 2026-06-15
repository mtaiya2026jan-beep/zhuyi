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
    desc:"紐約市最大公共住房機構，管理17.7萬套公租房。租金按家庭收入30%計算，與市場價無關。",
    keyInfo:[
      {q:"適合誰",a:"極低收入家庭，收入低於AMI 50%（4口之家約$69,275）"},
      {q:"怎麼申請",a:"輪候名單制，需等待開放期提交申請"},
      {q:"現在能申請嗎",a:"⚫ 暫停 — 輪候名單已於2026年4月關閉"},
    ],
    alert:"⚠️ 輪候名單已關閉，目前不接受新申請。上次開放為2024年6月，隨機抽選20萬戶進入輪候，等待時間數年至10年以上。",
    guide:[
      "現有輪候者：登入 selfserve.nycha.info 查詢排位狀態",
      "確保聯繫方式和地址保持最新，以免錯過通知",
      "老人、殘障人士、退伍軍人可申請優先排位",
      "關注NYCHA官網，等待下次輪候名單開放公告",
    ],
    url:"/ami",
    urlText:"先測算AMI資格 →",
    officialUrl:"https://selfserve.nycha.info",
    officialUrlText:"NYCHA官網查輪候",
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
    desc:"通過Housing Connect平台以抽籤方式分配保障房，每年新增數萬套。申請免費，中籤後按收入審核資格。",
    keyInfo:[
      {q:"適合誰",a:"各收入檔位均有（AMI 30%–130%），視具體項目而定"},
      {q:"怎麼申請",a:"Housing Connect免費登記，系統自動推送符合條件項目"},
      {q:"現在能申請嗎",a:"🟢 可以 — 每日有新項目開放申請"},
    ],
    alert:"💡 新項目：紐約州HAVP住房券（2026年3月起），不限移民身份，由政府合作機構代申請。聯繫住易了解詳情。",
    guide:[
      "在 housingconnect.nyc.gov 免費建立帳號",
      "填寫家庭收入和人口，系統自動推送符合條件項目",
      "每個項目申請只需幾分鐘，多申請多機會",
      "中籤後住易可提供中文填表指引",
    ],
    url:"/ami",
    urlText:"先測算AMI資格 →",
    officialUrl:"https://housingconnect.nyc.gov",
    officialUrlText:"Housing Connect申請",
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
    desc:"紐約州級保障房機構，管理全州租金管制房、低收入稅收抵免項目（LIHTC）及農村住房計劃。",
    keyInfo:[
      {q:"適合誰",a:"低中收入家庭，收入低於AMI 60%–80%"},
      {q:"怎麼申請",a:"通過各項目管理方直接申請，無統一平台"},
      {q:"現在能申請嗎",a:"🟡 視項目 — 各項目輪候狀態不同"},
    ],
    alert:"",
    guide:[
      "進入 hcr.ny.gov，選擇 Find Affordable Housing",
      "輸入所在區域和家庭收入篩選合適項目",
      "聯繫各項目管理方詢問輪候狀態",
    ],
    url:"/ami",
    urlText:"先測算AMI資格 →",
    officialUrl:"https://hcr.ny.gov/find-affordable-housing",
    officialUrlText:"HCR官網查詢",
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
    desc:"住易正在建立接受Section 8住房券的華人房東數據庫。持券人可優先匹配，房東免費登記。",
    keyInfo:[
      {q:"適合誰",a:"持有有效Section 8住房券、正在找房的家庭"},
      {q:"怎麼申請",a:"訂閱全程陪跑，住易顧問優先為你匹配合適房東"},
      {q:"現在能用嗎",a:"🔨 建設中 — 房東數據庫持續擴大中"},
    ],
    alert:"",
    guide:[],
    url:"/landlord",
    urlText:"房東免費登記 →",
    officialUrl:"",
    officialUrlText:"",
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
        <p style={{margin:"10px 0 0",fontSize:14,color:"#9ABCE8"}}>了解各機構差異 · 找到適合你的申請途徑 · 2026年最新狀態</p>
      </div>

      <div style={{maxWidth:760,margin:"0 auto",padding:"24px 16px 60px"}}>

        {/* 快速對比表 */}
        <div style={{background:"#fff",borderRadius:16,padding:"20px",boxShadow:"0 2px 12px rgba(0,0,0,0.06)",marginBottom:20,overflowX:"auto"}}>
          <div style={{fontSize:14,fontWeight:700,color:"#1A2B4A",marginBottom:14}}>📊 三大機構快速對比</div>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead>
              <tr style={{background:"#F4F6FB"}}>
                <th style={{padding:"10px 12px",textAlign:"left",color:"#5A6A8A",fontWeight:600,borderRadius:"8px 0 0 8px"}}></th>
                <th style={{padding:"10px 12px",textAlign:"center",color:"#1A2B4A",fontWeight:700}}>NYCHA</th>
                <th style={{padding:"10px 12px",textAlign:"center",color:"#2A5A9A",fontWeight:700}}>HPD</th>
                <th style={{padding:"10px 12px",textAlign:"center",color:"#3A7A6A",fontWeight:700,borderRadius:"0 8px 8px 0"}}>HCR</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["適合誰","AMI 50%以下","AMI 30%–130%","AMI 60%–80%"],
                ["申請方式","輪候名單","Housing Connect抽籤","各項目直接申請"],
                ["現在能申請","⚫ 暫停","🟢 可以","🟡 視項目"],
                ["等待時間","數年至10年+","抽籤，無固定時間","各項目不同"],
              ].map(([label,...vals],i)=>(
                <tr key={label} style={{borderTop:"1px solid #F0F3F8",background:i%2===0?"#fff":"#FAFBFD"}}>
                  <td style={{padding:"10px 12px",color:"#5A6A8A",fontWeight:600}}>{label}</td>
                  {vals.map((v,j)=>(
                    <td key={j} style={{padding:"10px 12px",textAlign:"center",color:"#1A2B4A"}}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {ORGS.map(org=>(
          <div key={org.id} style={{background:"#fff",borderRadius:20,marginBottom:16,boxShadow:"0 2px 12px rgba(0,0,0,0.06)",overflow:"hidden"}}>
            <div style={{padding:"20px 20px 16px"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:14,marginBottom:12}}>
                <div style={{fontSize:40,flexShrink:0}}>{org.icon}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
                    <span style={{fontSize:20,fontWeight:800,color:org.color}}>{org.name}</span>
                    <span style={{fontSize:11,background:org.tagColor+"18",color:org.tagColor,borderRadius:6,padding:"2px 8px",fontWeight:600}}>{org.tag}</span>
                  </div>
                  <div style={{fontSize:12,color:"#8A9AB0"}}>{org.nameEn}</div>
                </div>
              </div>
              <p style={{fontSize:14,color:"#2A3A5A",lineHeight:1.8,margin:"0 0 14px"}}>{org.desc}</p>

              {/* 三個關鍵問題 */}
              <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
                {org.keyInfo.map((k,i)=>(
                  <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",background:"#F7F8FA",borderRadius:10,padding:"10px 12px"}}>
                    <span style={{fontSize:12,color:"#8A9AB0",fontWeight:600,flexShrink:0,minWidth:80}}>{k.q}</span>
                    <span style={{fontSize:13,color:"#1A2B4A",lineHeight:1.5}}>{k.a}</span>
                  </div>
                ))}
              </div>

              {org.alert&&(
                <div style={{background:"#FFF8E8",border:"1.5px solid #FFD066",borderRadius:10,padding:"10px 12px",marginBottom:14,fontSize:12,color:"#7A5A2A",lineHeight:1.7}}>
                  {org.alert}
                </div>
              )}

              {org.guide.length>0&&(
                <div style={{background:"#F0F4FF",borderRadius:10,padding:"12px 14px",marginBottom:4}}>
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
