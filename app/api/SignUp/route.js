// Current route is api/SignUp

import db from "@/libs/dbConfig";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const POST = async (req) => {
  try {
    const SignUpInfo = await req.json();
    const { ID, Password } = SignUpInfo;
    const UserIdList = await new Promise((resolve, reject) => {
      db.query("SELECT id AS userid FROM userinfo", (err, data) => {
        if (err) reject("서버쪽 에러발생, 잠시후 다시 시도해주시기 바랍니다");
        resolve(data);
      });
    });
    if (UserIdList.map((DataPacket) => DataPacket.userid).indexOf(ID) !== -1)
      throw "아이디가 중복됩니다";

    const bcryptedPw = bcrypt.hashSync(Password, 12);
    const result = await new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO userinfo(id, password) VALUE(?, ?)",
        [ID, bcryptedPw],
        (err) => {
          if (err) reject("서버쪽 에러발생, 잠시후 다시 시도해주시기 바랍니다");
        }
      );
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, msg: error });
  }
};

export { POST };
