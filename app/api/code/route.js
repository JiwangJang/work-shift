import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import db from "@/libs/dbConfig";
import { NextResponse } from "next/server";

const GET = async () => {
  const session = await getServerSession(authOptions);
  const id = session.userid;

  try {
    const [result] = await db.execute(
      "SELECT sharecode FROM userinfo WHERE id=?;",
      [id]
    );
    const sharecode = result[0].sharecode;
    return NextResponse.json({ sharecode });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
};

export { GET };
