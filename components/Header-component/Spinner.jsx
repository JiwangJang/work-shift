const Spinner = ({ SpinnerRef }) => {
  return (
    <div
      className='w-full h-full fixed bg-white/80 z-20 top-0 left-0 font-LoginPage text-[100px] invisible'
      ref={SpinnerRef}
    >
      <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center gap-8'>
        <div
          className='w-[100px] h-[100px] rounded-[50%] border-8 
        border-transparent border-l-yellow-400 border-r-yellow-400 animate-spin'
        ></div>
        <p></p>
        <div
          className='w-[100px] h-[100px] rounded-[50%] border-8 
        border-transparent border-t-yellow-400 border-b-yellow-400 animate-spin'
        ></div>
      </div>
    </div>
  );
};

export default Spinner;
