"use client";
import {useState,useEffect} from "react";

const BOROUGH_MAP:Record<string,string>={BX:"布朗克斯",MN:"曼哈頓",QN:"皇后區",BK:"布魯克林",SI:"史泰登島",Multiple:"多區"};
const AMI_LABELS:Record<string,string>={
  applied_income_ami_extremely_low:"30% AMI",
  applied_income_ami_very_low:"50% AMI",
  applied_income_ami_low:"80% AMI",
  applied_income_ami_moderate:"100% AMI",
  applied_income_ami_middle:"120% AMI以上",
};
const STATUS_MAP:Record<string,{label:string,color:string,bg:string}>={
  "Active":{label:"🟢 申請中",color:"#1A6A3A",bg:"#F0FAF4"},
  "Tenant Selection":{label:"🟡 選房中",color:"#8A6A00",bg:"#FFFBEE"},
  "Closed":{label:"⚫ 已截止",color:"#5A6A8A",bg:"#F4F6FB"},
};

type Listing={
  lottery_id:string;lottery_name:string;lottery_status:string;
  development_type:string;lottery_start_date:string;lottery_end_date:string;
  unit_count:string;borough:string;postcode:string;
  unit_distribution_studio?:string;unit_distribution_1bed?:string;
  unit_distribution_2bed?:string;unit_distribution_3bed?:string;
  applied_income_ami_extremely_low?:string;applied_income_ami_very_low?:string;
  applied_income_ami_low?:string;applied_income_ami_moderate?:string;
  applied_income_ami_middle?:string;lottery_nycha_percent?:string;
};

