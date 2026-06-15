"use client";
import {useState} from "react";

const CHANGES=[
  {id:"income",icon:"💰",title:"收入變更",deadline:"30天內",urgency:"high",desc:"工資上漲、失業、換工作、開始自僱、獲得新收入來源",steps:["準備收入證明文件（新僱主信、工資單、失業金通知等）","登入 NYCHA Self-Service Portal 提交收入變更申報","或親臨NYCHA辦事處提交書面申報","保留提交確認號碼"],warning:"收入增加後30天內必須申報，漏報會導致NYCHA追溯補收租金差額",url:"https://selfserve.nycha.info",urlText:"前往NYCHA Self-Service Portal"},
  {id:"family",icon:"👨‍👩‍👧",title:"家庭成員變更",deadline:"30天內",urgency:"high",desc:"新增家庭成員、成員遷出、監護權變更、成員死亡",steps:["準備相關文件（出生證明、死亡證明、監護令等）","向NYCHA提交家庭組成變更申請","新增成員需提交身份證明和收入證明","等待NYCHA審核並重新計算租金"],warning:"未申報的家庭成員居住屬違規，嚴重時可影響住房資格",url:"https://www.nyc.gov/site/nycha/residents/self-service.page",urlText:"前往NYCHA居民服務"},
  {id:"address",icon:"📍",title:"地址變更",deadline:"立即申報",urgency:"high",desc:"搬入新住所、臨時搬離原住所超過30天",steps:["提前通知NYCHA搬遷計劃","提交新地址和搬遷日期","確保新住所通過HQS檢查","更新所有政府文件上的地址"],warning:"離開住所超過30天未申報可能被視為放棄住房資格",url:"https://selfserve.nycha.info",urlText:"前往NYCHA Self-Service Portal"},
  {id:"marriage",icon:"💍",title:"婚姻狀況變更",deadline:"30天內",urgency:"medium",desc:"結婚、離婚、法定分居",steps:["準備結婚證書或離婚文件","向NYCHA申報婚姻狀況變更","如配偶加入或離開家庭，同時提交家庭成員變更","重新計算家庭收入和租金"],warning:"婚姻狀況影響家庭收入計算和補貼金額",url:"https://selfserve.nycha.info",urlText:"前往NYCHA Self-Service Portal"},
  {id:"student",icon:"🎓",title:"學生身份變更",deadline:"30天內",urgency:"medium",desc:"家庭成員開始或結束全日制就讀，18歲以上成員就學狀態改變",steps:["準備學校入學證明或畢業退學證明","向NYCHA申報學生身份變更","全日制學生可能影響收入計算方式","等待NYCHA重新評估補貼金額"],warning:"18歲以上全日制學生的收入計算方式與在職人員不同",url:"https://selfserve.nycha.info",urlText:"前往NYCHA Self-Service Portal"},
  {id:"employment",icon:"💼",title:"就業狀態變更",deadline:"30天內",urgency:"medium",desc:"全職轉兼職、兼職轉全職、換僱主、開始或停止自僱",steps:["準備新僱主僱傭信或自僱收入文件","向NYCHA申報就業狀態和僱主資料變更","提交最新工資單或稅務文件","更新收入資料"],warning:"就業狀態變更需單獨申報僱主信息，即使收入未變也需更新",url:"https://selfserve.nycha.info",urlText:"前往NYCHA Self-Service Portal"},
  {id:"assets",icon:"🏦",title:"資產變更",deadline:"年審時申報",urgency:"low",desc:"銀行存款大額變化、繼承財產、出售不動產、股票收益",steps:["記錄資產變更的書面證明","在年審時向NYCHA申報所有資產","資產超過5,000美元需計入收入計算","提供銀行對帳單等文件"],warning:"隱瞞資產屬欺詐行為，年審時必須如實申報",url:"https://selfserve.nycha.info",urlText:"前往NYCHA Self-Service Portal"},
  {id:"disability",icon:"♿",title:"殘障/醫療狀況變更",deadline:"隨時申報",urgency:"medium",desc:"新增殘障認定、醫療狀況改變、需要無障礙設施",steps:["獲取醫療證明或殘障認定文件","向NYCHA申請Reasonable Accommodation","說明需要的特殊住房配置","NYCHA會評估並提供相應安排"],warning:"殘障狀況可申請Reasonable Accommodation延長券有效期或優先換房",url:"https://www.nyc.gov/site/nycha/residents/reasonable-accommodation.page",urlText:"了解Reasonable Accommodation"},
  {id:"immigration",icon:"🛂",title:"移民身份變更",deadline:"30天內",urgency:"high",desc:"綠卡到期、身份調整、獲得公民身份、家庭成員身份變化",steps:["準備移民身份文件（新綠卡、入籍證書等）","向NYCHA申報身份變更","部分非公民身份可能影響補貼資格","強烈建議同時諮詢移民律師"],warning:"⚠️ 住易僅提供申報流程指引，不提供移民法律建議。移民身份問題請諮詢持牌移民律師。",url:"https://selfserve.nycha.info",urlText:"前往NYCHA Self-Service Portal"},
];

