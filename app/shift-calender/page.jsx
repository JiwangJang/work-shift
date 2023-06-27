import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import db from "@/libs/dbConfig";
import DataMaker from "@/libs/DataMaker";
import Header from "@/components/Header";
import Content from "@/components/Content";

const getUserData = async (userid) => {
  const [userData] = await db.execute(
    "SELECT data from userdata WHERE userid=?;",
    [userid]
  );
  return userData[0].data.data ?? DataMaker();
};

const ShiftCalender = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className='w-full h-full flex flex-col items-center justify-center font-LoginPage text-8xl gap-10'>
        <p>로그인이 필요한 페이지입니다</p>
        <Link
          className='bg-yellow-300 hover:bg-yellow-400 rounded-full text-7xl h-[100px] w-[45%] flex items-center justify-center'
          href={"/"}
        >
          로그인 페이지로 이동
        </Link>
      </div>
    );
  }

  const userid = session.userid;
  const userData = await getUserData(userid);

  return (
    <>
      <Header userid={userid} />
      <Content userData={userData} />
    </>
  );
};

export default ShiftCalender;
