import { useContext, useEffect, useState } from "react";
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
