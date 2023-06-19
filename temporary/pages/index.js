import { signIn } from "next-auth/react";
import { useEffect } from "react";
import KakaoLoginButton from "../public/svg/KakaoLoginButton.svg";
import NaverLoginButton from "../public/svg/NaverLoginButton.svg";
import NotMemberLoginButton from "../public/svg/NotMemberLoginButton.svg";

const LoginPage = () => {
  useEffect(() => {
    if (new URL(location.href).searchParams.get("error")) {
      alert("로그인을 하셔야 이용가능합니다");
    }
  }, []);

  return (
    <div className='w-full h-full bg-slate-100 flex justify-center items-center'>
      <div className='w-2/5 h-4/5'>
        <div className='w-full h-full flex flex-col items-center justify-around font-loginPageArticle text-3xl'>
          <p className='login-page-left-section-first'>
            아니 아직도 엑셀에 일일히 당직근무표를 작성하세요?
          </p>
          <p className='login-page-left-section-second'>
            그러지 말고 이거한번 써보세요!!
          </p>
          <p className='login-page-left-section-third'>
            근무순서만 입력하면 한달치를 자동으로 생성가능!
          </p>
          <p className='login-page-left-section-fourth'>
            주말 또는 평일만 입력가능!
          </p>
          <p className='login-page-left-section-fiveth'>
            생성된 근무표를 엑셀로 다운가능!
          </p>
          <p className='login-page-left-section-sixth'>시간절약 쌉가능!</p>
          <p className='login-page-left-section-seventh'>
            당직근무표 짤 시간에 커피한잔☕ 더 하셔야죠~
          </p>
        </div>
      </div>
      <div className='w-2/5 h-4/5 bg-white rounded-xl flex flex-col justify-center items-center'>
        <p className='h-1/5 font-loginPageTitle flex justify-center items-center text-loginPageTitle loginPageTitle'>
          환영합니다!
        </p>
        <div className='h-4/5 w-full flex flex-col justify-around items-center'>
          <KakaoLoginButton
            className='cursor-pointer w-3/5 h-1/4 rounded-xl'
            onClick={() => signIn("kakao", { callbackUrl: "/workPage" })}
          />
          <NaverLoginButton
            className='cursor-pointer w-3/5 h-1/4 rounded-xl'
            onClick={() => signIn("naver", { callbackUrl: "/workPage" })}
          />
          <NotMemberLoginButton
            className='cursor-pointer w-3/5 h-1/4 rounded-xl'
            onClick={() =>
              signIn("credentials", {
                redirct: false,
                callbackUrl: "/workPage",
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
