import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PwRevise from "@/components/PW-Revise-component/PwRevise";
import { getServerSession } from "next-auth";
import Link from "next/link";
const Page = async ({ params }) => {
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
  } else if (session.userid !== params.id) {
    return (
      <div className='w-full h-full flex flex-col items-center justify-center font-LoginPage text-8xl gap-10'>
        <p>본인만 접근할 수 있는 페이지입니다</p>
      </div>
    );
  }

  return (
    <div className='w-full h-full font-LoginPage'>
      <div className='h-[15%] bg-slate-300 text-[50px] flex justify-center items-center'>
        비밀번호 수정
      </div>
      <PwRevise mode={"account"} id={session.userid} />
      <Spinner />
    </div>
  );
};

const Spinner = () => {
  return (
    <div
      className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white/80 invisible'
      id='spinner'
    >
      <div
        className='w-[100px] h-[100px] rounded-[50%] border-8 
    border-transparent border-l-yellow-400 border-r-yellow-400 animate-spin'
      ></div>
    </div>
  );
};

export default Page;
