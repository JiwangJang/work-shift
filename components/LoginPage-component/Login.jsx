"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRef } from "react";

const Login = ({ LoginStateRef }) => {
  const IdRef = useRef();
  const PasswordRef = useRef();

  const LoginButtonEvent = (provider = "credentials") => {
    const ID = IdRef.current.value;
    const Password = PasswordRef.current.value;

    if (provider === "credentials" && (!ID || !Password))
      return alert("둘다 입력해주세요");
    LoginStateRef.current.innerText = "로그인 작업중입니다";
    LoginStateRef.current.classList.toggle("invisible");

    const SignInOptions = {
      callbackUrl: `${window.location.origin}/shift-calender`,
    };

    switch (provider) {
      case "naver":
        signIn("naver", SignInOptions);
        break;
      case "kakao":
        signIn("kakao", SignInOptions);
        break;
      case "google":
        signIn("google");
        break;
      default:
        signIn("credentials", { ...SignInOptions, ID, Password });
    }
  };

  return (
    <div className='w-1/2 h-full'>
      <div className='flex w-full justify-center'>
        <Image
          className='mr-5 max-[1350px]:h-[80px]'
          alt='login-icon'
          src={"/svg/login-icon.svg"}
          width={100}
          height={100}
        />
        <p className='text-[60px] flex items-center'>Sign In</p>
      </div>
      <div className='flex flex-col gap-4 items-center mt-5'>
        <input
          type='text'
          placeholder='ID'
          ref={IdRef}
          className='h-[70px] w-[85%] bg-gray-300 outline-none rounded-full pl-14 text-[30px] max-[1200px]:text-[25px]'
        />
        <input
          type='password'
          placeholder='Password'
          ref={PasswordRef}
          className='h-[70px] w-[85%] bg-gray-300 outline-none rounded-full pl-14 text-[30px] max-[1200px]:text-[25px]'
          onKeyDown={(e) => {
            if (e.key === "Enter") LoginButtonEvent();
          }}
        />
        <button
          className='w-[85%] h-[70px] text-[55px] max-[1200px]:text-[45px] bg-amber-300 hover:bg-amber-400 rounded-full'
          onClick={LoginButtonEvent}
        >
          로그인
        </button>
      </div>
      <div
        className='text-slate-300 text-4xl relative text-center my-2'
        id='or'
      >
        or
      </div>
      <div className='flex flex-col items-center gap-3 text-[35px]'>
        <Image
          className='w-4/5 rounded-full shadow-xl cursor-pointer hover:shadow-naver transition-all'
          src={"/svg/NAVER.svg"}
          alt='NAVER-Login-Button'
          width={530}
          height={70}
          onClick={() => LoginButtonEvent("naver")}
        />
        <Image
          className='w-4/5 rounded-full shadow-xl cursor-pointer hover:shadow-kakao transition-all'
          src={"/svg/KAKAO.svg"}
          alt='KAKAO-Login-Button'
          width={530}
          height={70}
          onClick={() => LoginButtonEvent("kakao")}
        />
        <Image
          className='w-4/5 rounded-full shadow-xl cursor-pointer hover:shadow-google transition-all'
          src={"/svg/GOOGLE.svg"}
          alt='GOOGLE-Login-Button'
          width={530}
          height={70}
          onClick={() => LoginButtonEvent("google")}
        />
      </div>
    </div>
  );
};

export default Login;
