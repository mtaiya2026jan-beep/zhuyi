"use client";
import {useState} from "react";

const CHANGES=[
  {id:"income",icon:"💰",title:"收入變更",deadline:"30天內",urgency:"high",desc:"工資上漲、失業、換工作、開始自僱、獲得新收入來源",steps:["收集收入證明文件（新僱主信、最近3個月工資單、失業金通知）","登入 selfserve.nycha.info，選擇「Income Reporting」","填寫所有家庭成員的新收入金額和來源","上傳文件並提交，保留確認號碼截圖"],guide:["「New Income Amount」填寫稅前月收入","「Income Source」選擇工資填 Wages，自僱填 Self-Employment","收入減少也需申報，可降低你的租金","提交後NYCHA約2-4週重新計算租金"],warning:"收入增加後30天內必須申報，漏報會導致NYCHA追溯補收租金差額，金額可能高達數千美元"},
  {id:"family",icon:"👨‍👩‍👧",title:"家庭成員變更",deadline:"30天內",urgency:"high",desc:"新增家庭成員、成員遷出、監護權變更、成員死亡",steps:["準備相關文件：新成員需出生證明+身份證+收入證明；遷出需聲明書","登入 selfserve.nycha.info，選擇「Family Composition Change」","填寫變更原因和新家庭成員資料","提交後等待NYCHA審核，約4-6週"],guide:["新生兒：提供醫院出生證明（Birth Certificate）","老人入住：提供其身份證和收入證明（如社安金SSI信件）","成員遷出：填寫 Removal of Household Member 表格","遷出成員不需提供理由，但需要其簽署聲明"],warning:"未申報的家庭成員居住屬違規，NYCHA抽查時發現可導致終止住房資格"},
  {id:"address",icon:"📍",title:"地址變更（搬遷）",deadline:"立即申報",urgency:"high",desc:"搬入新住所、臨時搬離原住所超過30天",steps:["搬遷前通知NYCHA，填寫 Notice to Vacate","確保新住所已通過NYCHA HQS檢查","搬入後登入 selfserve.nycha.info 更新地址","同步更新所有政府文件（DMV、Social Security、郵局）"],guide:["若持有Section 8券搬遷（Move with Voucher）需住滿12個月","搬遷前需獲得NYCHA批准，未批准搬遷可能影響補貼","新地址必須在NYCHA管轄範圍內","搬遷後30天內完成所有文件更新"],warning:"離開住所超過連續30天未申報，NYCHA可視為放棄住房，終止補貼"},
  {id:"marriage",icon:"💍",title:"婚姻狀況變更",deadline:"30天內",urgency:"medium",desc:"結婚、離婚、法定分居",steps:["準備文件：結婚證（Marriage Certificate）或離婚令（Divorce Decree）","到NYCHA辦事處或郵寄提交婚姻狀況變更申請","配偶加入家庭需同時提交家庭成員變更和收入申報","等待NYCHA重新計算租金（約4-6週）"],guide:["結婚後配偶收入計入家庭總收入，租金可能增加","離婚後若配偶搬出需申報成員遷出","配偶為非公民需提供移民身份文件","婚姻狀況變更可能影響家庭規模認定和房型資格"],warning:"結婚未申報配偶收入屬欺詐行為，NYCHA有權追溯補收差額"},
  {id:"student",icon:"🎓",title:"學生身份變更",deadline:"30天內",urgency:"medium",desc:"家庭成員開始或結束全日制就讀（18歲以上）",steps:["準備文件：入學確認信（Enrollment Verification）或退學/畢業證明","登入 selfserve.nycha.info 或到辦事處提交學生身份變更","說明就讀學校、課程類型（全日制/兼讀）","等待NYCHA重新評估收入計算方式"],guide:["全日制學生（Full-time）：每學期超過12學分","全日制學生的收入計算方式與在職人員不同","學生打工收入按全年計算，需提交工資單","畢業或退學後30天內申報，避免多收租金"],warning:"18歲以上成員學生身份影響收入計算，未申報可能造成租金計算錯誤"},
  {id:"employment",icon:"💼",title:"就業狀態變更",deadline:"30天內",urgency:"medium",desc:"全職轉兼職、兼職轉全職、換僱主、開始或停止自僱",steps:["準備新僱主僱傭信（Offer Letter）或自僱收入文件","登入 selfserve.nycha.info 更新僱主資料和收入","提交最近3個月工資單（Pay Stubs）","自僱者提交最近稅表（Tax Return）和收入記錄"],guide:["換僱主需同時更新收入和僱主信息","「Employer Name」填寫新公司全名","「Start Date」填寫新工作開始日期","即使收入不變，換僱主也需申報新僱主信息"],warning:"僱主信息過期或錯誤可能導致NYCHA無法核實收入，影響補貼計算"},
  {id:"assets",icon:"🏦",title:"資產變更",deadline:"年審時申報",urgency:"low",desc:"銀行存款大額變化、繼承財產、出售不動產、股票收益",steps:["記錄資產變更的書面證明（銀行對帳單、遺囑認證文件等）","在年審時向NYCHA申報所有超過5,000美元的資產","填寫 Asset Declaration 表格","提供最近3個月銀行對帳單"],guide:["資產超過$5,000部分按2%計入年收入","例如銀行存款$50,000，計入收入=$50,000×2%=$1,000/年","出售房產所得需申報，繼承財產也需申報","股票、退休金帳戶（401k/IRA）按市值申報"],warning:"隱瞞資產屬欺詐，NYCHA可追溯5年補收差額並終止住房資格"},
  {id:"disability",icon:"♿",title:"殘障/醫療狀況變更",deadline:"隨時申報",urgency:"medium",desc:"新增殘障認定、醫療狀況改變影響居住需求",steps:["獲取醫生或醫院出具的殘障證明文件（Disability Documentation）","向NYCHA提交 Reasonable Accommodation Request","說明需要的特殊住房配置（無障礙設施、接近醫療機構等）","等待NYCHA評估，通常4-8週"],guide:["Reasonable Accommodation可申請：延長Section 8券有效期、優先換房、殘障友好單元","身體殘障需醫生出具診斷書","精神健康問題同樣可申請","申請後NYCHA不得以殘障理由拒絕或終止住房資格"],warning:"殘障狀況可大幅改善你的住房選擇，應儘早申報以獲得相應優先待遇"},
  {id:"immigration",icon:"🛂",title:"移民身份變更",deadline:"30天內",urgency:"high",desc:"綠卡到期、身份調整、獲得公民身份、家庭成員身份變化",steps:["準備新移民身份文件（新綠卡、入籍證書N-550等）","到NYCHA辦事處親自提交（不建議郵寄重要移民文件）","同時諮詢持牌移民律師確認身份對補貼的影響","等待NYCHA更新記錄"],guide:["公民和合法永久居民（綠卡持有人）資格不受影響","部分非公民身份可能影響補貼金額（混合家庭按人頭計算）","⚠️ 住易僅提供申報流程說明，不提供任何移民法律建議","如有身份疑問，請聯繫持牌移民律師或法律援助機構"],warning:"⚠️ 移民身份問題敏感，強烈建議同時諮詢持牌移民律師。住易不提供移民法律建議。"},
];

