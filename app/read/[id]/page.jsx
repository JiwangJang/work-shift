import Tbody from "@/components/Content-component/Calender-component/Tbody";
import Thead from "@/components/Content-component/Calender-component/Thead";

// const getUserData = ()

const Page = () => {
  return (
    <table className='w-5/6 h-table shadow-2xl rounded-x bg-slate-200'>
      <Thead year={mainData.Year} month={mainData.Month} />
      <Tbody mainData={mainData} />
    </table>
  );
};

export default Page;
