import Image from "next/image";

const Page = ({ imgSrc, ment, color }) => {
  return (
    <div className='h-full w-full flex items-center justify-center snap-start relative overflow-hidden'>
      <div
        id='ractangle'
        className={`w-800 h-full min-w-[600px] ${color} shadow-2xl`}
      ></div>
      <Image
        className='absolute top-[6%] left-[4%] w-[400px] h-[400px] bg-black max-[1850px]:w-[350px] max-[1850px]:h-[350px] first-letter:
        max-[1600px]:w-[300px] max-[1600px]:h-[300px] rounded-xl shadow-2xl cursor-pointer'
        alt='explain-gif'
        src={imgSrc}
        width={400}
        height={400}
        onClick={() => {
          window.open(imgSrc);
        }}
      />
      <p className='w-[1175px]'>{ment}</p>
    </div>
  );
};

export default Page;
