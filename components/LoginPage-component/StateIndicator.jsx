const StateIndicator = ({ Childref }) => {
  return (
    <div
      className='bg-white z-20 absolute w-full h-4/5 flex items-center justify-center rounded-b-xl invisible'
      ref={Childref}
    ></div>
  );
};

export default StateIndicator;
