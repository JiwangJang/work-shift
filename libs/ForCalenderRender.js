// 달력 렌더링 및 엑셀 추출을 위한 데이터를 만드는 함수
export default function ForCalenderRender(origin, year, month) {
  const conclusion = [];
  const firstDate = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const weekLoop = Math.ceil((firstDate + lastDate) / 7);
  const firstDay = new Date(year, month, 1).getDay();

  let index = 0;
  let position = 0;

  for (let week = 0; week < weekLoop; week++) {
    const semi = [];
    for (let row = 0; row < 7; row++) {
      if (position >= firstDay && index < lastDate) {
        let holidayStyle;
        switch (origin[index].isHoliday) {
          case 0:
            holidayStyle = "sundayStyle";
            break;
          case 6:
            holidayStyle = "saturdayStyle";
            break;

          default:
            holidayStyle = "dateStyle";
            break;
        }
        semi.push({
          ...origin[index],
          style: holidayStyle,
        });
        index++;
      } else {
        semi.push({
          date: "",
          WorkTeam: [],
          style: "no-date",
        });
      }
      position++;
    }
    conclusion.push(semi);
  }
  return conclusion;
}
