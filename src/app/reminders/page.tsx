"use client";
import {useState} from "react";

const GROUPS=[
  {
    id:"searching",
    label:"我還在找房（持券人）",
    icon:"🏷️",
    types:[
      {id:"voucher_expiry",label:"Section 8券截止日",icon:"🏷️",desc:"持券找房截止，提前60/30/7天提醒",days:[60,30,7]},
      {id:"income_change",label:"收入變更申報",icon:"💰",desc:"收入變更後30天內必須報NYCHA，提前15/7/1天提醒",days:[15,7,1]},
      {id:"family_change",label:"家庭成員變更",icon:"👨‍👩‍👧",desc:"新增/遷出家庭成員後30天內必須申報",days:[15,7,1]},
      {id:"other",label:"其他自定義提醒",icon:"⏰",desc:"自定義任何需要提醒的截止日",days:[30,7,1]},
    ]
  },
  {
    id:"housed",
    label:"我已入住保障房（年審通用戶）",
    icon:"🏠",
    types:[
      {id:"annual_review",label:"年審截止日",icon:"📅",desc:"Section 8年審提交截止，提前60/30/7天提醒",days:[60,30,7]},
      {id:"lease_expiry",label:"租約到期",icon:"📋",desc:"租約到期提醒，提前60/30天提醒",days:[60,30]},
      {id:"move_eligible",label:"換房資格提醒",icon:"🏠",desc:"入住滿11個月可申請換房，提前提醒",days:[30,7]},
      {id:"income_change_housed",label:"收入變更申報",icon:"💰",desc:"收入變更後30天內必須報NYCHA",days:[15,7,1]},
      {id:"family_change_housed",label:"家庭成員變更",icon:"👨‍👩‍👧",desc:"新增/遷出成員後30天內必須申報",days:[15,7,1]},
      {id:"other_housed",label:"其他自定義提醒",icon:"⏰",desc:"自定義任何需要提醒的截止日",days:[30,7,1]},
    ]
  },
];
const ALL_TYPES=GROUPS.flatMap(g=>g.types);

