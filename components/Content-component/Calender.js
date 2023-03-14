import CalenderMain from "./Calender-component/CalenderMain";
import CalenderOptions from "./Calender-component/CalenderOptions";

export default function Calender() {
  return (
    <div className='flex w-full h-full calender relative transition-all ease-in-out'>
      <CalenderMain />
      <CalenderOptions />
    </div>
  );
}
