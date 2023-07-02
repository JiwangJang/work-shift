import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import db from "@/libs/dbConfig";

const DELETE = async () => {
  const session = await getServerSession(authOptions);
  const { userid } = session;
  try {
    await db.execute("DELETE FROM userdata WHERE userid=?;", [userid]);
    await db.execute("DELETE FROM userinfo WHERE id=?;", [userid]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false });
  }
};

export { DELETE };
