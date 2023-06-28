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

    const check = localStorage.getItem("check");

    if (!check) {
      const top = document.body.offsetWidth / 2 - 350;
      const left = window.screen.height / 2 - 300;
      const specs = `height=700, width=600, top=${top}, left=${left}`;
      window.open("/popup", "", specs);
    }

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
      <div className='h-content flex select-none'>
        <WorkInfoSideBar />
        <Calender />
      </div>
    </ContentContext.Provider>
  );
};

export default Content;
