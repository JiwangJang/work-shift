import Image from "next/image";

const Login = () => {
  return (
    <div className='w-1/2 h-full'>
      <div className='flex w-full justify-center'>
        <Image
          className='mr-5'
          alt='login-icon'
          src={"/svg/login-icon.svg"}
          width={100}
          height={100}
        />
        <p className='text-[60px] flex items-center'>이미 회원이신가요?</p>
      </div>
      <div className='flex flex-col gap-4 items-center mt-5'>
        <input
          type='text'
          placeholder='ID'
          className='h-[70px] w-[85%] bg-gray-300 outline-none rounded-full pl-14 text-[30px]'
        />
        <input
          type='password'
          placeholder='Password'
          className='h-[70px] w-[85%] bg-gray-300 outline-none rounded-full pl-14 text-[30px]'
        />
        <button className='w-[85%] h-[70px] text-[55px] bg-amber-300 hover:bg-amber-400 rounded-full '>
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
        />
        <Image
          className='w-4/5 rounded-full shadow-xl cursor-pointer hover:shadow-kakao transition-all'
          src={"/svg/KAKAO.svg"}
          alt='KAKAO-Login-Button'
          width={530}
          height={70}
        />
        <Image
          className='w-4/5 rounded-full shadow-xl cursor-pointer hover:shadow-google transition-all'
          src={"/svg/GOOGLE.svg"}
          alt='KAKAO-Login-Button'
          width={530}
          height={70}
        />
      </div>
    </div>
  );
};

export default Login;
