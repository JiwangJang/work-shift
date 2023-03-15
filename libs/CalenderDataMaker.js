const CalenderDataMaker = (
  year,
  month,
  existData,
  newOrder = [],
  mode = ""
) => {
  let index = -1;

  switch (mode) {
    case "weekend":
      return existData.map((data) => {
        const HolidayChecker = data.isHoliday;
        if (index === newOrder.length - 1) index = -1;
        switch (HolidayChecker) {
          case 0:
          case 6:
            index++;
            return {
              ...data,
              WorkTeam: newOrder[index % newOrder.length] ?? [],
            };
          default:
            return {
              ...data,
              WorkTeam: [],
            };
        }
      });

    case "weekday":
      return existData.map((data) => {
        const HolidayChecker = data.isHoliday;
        if (index === newOrder.length - 1) index = -1;
        switch (HolidayChecker) {
          case 0:
          case 6:
            return {
              ...data,
              WorkTeam: [],
            };
          default:
            index++;
            return {
              ...data,
              WorkTeam: newOrder[index % newOrder.length] ?? [],
            };
        }
      });

    case "all":
      return existData.map((data, mapIdx) => {
        return {
          ...data,
          WorkTeam: newOrder[mapIdx % newOrder.length] ?? [],
        };
      });

    default:
      const CalenderData = [];
      const nextMonthLastDate = new Date(year, month + 1, 0).getDate();
      for (let i = 0; i < nextMonthLastDate; i++) {
        CalenderData.push({
          date: i + 1,
          isHoliday: new Date(year, month, i + 1).getDay(),
          WorkTeam: newOrder[i % newOrder.length] ?? [],
        });
      }
      return CalenderData;
  }
};

export default CalenderDataMaker;
