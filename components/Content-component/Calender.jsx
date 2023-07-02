import CalenderMain from "./Calender-component/CalenderMain";
import CalenderOptions from "./Calender-component/CalenderOptions";

const Calender = () => {
  return (
    <div className='flex w-full h-full calender relative transition-all ease-in-out'>
      <CalenderMain />
      <CalenderOptions />
    </div>
  );
};

export default Calender;
