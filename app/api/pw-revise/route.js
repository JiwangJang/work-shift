import db from "@/libs/dbConfig";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

const POST = async (req) => {
  const data = await req.json();
  const session = await getServerSession(authOptions);

  const { CurrentPw, FuturePw, mode } = data;
  const id = session.userid;

  try {
    const [originPW] = await db.execute(
      `SELECT ${
        mode === "account" ? "password" : "sharepassword"
      } AS pw from userinfo where id=?;`,
      [id]
    );

    if (bcrypt.compareSync(CurrentPw, originPW[0].pw)) {
      const HashedFuturePw = await bcrypt.hash(FuturePw, 12);
      await db.execute(
        `UPDATE userinfo SET ${
          mode === "account" ? "password" : "sharepassword"
        }=? WHERE id=?;`,
        [HashedFuturePw, id]
      );
    } else {
      throw "기존비밀번호가 다릅니다";
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, msg: error });
  }
};

export { POST };
