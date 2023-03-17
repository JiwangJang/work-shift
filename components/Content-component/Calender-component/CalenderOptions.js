import { useContext, useEffect, useState } from "react";
import { ContentContext } from "@/components/Content";
import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import CalenderDataMaker from "@/libs/CalenderDataMaker";
import ForCalenderRender from "@/libs/ForCalenderRender";

class forXlsx {
  constructor([Sun, Mon, Tue, Wen, Thu, Fri, Sat]) {
    (this.Sun = Sun),
      (this.Mon = Mon),
      (this.Tue = Tue),
      (this.Wen = Wen),
      (this.Thu = Thu),
      (this.Fri = Fri),
      (this.Sat = Sat);
  }
}

const CalenderOptions = () => {
  const [monthSelect, setMonthSelect] = useState(false);
  const mainData = useContext(ContentContext).mainData;
  const setMainData = useContext(ContentContext).setMainData;
  const year = mainData.Year;
  const month = mainData.Month;

  const xlsxDown = async () => {
    const WorkOrder = mainData.WorkOrder;
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`${year}년 ${month}월 당직근무표`, {
      pageSetup: {},
    });
    const title = document.getElementById("TableTitle");
    const columnStyle = {
      alignment: { vertical: "middle", horizontal: "center" },
    };
    let Repeat = 0;

    WorkOrder.forEach((element) => {
      if (element.length > Repeat) Repeat = element.length;
    });

    // sheet 초기설정
    worksheet.columns = [
      { header: "Sun", key: "Sun", width: 10, style: columnStyle },
      { header: "Mon", key: "Mon", width: 10, style: columnStyle },
      { header: "Tue", key: "Tue", width: 10, style: columnStyle },
      { header: "Wen", key: "Wen", width: 10, style: columnStyle },
      { header: "Thu", key: "Thu", width: 10, style: columnStyle },
      { header: "Fri", key: "Fri", width: 10, style: columnStyle },
      { header: "Sat", key: "Sat", width: 10, style: columnStyle },
    ];

    worksheet.spliceRows(1, 0, []);
    worksheet.mergeCells("A1:G1");

    const titleCell = worksheet.getCell("A1");

    // 엑셀 파일 스타일
    titleCell.value = `${title.innerText}`;
    titleCell.font = {
      color: { argb: "000000" },
      size: 24,
      name: "함초롬돋움",
    };
    titleCell.alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    let printRange;
    //ExcelJs양식에 맞춰서 데이터 가공
    ForCalenderRender(mainData.CalenderData, year, month).forEach((array) => {
      const result = [];
      const dateList = array.map((day) => day.date ?? "");
      result.push(new forXlsx(dateList));
      for (let i = 0; i < Repeat; i++) {
        const workerList = array.map((itme) => itme.WorkTeam[i] ?? "");
        result.push(new forXlsx(workerList));
      }
      printRange += result.length;
      worksheet.addRows(result);
    });

    worksheet.pageSetup = {
      paperSize: 9,
      printArea: `A1:G${printRange}`,
    };

    // 다운로드
    const mimeType = {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    };
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], mimeType);
    saveAs(blob, `${title.innerText}.xlsx`);
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
    <div className='w-1/5 flex flex-col justify-around items-center '>
      <button className='CalenderOptionBtn' onClick={xlsxDown}>
        엑셀로 다운받기
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
