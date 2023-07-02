import db from "@/libs/dbConfig";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const POST = async (req) => {
  const data = await req.json();
  const session = await getServerSession(authOptions);
  const { userid } = session;
  try {
    await db.execute("UPDATE userdata SET data=? WHERE userid=?;", [
      data.data,
      userid,
    ]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
};

export { POST };
