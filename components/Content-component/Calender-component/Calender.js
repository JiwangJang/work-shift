import { useContext, useEffect, useState } from "react";
import { ContentContext } from "@/components/Content";
import Thead from "./Thead";
import Tbody from "./Tbody";

export default function Calender() {
  const [result, setResult] = useState(<></>);
  const mainData = useContext(ContentContext).mainData;
  const setMainData = useContext(ContentContext).setMainData;

  useEffect(() => {
    setResult(
      <table className='w-5/6 h-table shadow-2xl rounded-x bg-slate-200'>
        <Thead year={mainData.Year} month={mainData.Month} />
        <Tbody mainData={mainData} />
      </table>
    );
  }, [mainData, setMainData]);

  return <>{result}</>;
}
