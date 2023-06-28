"use client";

const Page = () => {
  const emailCopy = () => {
    window.navigator.clipboard
      .writeText("jiwang0917@naver.com")
      .then(() => alert("이메일이 복사됐습니다"));
  };

  return (
    <div className='w-full h-full border-slate-300 border-2 font-calendertitle'>
      <div className='h-1/5 bg-slate-300 flex justify-center items-center text-[70px]'>
        쓰시기 전에!!
      </div>
      <div className='h-[70%] flex flex-col text-[28px] p-4 overflow-y-auto'>
        <p>
          페이지를 닫기전에 꼭 우측상단의 저장버튼을 <br /> 눌러주세요!!
        </p>
        <br />
        <p>
          그렇지 않으면 열심히 작성하신 근무표가 <br />
          저장되지 않습니다..
        </p>
        <br />
        <p>
          추가적인 문의는
          <u className='cursor-pointer' onClick={emailCopy}>
            jiwang0917@naver.com
          </u>
          <br />
          으로 해주세요!
        </p>
        <p className='text-20px'>(이메일을 클릭하면 복사됩니다)</p>
      </div>
      <div
        className='h-[10%] text-[40px] flex justify-center items-center border-t-2 hover:bg-slate-200 cursor-pointer'
        onClick={() => {
          localStorage.setItem("check", true);
          window.close();
        }}
      >
        닫기
      </div>
    </div>
  );
};

export default Page;