export default function RemindersPage(){
  const [group,setGroup]=useState("");
  const [type,setType]=useState("");
  const [form,setForm]=useState({name:"",email:"",deadline:"",notes:""});
  const [loading,setLoading]=useState(false);
  const [done,setDone]=useState(false);
  const [error,setError]=useState("");

  const selectedType=ALL_TYPES.find(r=>r.id===type);
  const currentGroup=GROUPS.find(g=>g.id===group);

  function calcRemindDates(deadline:string,days:number[]){
    const today=new Date().toISOString().split("T")[0];
    return days.map(n=>{
      const r=new Date(deadline);
      r.setDate(r.getDate()-n);
      return r.toISOString().split("T")[0];
    }).filter(d=>d>=today);
  }

  async function handleSubmit(){
    if(!form.email||!form.deadline||!type){setError("請填寫所有必填項");return;}
    setLoading(true);setError("");
    try{
      const remind_at=calcRemindDates(form.deadline,selectedType?.days||[7]);
      const res=await fetch("/api/reminder-register",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          user_email:form.email,
          user_name:form.name,
          reminder_type:type,
          title:selectedType?.label||"提醒",
          deadline_date:form.deadline,
          remind_at,
          notes:form.notes,
        }),
      });
      const data=await res.json();
      if(data.error) throw new Error(data.error);
      setDone(true);
    }catch(e:any){setError(e.message||"登記失敗，請重試");}
    finally{setLoading(false);}
  }

  const inp:React.CSSProperties={width:"100%",padding:"12px 14px",border:"1.5px solid #D0D8E8",borderRadius:10,fontSize:14,color:"#1A2B4A",background:"#FAFBFD",outline:"none",boxSizing:"border-box"};

  if(done) return(
    <div style={{fontFamily:"PingFang TC,sans-serif",minHeight:"100vh",background:"#F7F8FA",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{background:"#fff",borderRadius:20,padding:"40px 32px",maxWidth:480,width:"100%",textAlign:"center",boxShadow:"0 4px 24px rgba(0,0,0,0.08)"}}>
        <div style={{fontSize:56,marginBottom:16}}>✅</div>
        <div style={{fontSize:22,fontWeight:800,color:"#1A2B4A",marginBottom:8}}>提醒已登記</div>
        <div style={{fontSize:14,color:"#5A6A8A",lineHeight:1.8,marginBottom:24}}>我們將在截止日前發送提醒郵件到<br/><strong>{form.email}</strong></div>
        <div style={{background:"#F0FAF0",borderRadius:12,padding:"16px",marginBottom:24,textAlign:"left"}}>
          <div style={{fontSize:13,color:"#1A6A3A",fontWeight:700,marginBottom:8}}>提醒詳情</div>
          <div style={{fontSize:13,color:"#2A3A5A",lineHeight:1.8}}>
            類型：{selectedType?.label}<br/>
            截止日：{form.deadline.replace(/-/g,"/")}<br/>
            提醒時間：截止前{selectedType?.days.join("、")}天
          </div>
        </div>
        <a href="/" style={{display:"block",padding:"12px",borderRadius:12,background:"#1A2B4A",color:"#fff",fontSize:14,fontWeight:700,textDecoration:"none"}}>返回首頁</a>
      </div>
    </div>
  );

  return(
    <div style={{fontFamily:"PingFang TC,sans-serif",minHeight:"100vh",background:"#F7F8FA"}}>
      <div style={{background:"#1A2B4A",padding:"0 20px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:640,margin:"0 auto",display:"flex",alignItems:"center",height:60,gap:14}}>
          <a href="/" style={{color:"#7A9CC8",fontSize:24,textDecoration:"none",lineHeight:1}}>←</a>
          <span style={{color:"#fff",fontSize:18,fontWeight:700}}>截止日提醒登記</span>
        </div>
      </div>
      <div style={{background:"linear-gradient(160deg,#1A2B4A 0%,#2A4A7A 100%)",padding:"36px 24px 44px",textAlign:"center"}}>
        <h1 style={{margin:0,fontSize:24,fontWeight:800,color:"#fff"}}>設定你的截止日提醒</h1>
        <p style={{margin:"10px 0 0",fontSize:14,color:"#9ABCE8"}}>登記後系統自動發送中文提醒郵件，截止日前不漏接</p>
      </div>
      <div style={{maxWidth:640,margin:"0 auto",padding:"24px 16px 60px"}}>

        {/* 第一步：選身份 */}
        <div style={{background:"#fff",borderRadius:20,padding:"24px",boxShadow:"0 2px 12px rgba(0,0,0,0.06)",marginBottom:16}}>
          <div style={{fontSize:15,fontWeight:700,color:"#1A2B4A",marginBottom:16}}>第一步：你目前的情況</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {GROUPS.map(g=>(
              <button key={g.id} onClick={()=>{setGroup(g.id);setType("");}}
                style={{textAlign:"left",padding:"16px",borderRadius:12,border:`2px solid ${group===g.id?"#2A5A9A":"#ECEEF3"}`,
                  background:group===g.id?"#F0F4FF":"#FAFBFD",cursor:"pointer",display:"flex",gap:12,alignItems:"center"}}>
                <span style={{fontSize:28,flexShrink:0}}>{g.icon}</span>
                <div style={{fontSize:15,fontWeight:700,color:"#1A2B4A"}}>{g.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 第二步：選類型 */}
        {group&&(
        <div style={{background:"#fff",borderRadius:20,padding:"24px",boxShadow:"0 2px 12px rgba(0,0,0,0.06)",marginBottom:16}}>
          <div style={{fontSize:15,fontWeight:700,color:"#1A2B4A",marginBottom:16}}>第二步：選擇提醒類型</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {currentGroup?.types.map(r=>(
              <button key={r.id} onClick={()=>setType(r.id)}
                style={{textAlign:"left",padding:"14px 16px",borderRadius:12,border:`2px solid ${type===r.id?"#2A5A9A":"#ECEEF3"}`,
                  background:type===r.id?"#F0F4FF":"#FAFBFD",cursor:"pointer",display:"flex",gap:12,alignItems:"flex-start"}}>
                <span style={{fontSize:24,flexShrink:0}}>{r.icon}</span>
                <div>
                  <div style={{fontSize:14,fontWeight:700,color:"#1A2B4A"}}>{r.label}</div>
                  <div style={{fontSize:12,color:"#5A6A8A",marginTop:2}}>{r.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
        )}

        {/* 第三步：填資料 */}
        {type&&(
        <div style={{background:"#fff",borderRadius:20,padding:"24px",boxShadow:"0 2px 12px rgba(0,0,0,0.06)",marginBottom:16}}>
          <div style={{fontSize:15,fontWeight:700,color:"#1A2B4A",marginBottom:16}}>第三步：填寫提醒資料</div>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div>
              <div style={{fontSize:13,color:"#5A6A8A",marginBottom:6}}>英文姓名（選填，與申報材料一致）</div>
              <input style={inp} placeholder="Your Full Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
            </div>
            <div>
              <div style={{fontSize:13,color:"#5A6A8A",marginBottom:6}}>郵件地址 <span style={{color:"#E84A4A"}}>*</span></div>
              <input style={inp} type="email" placeholder="用於接收提醒郵件" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
            </div>
            <div>
              <div style={{fontSize:13,color:"#5A6A8A",marginBottom:6}}>
                {type.includes("income_change")?"收入變更日期":"截止日期"} <span style={{color:"#E84A4A"}}>*</span>
              </div>
              <input style={inp} type="date" value={form.deadline} onChange={e=>setForm({...form,deadline:e.target.value})}/>
              {type.includes("income_change")&&(
                <div style={{fontSize:12,color:"#E84A4A",marginTop:4}}>⚠️ 收入變更後30天內必須向NYCHA申報，系統將在截止前提醒你</div>
              )}
            </div>
            <div>
              <div style={{fontSize:13,color:"#5A6A8A",marginBottom:6}}>備注（選填）</div>
              <textarea style={{...inp,height:80,resize:"none"}} placeholder="例如：NYCHA案號、地址等" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/>
            </div>
            {form.deadline&&selectedType&&(
              <div style={{background:"#F0F4FF",borderRadius:10,padding:"12px 14px"}}>
                <div style={{fontSize:12,color:"#2A5A9A",fontWeight:700,marginBottom:4}}>將在以下日期發送提醒郵件：</div>
                <div style={{fontSize:12,color:"#2A3A5A"}}>
                  {calcRemindDates(form.deadline,selectedType.days).map(d=>d.replace(/-/g,"/")).join("、")||"截止日已過，無法設定提醒"}
                </div>
              </div>
            )}
            {error&&<div style={{fontSize:13,color:"#E84A4A"}}>{error}</div>}
            <button onClick={handleSubmit} disabled={loading}
              style={{padding:"14px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#2A5A9A,#1A3A6A)",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer"}}>
              {loading?"登記中...":"確認登記提醒"}
            </button>
          </div>
        </div>
        )}

        <div style={{background:"#1A2B4A",borderRadius:16,padding:"16px 20px",textAlign:"center"}}>
          <div style={{fontSize:13,color:"#9ABCE8",lineHeight:1.7}}>
            提醒服務為住易陪跑訂閱用戶提供<br/>
            <a href="/pricing" style={{color:"#FFD066",fontWeight:700,textDecoration:"none"}}>查看訂閱方案 →</a>
          </div>
        </div>
      </div>
    </div>
  );
}
