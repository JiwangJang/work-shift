import db from "@/libs/dbConfig";
import { NextResponse } from "next/server";

const POST = async (req) => {
  const data = await req.json();
  const userid = req.nextUrl.searchParams.get("userid");

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