const urgencyColor:Record<string,{bg:string,color:string,label:string}>={
  high:{bg:"#FFF0F0",color:"#E84A4A",label:"30天內必報"},
  medium:{bg:"#FFF8E8",color:"#B05A00",label:"需申報"},
  low:{bg:"#F0F4FF",color:"#2A5A9A",label:"年審時報"},
};

export default function ChangesPage(){
  const [selected,setSelected]=useState<string|null>(null);
  const [tab,setTab]=useState<Record<string,string>>({});

  return(
    <div style={{fontFamily:"PingFang TC,sans-serif",minHeight:"100vh",background:"#F7F8FA"}}>
      <div style={{background:"#1A2B4A",padding:"0 20px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:720,margin:"0 auto",display:"flex",alignItems:"center",height:60,gap:14}}>
          <a href="/" style={{color:"#7A9CC8",fontSize:24,textDecoration:"none",lineHeight:1}}>←</a>
          <span style={{color:"#fff",fontSize:18,fontWeight:700}}>Section 8 變更申報指引</span>
        </div>
      </div>
      <div style={{background:"linear-gradient(160deg,#1A2B4A 0%,#2A4A7A 100%)",padding:"36px 24px 44px",textAlign:"center"}}>
        <h1 style={{margin:0,fontSize:24,fontWeight:800,color:"#fff"}}>發生變更？要在30天內報NYCHA</h1>
        <p style={{margin:"10px 0 0",fontSize:14,color:"#9ABCE8"}}>點擊你發生的變更類型，查看中文填表指引</p>
      </div>
      <div style={{maxWidth:720,margin:"0 auto",padding:"24px 16px 60px"}}>
        <div style={{background:"#FFF8E8",border:"1.5px solid #FFD066",borderRadius:14,padding:"14px 16px",marginBottom:20,fontSize:13,color:"#7A5A2A",lineHeight:1.7}}>
          💡 大部分變更必須在發生後<strong>30天內</strong>向NYCHA申報。漏報可能導致補繳租金差額或影響住房資格。
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {CHANGES.map(c=>{
            const u=urgencyColor[c.urgency];
            const isOpen=selected===c.id;
            const currentTab=tab[c.id]||"steps";
            return(
              <div key={c.id} style={{background:"#fff",borderRadius:16,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
                <button onClick={()=>setSelected(isOpen?null:c.id)}
                  style={{width:"100%",textAlign:"left",padding:"16px",background:"none",border:"none",cursor:"pointer",display:"flex",gap:12,alignItems:"center"}}>
                  <span style={{fontSize:28,flexShrink:0}}>{c.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
                      <span style={{fontSize:15,fontWeight:700,color:"#1A2B4A"}}>{c.title}</span>
                      <span style={{fontSize:11,background:u.bg,color:u.color,borderRadius:6,padding:"2px 8px",fontWeight:600}}>{u.label}</span>
                    </div>
                    <div style={{fontSize:12,color:"#8A9AB0"}}>{c.desc}</div>
                  </div>
                  <span style={{fontSize:18,color:"#8A9AB0",flexShrink:0}}>{isOpen?"▲":"▼"}</span>
                </button>
                {isOpen&&(
                  <div style={{padding:"0 16px 16px",borderTop:"1px solid #F0F3F8"}}>
                    <div style={{display:"flex",gap:8,marginTop:14,marginBottom:14}}>
                      {["steps","guide"].map(t=>(
                        <button key={t} onClick={()=>setTab({...tab,[c.id]:t})}
                          style={{flex:1,padding:"8px",borderRadius:8,border:"none",fontSize:13,fontWeight:600,cursor:"pointer",
                            background:currentTab===t?"#1A2B4A":"#F4F6FB",color:currentTab===t?"#fff":"#5A6A8A"}}>
                          {t==="steps"?"📋 申報步驟":"✏️ 中文填表指引"}
                        </button>
                      ))}
                    </div>
                    {currentTab==="steps"&&(
                      <div>
                        {c.steps.map((s,i)=>(
                          <div key={i} style={{display:"flex",gap:10,marginBottom:10,alignItems:"flex-start"}}>
                            <div style={{width:22,height:22,borderRadius:"50%",background:"#2A5A9A",color:"#fff",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</div>
                            <span style={{fontSize:13,color:"#2A3A5A",lineHeight:1.6,paddingTop:2}}>{s}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {currentTab==="guide"&&(
                      <div>
                        {c.guide.map((g,i)=>(
                          <div key={i} style={{display:"flex",gap:8,marginBottom:8,alignItems:"flex-start"}}>
                            <span style={{fontSize:13,color:"#2A5A9A",fontWeight:700,flexShrink:0}}>→</span>
                            <span style={{fontSize:13,color:"#2A3A5A",lineHeight:1.6}}>{g}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div style={{background:u.bg,borderRadius:10,padding:"10px 12px",marginTop:12,fontSize:12,color:u.color,lineHeight:1.6}}>⚠️ {c.warning}</div>
                    <a href="/reminders" style={{display:"block",padding:"11px",borderRadius:10,background:"#1A2B4A",color:"#fff",textAlign:"center",fontSize:13,fontWeight:700,textDecoration:"none",marginTop:12}}>
                      設定30天申報提醒 →
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div style={{background:"#1A2B4A",borderRadius:16,padding:"20px",marginTop:20,textAlign:"center"}}>
          <div style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:6}}>需要一對一中文指引？</div>
          <div style={{fontSize:13,color:"#9ABCE8",marginBottom:14}}>全程陪跑用戶可獲AI住房助手24小時答疑</div>
          <a href="/pricing" style={{display:"inline-block",padding:"11px 28px",borderRadius:10,background:"linear-gradient(135deg,#FFD066,#FFA500)",color:"#1A2B4A",fontSize:14,fontWeight:700,textDecoration:"none"}}>
            查看全程陪跑 →
          </a>
        </div>
      </div>
    </div>
  );
}
