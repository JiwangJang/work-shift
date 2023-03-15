import { createContext, useState, useEffect } from "react";
import Calender from "./Content-component/Calender";
import WorkInfoSideBar from "./Content-component/WorkInfoSideBar";

export const ContentContext = createContext();

const Content = ({ data }) => {
  const [mainData, setMainData] = useState(() => data);
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(mainData));
  }, [mainData]);

  return (
    <ContentContext.Provider value={{ mainData, setMainData }}>
      <div className='h-content flex'>
        <WorkInfoSideBar />
        <Calender />
      </div>
    </ContentContext.Provider>
  );
};

export default Content;