export default function DatabasePage(){
  const [listings,setListings]=useState<Listing[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [borFilter,setBorFilter]=useState("");
  const [statusFilter,setStatusFilter]=useState("Active");
  const [amiFilter,setAmiFilter]=useState("");
  const [expanded,setExpanded]=useState<string|null>(null);

  useEffect(()=>{
    async function load(){
      try{
        const res=await fetch(
          "https://data.cityofnewyork.us/resource/vy5i-a666.json?$limit=200&$order=lottery_start_date+DESC",
          {headers:{"X-App-Token":"住易ZhuYi"}}
        );
        const data=await res.json();
        setListings(data);
      }catch(e){setError("數據加載失敗，請稍後重試");}
      finally{setLoading(false);}
    }
    load();
  },[]);

  function getAMIs(l:Listing){
    return Object.entries(AMI_LABELS).filter(([k])=>l[k as keyof Listing]).map(([k,v])=>v);
  }

  function formatDate(s:string){
    if(!s) return "—";
    return s.split("T")[0].replace(/-/g,"/");
  }

  const filtered=listings.filter(l=>{
    if(borFilter&&l.borough!==borFilter) return false;
    if(statusFilter&&l.lottery_status!==statusFilter) return false;
    if(amiFilter&&!l[amiFilter as keyof Listing]) return false;
    return true;
  });

  const activeCount=listings.filter(l=>l.lottery_status==="Active").length;

  const iS:React.CSSProperties={padding:"8px 12px",border:"1.5px solid #D0D8E8",borderRadius:10,fontSize:14,color:"#1A2B4A",background:"#FAFBFD",outline:"none"};

  return(
    <div style={{fontFamily:"PingFang TC,sans-serif",minHeight:"100vh",background:"#F7F8FA"}}>
      <div style={{background:"#2A5A9A",padding:"0 20px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:760,margin:"0 auto",display:"flex",alignItems:"center",height:60,gap:14}}>
          <a href="/" style={{color:"#9ABCE8",fontSize:24,textDecoration:"none",lineHeight:1}}>←</a>
          <span style={{color:"#fff",fontSize:18,fontWeight:700}}>Housing Connect 保障房追蹤</span>
        </div>
      </div>

      <div style={{background:"linear-gradient(160deg,#2A5A9A 0%,#1A3A6A 100%)",padding:"36px 24px 44px",textAlign:"center"}}>
        <div style={{fontSize:14,color:"#9ABCE8",letterSpacing:2,marginBottom:8}}>住易 · 實時房源</div>
        <h1 style={{margin:0,fontSize:22,fontWeight:700,color:"#fff",lineHeight:1.4}}>紐約市 Housing Connect 保障房申請</h1>
        <p style={{margin:"8px 0 0",fontSize:13,color:"#9ABCE8",lineHeight:1.7}}>數據來自 NYC Open Data，每日更新　無需登入即可查閱</p>
        {!loading&&(
          <div style={{marginTop:16,display:"inline-flex",gap:20,background:"rgba(255,255,255,0.1)",borderRadius:12,padding:"10px 20px"}}>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:22,fontWeight:800,color:"#fff"}}>{activeCount}</div>
              <div style={{fontSize:11,color:"#9ABCE8"}}>正在申請中</div>
            </div>
            <div style={{width:1,background:"rgba(255,255,255,0.2)"}}/>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:22,fontWeight:800,color:"#fff"}}>{listings.length}</div>
              <div style={{fontSize:11,color:"#9ABCE8"}}>項目總數</div>
            </div>
            <div style={{width:1,background:"rgba(255,255,255,0.2)"}}/>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:22,fontWeight:800,color:"#fff"}}>{listings.reduce((s,l)=>s+parseInt(l.unit_count||"0"),0).toLocaleString()}</div>
              <div style={{fontSize:11,color:"#9ABCE8"}}>套房源合計</div>
            </div>
          </div>
        )}
      </div>

      <div style={{maxWidth:760,margin:"0 auto",padding:"20px 16px 60px"}}>

        {/* 篩選 */}
        <div style={{background:"#fff",borderRadius:16,padding:"16px",boxShadow:"0 2px 12px rgba(0,0,0,0.06)",marginBottom:16,display:"flex",gap:10,flexWrap:"wrap"}}>
          <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} style={iS}>
            <option value="">全部狀態</option>
            <option value="Active">🟢 申請中</option>
            <option value="Tenant Selection">🟡 選房中</option>
            <option value="Closed">⚫ 已截止</option>
          </select>
          <select value={borFilter} onChange={e=>setBorFilter(e.target.value)} style={iS}>
            <option value="">全部區域</option>
            {Object.entries(BOROUGH_MAP).map(([k,v])=><option key={k} value={k}>{v}</option>)}
          </select>
          <select value={amiFilter} onChange={e=>setAmiFilter(e.target.value)} style={iS}>
            <option value="">全部收入檔位</option>
            {Object.entries(AMI_LABELS).map(([k,v])=><option key={k} value={k}>{v}</option>)}
          </select>
          <div style={{fontSize:13,color:"#5A6A8A",alignSelf:"center",marginLeft:"auto"}}>共 {filtered.length} 個項目</div>
        </div>

        {/* AMI說明 */}
        <div style={{background:"#F0F4FF",borderRadius:12,padding:"12px 16px",marginBottom:16,fontSize:13,color:"#2A4A8A",lineHeight:1.7}}>
          💡 <b>AMI說明：</b>2026年紐約4口之家 AMI 基準為 $138,550。30%=$41,565、50%=$69,275、80%=$110,840、100%=$138,550。不同項目對不同收入檔位開放不同套數。
        </div>

        {loading&&(
          <div style={{textAlign:"center",padding:"60px 0",color:"#5A6A8A",fontSize:15}}>
            正在加載 NYC Open Data 數據...
          </div>
        )}
        {error&&(
          <div style={{textAlign:"center",padding:"40px 0",color:"#E84A4A",fontSize:14}}>{error}</div>
        )}

        {/* 房源列表 */}
        {filtered.map(l=>{
          const st=STATUS_MAP[l.lottery_status]||{label:l.lottery_status,color:"#5A6A8A",bg:"#F4F6FB"};
          const amis=getAMIs(l);
          const isOpen=expanded===l.lottery_id;
          return(
            <div key={l.lottery_id} style={{background:"#fff",borderRadius:16,marginBottom:10,boxShadow:"0 2px 8px rgba(0,0,0,0.05)",overflow:"hidden"}}>
              <button onClick={()=>setExpanded(isOpen?null:l.lottery_id)}
                style={{width:"100%",textAlign:"left",padding:"16px",background:"none",border:"none",cursor:"pointer"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:15,fontWeight:700,color:"#1A2B4A",marginBottom:6,lineHeight:1.4}}>{l.lottery_name}</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6,alignItems:"center"}}>
                      <span style={{fontSize:12,color:st.color,background:st.bg,borderRadius:6,padding:"2px 8px",fontWeight:600}}>{st.label}</span>
                      <span style={{fontSize:12,color:"#5A6A8A",background:"#F4F6FB",borderRadius:6,padding:"2px 8px"}}>{BOROUGH_MAP[l.borough]||l.borough}</span>
                      <span style={{fontSize:12,color:"#5A6A8A",background:"#F4F6FB",borderRadius:6,padding:"2px 8px"}}>{l.unit_count} 套</span>
                      {l.development_type&&<span style={{fontSize:12,color:"#5A6A8A",background:"#F4F6FB",borderRadius:6,padding:"2px 8px"}}>{l.development_type==="Rental"?"租賃":"自有"}</span>}
                    </div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <div style={{fontSize:11,color:"#8A9AB0"}}>截止</div>
                    <div style={{fontSize:13,fontWeight:600,color:"#1A2B4A"}}>{formatDate(l.lottery_end_date)}</div>
                    <div style={{fontSize:18,color:"#8A9AB0",marginTop:4}}>{isOpen?"▲":"▼"}</div>
                  </div>
                </div>
              </button>

              {isOpen&&(
                <div style={{padding:"0 16px 16px",borderTop:"1px solid #F0F3F8"}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:12}}>
                    <div style={{background:"#F7F8FA",borderRadius:10,padding:"10px 12px"}}>
                      <div style={{fontSize:11,color:"#8A9AB0",marginBottom:4}}>申請時間</div>
                      <div style={{fontSize:13,color:"#1A2B4A"}}>{formatDate(l.lottery_start_date)} — {formatDate(l.lottery_end_date)}</div>
                    </div>
                    <div style={{background:"#F7F8FA",borderRadius:10,padding:"10px 12px"}}>
                      <div style={{fontSize:11,color:"#8A9AB0",marginBottom:4}}>戶型分佈</div>
                      <div style={{fontSize:13,color:"#1A2B4A"}}>
                        {[["Studio",l.unit_distribution_studio],["1房",l.unit_distribution_1bed],["2房",l.unit_distribution_2bed],["3房",l.unit_distribution_3bed]]
                          .filter(([,v])=>v&&parseInt(v as string)>0)
                          .map(([k,v])=>`${k}:${v}`)
                          .join(" · ")||"—"}
                      </div>
                    </div>
                    <div style={{background:"#F7F8FA",borderRadius:10,padding:"10px 12px"}}>
                      <div style={{fontSize:11,color:"#8A9AB0",marginBottom:4}}>適用收入檔位</div>
                      <div style={{fontSize:13,color:"#1A2B4A"}}>{amis.length>0?amis.join("、"):"—"}</div>
                    </div>
                    <div style={{background:"#F7F8FA",borderRadius:10,padding:"10px 12px"}}>
                      <div style={{fontSize:11,color:"#8A9AB0",marginBottom:4}}>NYCHA住戶優先</div>
                      <div style={{fontSize:13,color:"#1A2B4A"}}>{l.lottery_nycha_percent?l.lottery_nycha_percent+"%":"—"}</div>
                    </div>
                  </div>
                  <a href="https://housingconnect.nyc.gov" target="_blank" rel="noopener noreferrer"
                    style={{display:"block",marginTop:12,padding:"11px",borderRadius:10,background:"linear-gradient(135deg,#2A5A9A,#1A3A6A)",
                      color:"#fff",textAlign:"center",fontSize:14,fontWeight:700,textDecoration:"none"}}>
                    前往 Housing Connect 申請 →
                  </a>
                </div>
              )}
            </div>
          );
        })}

        {/* 陪跑CTA */}
        <div style={{background:"#1A2B4A",borderRadius:16,padding:"20px",marginTop:20,textAlign:"center"}}>
          <div style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:6}}>需要中文填表指引？</div>
          <div style={{fontSize:13,color:"#9ABCE8",marginBottom:14,lineHeight:1.6}}>陪跑訂閱用戶可獲每週個性化房源推送<br/>以及逐欄中文填表說明，避免因填錯被拒</div>
          <a href="/paopao" style={{display:"inline-block",padding:"11px 28px",borderRadius:10,
            background:"linear-gradient(135deg,#FFD066,#FFA500)",color:"#1A2B4A",
            fontSize:14,fontWeight:700,textDecoration:"none"}}>
            訂閱陪跑 $19.9/月 →
          </a>
        </div>
      </div>
    </div>
  );
}
