import WorkWeek from "./Week-work";
import ReadWeek from "./Week-read";
import ForCalenderRender from "@/libs/ForCalenderRender";
import uuid from "@/libs/uuid";

const Tbody = ({ mainData, mode = null }) => {
  const newCalenderData = [...mainData.CalenderData];
  const year = mainData.Year;
  const month = mainData.Month;
  const renderData = ForCalenderRender(newCalenderData, year, month);

  return (
    <tbody className='h-4/5'>
      {renderData.map((week) =>
        mode === "read" ? (
          <ReadWeek week={week} key={uuid()} />
        ) : (
          <WorkWeek week={week} key={uuid()} />
        )
      )}
    </tbody>
  );
};

export default Tbody;
