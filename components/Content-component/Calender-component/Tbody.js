import Week from "./Week";
import ForCalenderRender from "@/libs/ForCalenderRender";
import uuid from "@/libs/uuid";

const Tbody = ({ mainData }) => {
  const newCalenderData = [...mainData.CalenderData];
  const year = mainData.Year;
  const month = mainData.Month;
  const renderData = ForCalenderRender(newCalenderData, year, month);

  return (
    <tbody className='h-4/5'>
      {renderData.map((week) => (
        <Week week={week} key={uuid()} />
      ))}
    </tbody>
  );
}

export default Tbody