const urgencyColor:Record<string,{bg:string,color:string,label:string}>={
  high:{bg:"#FFF0F0",color:"#E84A4A",label:"30天內必報"},
  medium:{bg:"#FFF8E8",color:"#B05A00",label:"需申報"},
  low:{bg:"#F0F4FF",color:"#2A5A9A",label:"年審時報"},
};

export default function ChangesPage(){
  const [selected,setSelected]=useState<string|null>(null);
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
        <p style={{margin:"10px 0 0",fontSize:14,color:"#9ABCE8"}}>點擊你發生的變更類型，查看中文申報步驟</p>
      </div>
      <div style={{maxWidth:720,margin:"0 auto",padding:"24px 16px 60px"}}>
        <div style={{background:"#FFF8E8",border:"1.5px solid #FFD066",borderRadius:14,padding:"14px 16px",marginBottom:20,fontSize:13,color:"#7A5A2A",lineHeight:1.7}}>
          💡 大部分變更必須在發生後<strong>30天內</strong>向NYCHA申報。漏報或遲報可能導致補繳租金差額或影響住房資格。
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {CHANGES.map(c=>{
            const u=urgencyColor[c.urgency];
            const isOpen=selected===c.id;
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
                    <div style={{marginTop:14}}>
                      <div style={{fontSize:13,fontWeight:700,color:"#1A2B4A",marginBottom:10}}>📋 申報步驟：</div>
                      {c.steps.map((s,i)=>(
                        <div key={i} style={{display:"flex",gap:10,marginBottom:8,alignItems:"flex-start"}}>
                          <div style={{width:22,height:22,borderRadius:"50%",background:"#2A5A9A",color:"#fff",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</div>
                          <span style={{fontSize:13,color:"#2A3A5A",lineHeight:1.6,paddingTop:2}}>{s}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{background:u.bg,borderRadius:10,padding:"10px 12px",margin:"12px 0",fontSize:12,color:u.color,lineHeight:1.6}}>⚠️ {c.warning}</div>
                    <a href={c.url} target="_blank" rel="noopener noreferrer"
                      style={{display:"block",padding:"11px",borderRadius:10,background:"#1A2B4A",color:"#fff",textAlign:"center",fontSize:13,fontWeight:700,textDecoration:"none"}}>
                      {c.urlText} →
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div style={{background:"#1A2B4A",borderRadius:16,padding:"20px",marginTop:20,textAlign:"center"}}>
          <div style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:6}}>需要設定申報截止提醒？</div>
          <div style={{fontSize:13,color:"#9ABCE8",marginBottom:14}}>登記提醒，住易在截止日前自動發郵件提醒你</div>
          <a href="/reminders" style={{display:"inline-block",padding:"11px 28px",borderRadius:10,background:"linear-gradient(135deg,#FFD066,#FFA500)",color:"#1A2B4A",fontSize:14,fontWeight:700,textDecoration:"none"}}>
            設定截止日提醒 →
          </a>
        </div>
      </div>
    </div>
  );
}
