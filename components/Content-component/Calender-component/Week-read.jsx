"use client";

import uuid from "@/libs/uuid";

const ReadWeek = ({ week }) => {
  const changeEvent = (e) => {
    const targetName = e.target.innerText;
    const targets = Array.from(document.getElementsByClassName(targetName));
    targets.forEach((element) => element.classList.toggle("myWorkDayChecker"));
  };
  return (
    <tr>
      {week.map((day) => (
        <td key={uuid()} className='bg-white border-2 calender-border'>
          {day.date ? (
            <div className={`${day.style} font-date`}>{day.date}</div>
          ) : (
            <div className={day.style}></div>
          )}

          <div className='h-3/4 flex flex-col items-center font-workername overflow-x-auto scroll-none'>
            {day.WorkTeam.map((worker) => (
              <div
                key={uuid()}
                onClick={changeEvent}
                className={`w-full h-full flex justify-center 
                items-center cursor-pointer ${worker} transition-all
                hover:bg-slate-200 duration-[250ms]
                `}
              >
                {worker}
              </div>
            ))}
          </div>
        </td>
      ))}
    </tr>
  );
};

export default ReadWeek;

// 조회용일경우 클릭하면 하이라이팅 해주기
