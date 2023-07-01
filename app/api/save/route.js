import db from "@/libs/dbConfig";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const POST = async (req) => {
  const data = await req.json();
  const userid = req.nextUrl.searchParams.get("userid");
  const session = await getServerSession(authOptions);

  if (userid !== session.userid) throw "본인것만 저장가능합니다";

  try {
    await db.execute("REPLACE INTO userdata(userid, data) VALUES(?, ?);", [
      userid,
      data,
    ]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
};

export { POST };
