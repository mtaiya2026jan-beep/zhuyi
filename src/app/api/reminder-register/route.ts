import {NextRequest,NextResponse} from "next/server";
import {createClient} from "@supabase/supabase-js";

const supabase=createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req:NextRequest){
  try{
    const body=await req.json();
    const {data,error}=await supabase.from("reminders").insert([body]).select();
    if(error) return NextResponse.json({error:error.message},{status:500});
    return NextResponse.json({ok:true,data});
  }catch(e:any){
    return NextResponse.json({error:e.message},{status:500});
  }
}
