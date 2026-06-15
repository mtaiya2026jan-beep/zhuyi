import {NextRequest,NextResponse} from "next/server";
import {Resend} from "resend";
import {createClient} from "@supabase/supabase-js";

const resend=new Resend(process.env.RESEND_API_KEY);
const supabase=createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req:NextRequest){
  try{
    const today=new Date().toISOString().split("T")[0];
    const {data:reminders,error}=await supabase
      .from("reminders")
      .select("*")
      .eq("status","active")
      .contains("remind_at",[today]);

    if(error) return NextResponse.json({error:error.message},{status:500});
    if(!reminders||reminders.length===0) return NextResponse.json({sent:0});

    let sent=0;
    for(const r of reminders){
      if(r.sent_dates?.includes(today)) continue;
      const daysLeft=Math.ceil((new Date(r.deadline_date).getTime()-new Date(today).getTime())/(1000*60*60*24));
      await resend.emails.send({
        from:"住易 ZhuYi <noreply@zhuyi.us>",
        to:r.user_email,
        subject:`【住易提醒】${r.title} — 還有${daysLeft}天截止`,
        html:`
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;background:#F7F8FA;">
            <div style="background:#1A2B4A;border-radius:12px;padding:24px;margin-bottom:24px;text-align:center;">
              <div style="color:#fff;font-size:22px;font-weight:800;">住易 ZhuYi</div>
              <div style="color:#9ABCE8;font-size:13px;margin-top:4px;">紐約華人住房福利平台</div>
            </div>
            <div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
              <div style="font-size:18px;font-weight:700;color:#1A2B4A;margin-bottom:8px;">📅 ${r.title}</div>
              <div style="font-size:14px;color:#5A6A8A;margin-bottom:16px;">你好${r.user_name?` ${r.user_name}`:""}，這是住易為你發送的截止日提醒。</div>
              <div style="background:#FFF8E8;border:1px solid #FFD066;border-radius:8px;padding:16px;margin-bottom:16px;">
                <div style="font-size:13px;color:#8A6A00;">截止日期</div>
                <div style="font-size:24px;font-weight:800;color:#1A2B4A;">${r.deadline_date.replace(/-/g,"/")}</div>
                <div style="font-size:14px;color:#E84A4A;font-weight:600;margin-top:4px;">還有 ${daysLeft} 天</div>
              </div>
              ${r.notes?`<div style="font-size:13px;color:#2A3A5A;line-height:1.8;margin-bottom:16px;">${r.notes}</div>`:""}
              <a href="https://zhuyi-lyart.vercel.app" style="display:block;text-align:center;padding:12px;background:#2A5A9A;color:#fff;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">前往住易查看詳情 →</a>
            </div>
            <div style="text-align:center;font-size:11px;color:#A0AABF;margin-top:16px;">住易 ZhuYi · 紐約華人住房福利平台</div>
          </div>
        `,
      });
      await supabase.from("reminders").update({
        sent_dates:[...(r.sent_dates||[]),today]
      }).eq("id",r.id);
      sent++;
    }
    return NextResponse.json({sent,total:reminders.length});
  }catch(e:any){
    return NextResponse.json({error:e.message},{status:500});
  }
}

export async function GET(req:NextRequest){
  return POST(req);
}
