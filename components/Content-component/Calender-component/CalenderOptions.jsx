import { useContext, useState } from "react";
import { ContentContext } from "@/components/Content";
import CalenderDataMaker from "@/libs/CalenderDataMaker";

const CalenderOptions = () => {
  const [monthSelect, setMonthSelect] = useState(false);
  const mainData = useContext(ContentContext).mainData;
  const setMainData = useContext(ContentContext).setMainData;

  const clipboardCopy = async () => {
    const year = mainData.Year;
    const month = mainData.Month;
    const MonthData = mainData.CalenderData;

    const order = mainData.WorkOrder.map((arr) => arr.length);
    const highestMemberCount = Math.max(...order);

    const finalResult = [];
    const temporaryDateResult = [];
    const temporaryWorkerResult = [];

    const first = new Date(year, month, 1).getDay();
    let dataIndex = 0;

    const dummy = ["", "\t"];

    for (let i = 0; i < highestMemberCount; i++) temporaryWorkerResult.push([]);

    console.log(MonthData.length + first);

    for (let position = 0; position < MonthData.length + first; position++) {
      if (position < first) {
        temporaryDateResult.push(...dummy);
        temporaryWorkerResult.forEach((arr) => arr.push(...dummy));
      } else {
        const currentData = MonthData[dataIndex];
        const EnterOrTap =
          currentData.isHoliday === 6 || dataIndex == MonthData.length - 1
            ? "\n"
            : "\t";
        temporaryDateResult.push(currentData.date, EnterOrTap);
        temporaryWorkerResult.forEach((arr, idx) =>
          arr.push(currentData.WorkTeam[idx] ?? "", EnterOrTap)
        );
        dataIndex++;

        if (EnterOrTap === "\n") {
          temporaryDateResult.forEach((item) => finalResult.push(item));
          temporaryWorkerResult.forEach((arr) => {
            arr.forEach((item) => finalResult.push(item));
          });

          temporaryDateResult.splice(0);
          temporaryWorkerResult.forEach((arr) => {
            arr.splice(0);
          });
        }
      }
    }

    navigator.clipboard
      .writeText(finalResult.join(""))
      .then(() => alert("원하시는 곳에 붙여넣어주세요"));
  };

  const makeNewWorkShift = () => {
    setMonthSelect((prev) => !prev);
  };

  const monthInputEvent = (e) => {
    const yyyymm = e.target.value;
    const year = Number(yyyymm.split("-")[0]);
    const month = Number(yyyymm.split("-")[1]) - 1;
    const mode = "all";

    setMainData((prev) => ({
      ...prev,
      Year: year,
      Month: month,
      mode,
      CalenderData: CalenderDataMaker(
        year,
        month,
        mainData.CalenderData,
        mainData.WorkOrder
      ),
    }));

    setMonthSelect(false);
  };

  const SelectWorkShift = (isWeekend) => {
    if (JSON.stringify(mainData.WorkOrder) == JSON.stringify([]))
      return alert("근무순서를 먼저 입력해주십시오");

    setMainData((prev) => ({
      ...prev,
      mode: isWeekend,
      CalenderData: CalenderDataMaker(
        prev.year,
        prev.month,
        prev.CalenderData,
        prev.WorkOrder,
        isWeekend
      ),
    }));
  };

  return (
    <div className='w-1/5 flex flex-col justify-around items-center font-popup text-5xl max-[1500px]:text-4xl'>
      <button className='CalenderOptionBtn' onClick={clipboardCopy}>
        클립보드에 복사
      </button>
      {monthSelect ? (
        <div className='monthinputContainer'>
          <button
            onClick={makeNewWorkShift}
            className='text-3xl w-full Xmark flex items-center justify-end'
          >
            ☒
          </button>
          <input
            type={"month"}
            onInput={monthInputEvent}
            className='monthinput cursor-pointer focus:border-none text-3xl'
            id='monthInput'
          ></input>
        </div>
      ) : (
        <button
          className='CalenderOptionBtn'
          onClick={makeNewWorkShift}
          id='NewWorkShift'
        >
          새로 짜기
        </button>
      )}
      <button
        className='CalenderOptionBtn'
        onClick={() => SelectWorkShift("weekend")}
      >
        주말만 짜기
      </button>
      <button
        className='CalenderOptionBtn'
        onClick={() => SelectWorkShift("weekday")}
      >
        평일만 짜기
      </button>
    </div>
  );
};

export default CalenderOptions;
