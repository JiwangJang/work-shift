import { useContext } from "react";
import { ContentContext } from "@/components/Content";
import Thead from "./Thead";
import Tbody from "./Tbody";

const Calender = () => {
  const mainData = useContext(ContentContext).mainData;
  return (
    <table className='w-5/6 h-table shadow-2xl rounded-x bg-slate-200'>
      <Thead year={mainData.Year} month={mainData.Month} />
      <Tbody mainData={mainData} />
    </table>
  );
};

export default Calender;

// 여기서 mode라는 props 에 따라서 데이터를 어떻게 가져올지 결정
//  이것만 렌더링하면 됨(조회만 할거니까)
