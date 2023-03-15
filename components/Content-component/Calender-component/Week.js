import uuid from "@/libs/uuid";
import { useContext } from "react";
import { ContentContext } from "@/components/Content";

const Week = ({ week }) => {
  const mainData = useContext(ContentContext).mainData;
  const setMainData = useContext(ContentContext).setMainData;

  const dateEvent = (e) => {
    const selectDate = e.target.innerText;
    const newCalenderData = mainData.CalenderData.map((item) => {
      if (item.date === Number(selectDate)) {
        switch (item.isHoliday) {
          case 0:
            return {
              ...item,
              isHoliday: new Date(
                mainData.Year,
                mainData.Month,
                item.date
              ).getDay(),
            };
          default:
            return {
              ...item,
              isHoliday: 0,
            };
        }
      } else {
        return item;
      }
    });

    setMainData((prev) => ({
      ...prev,
      CalenderData: newCalenderData,
    }));
  };

  const changeEvent = (e) => {
    const isClick = JSON.parse(localStorage.getItem("isClick"));
    if (!isClick) {
      const first = {
        worker: e.target.innerText,
        date: e.target.parentElement.parentElement.firstElementChild.innerText,
      };
      localStorage.setItem("first", JSON.stringify(first));
      localStorage.setItem("isClick", true);

      Array.from(document.getElementsByClassName(`${first.worker}`))
        .filter(
          (element) =>
            element.parentElement.parentElement.firstElementChild.innerText ===
            first.date
        )[0]
        .classList.add("clicked");

      return alert(
        `${first.worker}님을 선택하셨습니다 바꾸실 분을 선택해주세요`
      );
    } else {
      const first = JSON.parse(localStorage.getItem("first"));
      const second = {
        worker: e.target.innerText,
        date: e.target.parentElement.parentElement.firstElementChild.innerText,
      };

      const newCalenderData = [...mainData.CalenderData].reduce(
        (resultArr, curObj) => {
          let newWorkTeam;
          if (String(curObj.date) === first.date) {
            const index = curObj.WorkTeam.indexOf(first.worker);
            newWorkTeam = [...curObj.WorkTeam].map((worker, mapIdx) => {
              if (mapIdx === index) {
                return second.worker;
              } else {
                return worker;
              }
            });
          }
          if (String(curObj.date) === second.date) {
            const index = curObj.WorkTeam.indexOf(second.worker);
            newWorkTeam = [...curObj.WorkTeam].map((worker, mapIdx) => {
              if (mapIdx === index) {
                return first.worker;
              } else {
                return worker;
              }
            });
          }
          return resultArr.concat({
            ...curObj,
            WorkTeam: newWorkTeam ?? curObj.WorkTeam,
          });
        },
        []
      );
      localStorage.setItem("isClick", false);

      setMainData((prev) => ({ ...prev, CalenderData: newCalenderData }));

      return alert("바꾸었습니다");
    }
  };
  return (
    <tr>
      {week.map((day) => (
        <td key={uuid()} className='bg-white border-2 calender-border'>
          {day.date ? (
            <div
              className={`${day.style} font-date cursor-pointer hover:bg-slate-100 transition-all`}
              onClick={dateEvent}
            >
              {day.date}
            </div>
          ) : (
            <div className={day.style}></div>
          )}

          <div className='h-3/4 flex flex-col items-center font-workername overflow-x-auto scroll-none'>
            {day.WorkTeam.map((worker) => (
              <div
                key={uuid()}
                onClick={changeEvent}
                className={`w-full h-full flex justify-center items-center cursor-pointer ${worker} hover:bg-yellow-200`}
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

export default Week;
