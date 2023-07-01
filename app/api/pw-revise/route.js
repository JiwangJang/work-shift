import db from "@/libs/dbConfig";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

const POST = async (req) => {
  const data = await req.json();
  const session = await getServerSession(authOptions);

  const { CurrentPw = null, FuturePw, id, mode } = data;
  // 사용자가 처음 공유비밀번호를 등록할땐 현재비밀번호가 맞는지 확인할 필요가 없음

  if (session.userid !== id) throw "본인것만 변경가능합니다";

  if (mode === "first") {
    const HashedFuturePw = await bcrypt.hash(FuturePw, 12);
    await db.execute(`UPDATE userinfo SET sharepassword=? WHERE id=?;`, [
      HashedFuturePw,
      id,
    ]);
    return NextResponse.json({ success: true });
  }

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
