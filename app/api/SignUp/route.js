// Current route is api/SignUp

import db from "@/libs/dbConfig";
import randomCharGenerator from "@/libs/randomChar";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const POST = async (req) => {
  try {
    const SignUpInfo = await req.json();
    const { ID, Password } = SignUpInfo;
    const [UserIdList] = await db.query("SELECT id AS userid FROM userinfo");
    if (UserIdList.map((DataPacket) => DataPacket.userid).indexOf(ID) !== -1)
      throw "overlap";
    const bcryptedPw = bcrypt.hashSync(Password, 12);
    const shareCode = randomCharGenerator();
    await db.execute(
      "INSERT INTO userinfo(id, password, sharecode) VALUE(?, ?, ?)",
      [ID, bcryptedPw, shareCode]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    const ErrorMassage = error === "overlap" ? "IdOverlap" : "ServerError";
    return NextResponse.json({ success: false, msg: ErrorMassage });
  }
};

export { POST };
