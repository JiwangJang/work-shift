export default function Thead({ year, month }) {
  const title = `${year}년 ${month + 1}월 당직근무표`;
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <thead className='h-1/5 w-full'>
      <tr className='h-3/5 font-calendertitle text-calendertitle'>
        <th colSpan={7} id='TableTitle'>
          {title}
        </th>
      </tr>
      <tr className='h-2/5 font-article text-3xl-nolineheight font-bold text-center'>
        {days.map((day, idx) => (
          <td key={idx}>{day}</td>
        ))}
      </tr>
    </thead>
  );
}
