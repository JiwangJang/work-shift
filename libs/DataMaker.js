import CalenderDataMaker from "./CalenderDataMaker";

export default function DataMaker() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  return {
    Worker: [],
    WorkOrder: [],
    CalenderData: CalenderDataMaker(year, month),
    Year: year,
    Month: month,
    mode: "all",
  };
}
