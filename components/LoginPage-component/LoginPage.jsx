"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Login from "./Login";
import Page from "./Page";
import SignUp from "./SignUp";
import StateIndicator from "./StateIndicator";
import { useSession } from "next-auth/react";

const LoginPage = () => {
  const router = useRouter();
  const LoginStateRef = useRef();
  const { data: session } = useSession();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const curError = params.get("error");

    if (curError) {
      switch (curError) {
        case "notMember":
          alert("등록되지 않은 사용자입니다");
          break;
        case "checkPassword":
          alert("비밀번호를 확인해주세요");
          break;
        default:
          alert("서버에서 문제가 발생했습니다. 잠시후 다시 시도해주세요.");
          break;
      }
      router.push("/");
    }
    if (session) {
      router.push("/shift-calender");
    }
  }, [router, session]);

  return (
    <div className='snap-y snap-mandatory overflow-auto h-full w-full font-LoginPage text-9xl max-[1350px]:text-[90px]'>
      <Page
        imgSrc={`/gif/excel-type.gif`}
        ment={
          <>
            아직도 엑셀로 <br /> 당직근무표를
            <br /> 작성하고 계신가요?
          </>
        }
        color={"bg-green-300"}
      />
      <Page
        imgSrc={`/gif/thumbs-up.gif`}
        ment={
          <>
            그렇다면 <br /> 잘 오셨습니다!
          </>
        }
        color={"bg-yellow-300"}
      />
      <Page
        imgSrc={`/gif/work-shift.gif`}
        ment={<>근무자만 입력하면 당직근무표 작성 끝!</>}
        color={"bg-orange-300"}
      />
      <div className='h-full w-full flex items-center justify-center snap-start bg-sky-300 relative'>
        <div
          className='w-[70%] h-[90%] rounded-2xl shadow-2xl bg-white absolute 
        top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2'
        >
          <div className='h-1/5 flex items-center justify-center border-b-2 text-[110px] max-[1500px]:text-[100px] max-[1400px]:text-[85px] max-[1150px]:text-[65px]'>
            당직근무표 자동화웹
          </div>
          <div className='flex h-4/5'>
            <StateIndicator Childref={LoginStateRef} />
            <Login LoginStateRef={LoginStateRef} />
            <SignUp LoginStateRef={LoginStateRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
