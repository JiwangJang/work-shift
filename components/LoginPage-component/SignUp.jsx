import Image from "next/image";

const SignUp = () => {
  return (
    <div className='w-1/2 h-full flex flex-col items-center'>
      <div className='flex w-full justify-center'>
        <Image
          src={"/svg/sign-up.svg"}
          alt='sign-up-icon'
          width={100}
          height={100}
        />
        <p className='text-[50px] flex items-center'>아직 회원이 아니라구요?</p>
      </div>
      <div className='flex flex-col gap-4 items-center mt-5 w-full border-b-2 pb-4'>
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
        <input
          type='password'
          placeholder='Password-Checker'
          className='h-[70px] w-[85%] bg-gray-300 outline-none rounded-full pl-14 text-[30px]'
        />
        <button className='w-[85%] h-[70px] text-[55px] bg-amber-300 hover:bg-amber-400 rounded-full '>
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
