"use client";

import { useContext, useCallback, useMemo } from "react";
import { ContentContext } from "../../Content";
import CalenderDataMaker from "../../../libs/CalenderDataMaker";

const List = () => {
  const mainData = useContext(ContentContext).mainData;
  const setMainData = useContext(ContentContext).setMainData;
  const originWorkerList = useMemo(() => [...mainData.Worker], [mainData]);
  const originWorkOrder = useMemo(() => [...mainData.WorkOrder], [mainData]);

  //수정 및 삭제 이벤트 리팩토링 해야함(똑같은게 두번이상 쓰임)
  const reviseEvent = useCallback(
    (e) => {
      const enteredName = prompt("변경사항을 입력해주십시오");
      const SelectedWorker = e.target.parentElement.firstChild.innerText;
      if (!enteredName) return alert("다시입력해주십시오");

      const newWorkerList = originWorkerList.map((worker) => {
        if (worker === SelectedWorker) {
          return (worker = enteredName);
        }
        return worker;
      });

      const newWorkOrder = originWorkOrder.map((team) => {
        const isInclude = team.includes(SelectedWorker);

        if (isInclude) {
          return team.map((worker) => {
            if (worker === SelectedWorker) {
              return (worker = enteredName);
            }
            return worker;
          });
        }

        return team;
      });

      setMainData((prev) => ({
        ...prev,
        Worker: newWorkerList,
        WorkOrder: newWorkOrder,
        CalenderData: CalenderDataMaker(
          prev.Year,
          prev.Month,
          prev.CalenderData,
          newWorkOrder,
          prev.mode
        ),
      }));
    },
    [setMainData, originWorkOrder, originWorkerList]
  );

  const removeEvent = useCallback(
    (e) => {
      const SelectedWorker = e.target.parentElement.firstElementChild.innerText;
      if (confirm(`${SelectedWorker}님을 삭제하시겠습니까?`)) {
        const newWorkerList = originWorkerList.filter(
          (worker) => worker !== SelectedWorker
        );

        const newWorkOrder = originWorkOrder
          .map((team) => {
            if (team.includes(SelectedWorker)) {
              return team.filter((worker) => worker !== SelectedWorker);
            } else {
              return team;
            }
          })
          .filter((team) => JSON.stringify([]) !== JSON.stringify(team));

        setMainData((prev) => ({
          ...prev,
          Worker: newWorkerList,
          WorkOrder: newWorkOrder,
          CalenderData: CalenderDataMaker(
            prev.Year,
            prev.Month,
            prev.CalenderData,
            newWorkOrder,
            prev.mode
          ),
        }));
      }
      return;
    },
    [setMainData, originWorkOrder, originWorkerList]
  );

  const HighlightEvent = useCallback((e) => {
    const targetWorker = String(e.target.innerText);
    Array.from(document.getElementsByClassName(`${targetWorker}`)).forEach(
      (element) => {
        element.classList.toggle("myWorkDayChecker");
      }
    );
    e.target.classList.toggle("bg-slate-300");
  }, []);

  return (
    <div className='h-1/3 w-full'>
      <div className='h-1/5 flex justify-center items-center font-smallTitle text-smalltitle max-[1020px]:text-[30px] transition-all'>
        근무자 목록
      </div>
      <div className='h-4/5 grid grid-cols-2 grid-auto-row-100 scroll-design place-items-center font-article text-lg font-extrabold overflow-y-auto'>
        {originWorkerList.map((worker) => (
          <div
            key={worker}
            className='grid grid-cols-2fr-1fr-1fr w-full h-full place-items-center'
          >
            <span
              onClick={HighlightEvent}
              className='w-full h-full flex justify-center items-center hover:bg-slate-300 cursor-pointer'
            >
              {worker}
            </span>
            <button
              onClick={reviseEvent}
              className='hover:bg-slate-300 w-full h-full'
            >
              수정
            </button>
            <button
              onClick={removeEvent}
              className='hover:bg-slate-300 w-full h-full'
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
