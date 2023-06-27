"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRef } from "react";

const SignUp = ({ LoginStateRef }) => {
  const IdRef = useRef();
  const PasswordRef = useRef();
  const PasswordCheckerRef = useRef();
  const SignUpButtonEvent = () => {
    const ID = IdRef.current.value.replace(/\s/g, "");
    const Password = PasswordRef.current.value.replace(/\s/g, "");
    const Checker = PasswordCheckerRef.current.value.replace(/\s/g, "");
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if (!ID || !Password || !Checker) return alert("모든칸을 입력해주세요");
    if (korean.test(ID) || korean.test(Password))
      return alert("영문과 숫자만 입력가능합니다");
    if (ID.length > 30) return alert("30자 이하로 아이디를 입력해주세요");
    if (Password !== Checker)
      return alert(
        "Password칸의 값과 PasswordChecker칸의 값이 일치하지 않습니다. 다시 확인해주세요"
      );

    LoginStateRef.current.innerText = "회원가입 작업중입니다";
    LoginStateRef.current.classList.toggle("invisible");

    axios
      .post("/api/SignUp", {
        ID,
        Password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          alert("회원가입 성공! 바로 작업페이지로 이동시켜드리겠습니다!");
          signIn("credentials", { ID, Password });
        } else {
          switch (res.data.msg) {
            case "IdOverlap":
              alert("아이디가 중복됩니다");
              break;
            case "ServerError":
              alert("서버에서 에러가 발생했습니다. 잠시후 다시 시도해주세요");
              break;
          }
          LoginStateRef.current.classList.toggle("invisible");
        }
      })
      .catch(() => {
        alert("서버쪽 에러발생! 잠시후 다시 시도해주십시오!");
        LoginStateRef.current.classList.toggle("invisible");
      });
  };

  return (
    <div className='w-1/2 h-full flex flex-col items-center'>
      <div className='flex w-full justify-center'>
        <Image
          className='mr-5 max-[1350px]:h-[80px]'
          src={"/svg/sign-up.svg"}
          alt='sign-up-icon'
          width={100}
          height={100}
        />
        <p className='text-[60px] flex items-center'>Sign Up</p>
      </div>
      <div className='flex flex-col gap-4 items-center mt-5 w-full border-b-2 pb-4'>
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
        />
        <input
          type='password'
          placeholder='Password-Checker'
          ref={PasswordCheckerRef}
          className='h-[70px] w-[85%] bg-gray-300 outline-none rounded-full pl-14 text-[30px] max-[1200px]:text-[25px]'
        />
        <button
          className='w-[85%] h-[70px] text-[55px] max-[1200px]:text-[45px] bg-amber-300 hover:bg-amber-400 rounded-full'
          onClick={SignUpButtonEvent}
        >
          회원가입
        </button>
      </div>
      <div className='mt-3'>
        <p className='text-[35px]'>주위 친구들에게 공유해주세요!</p>
        <div className='flex justify-around items-center mt-7 max-h-[90px]'>
          <Image
            src={"/svg/Facebook.svg"}
            alt='Facebook-icon'
            width={90}
            height={90}
            className='cursor-pointer hover:w-[110px] transition-all'
          />
          <Image
            src={"/svg/Twitter.svg"}
            alt='Twitter-icon'
            width={90}
            height={90}
            className='cursor-pointer hover:w-[110px] transition-all'
          />
          <Image
            src={"/svg/URL.svg"}
            alt='URL-icon'
            width={90}
            height={90}
            className='cursor-pointer hover:w-[110px] transition-all'
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
