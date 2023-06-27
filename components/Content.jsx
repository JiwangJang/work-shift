"use client";

import { createContext, useState, useEffect } from "react";
import Calender from "./Content-component/Calender";
import WorkInfoSideBar from "./Content-component/WorkInfoSideBar";

export const ContentContext = createContext();

const Content = ({ userData }) => {
  const [mainData, setMainData] = useState(() => userData);
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(mainData));
    localStorage.setItem("isClick", false);

    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      e.returnValue = "";
    });

    window.addEventListener("unload", () => {
      localStorage.removeItem("data");
      localStorage.removeItem("first");
      localStorage.removeItem("second");
    });
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
