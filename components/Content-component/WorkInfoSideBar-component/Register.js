import CalenderDataMaker from "@/libs/CalenderDataMaker";
import { useState, useRef, useContext } from "react";
import { ContentContext } from "../../Content";

function Inputs({ count }) {
  return (
    <div className='h-3/5 flex flex-col items-center w-full overflow-y-auto Register scroll-design'>
      {count.map((input, idx) => (
        <input
          type='text'
          key={input}
          className='rounded-full w-3/4 inputs mb-2 h-registerInput shrink-0 text-lg text-center'
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              document.querySelector(".submit").click();
            }
          }}
          placeholder={`${idx + 1}번째 칸`}
        ></input>
      ))}
    </div>
  );
}

function Buttons({ inputCount, setInputCount }) {
  const mainData = useContext(ContentContext).mainData;
  const setMainData = useContext(ContentContext).setMainData;
  const id = useRef(1);
  const inputPlus = () => {
    setInputCount((prev) => [...prev, id.current]);
    id.current += 1;
  };

  const inputMinus = () => {
    if (inputCount.length === 1) return alert("적어도 1명은 입력하셔야 합니다");
    const cur = [...inputCount];
    cur.pop();
    setInputCount(cur);
  };

  const register = () => {
    // debugger;
    const inputs = Array.from(document.querySelectorAll(".inputs"));
    const inputValues = inputs.map((input) => String(input.value));
    const newWorkTeam = Array.from(new Set(inputValues));
    if (newWorkTeam.includes("")) return alert("빈칸을 채워주세요");
    const newWorker = newWorkTeam.filter(
      (worker) => !mainData.Worker.includes(worker)
    );

    setMainData((prev) => ({
      ...prev,
      Worker: prev.Worker.concat(newWorker),
      WorkOrder: prev.WorkOrder.concat([newWorkTeam]),
      CalenderData: CalenderDataMaker(
        prev.Year,
        prev.Month,
        [...prev.CalenderData],
        prev.WorkOrder.concat([newWorkTeam]),
        prev.mode
      ),
    }));
    inputs.forEach((input, idx) => {
      if (idx === 0) input.focus();
      input.value = "";
    });
  };

  return (
    <div className='h-1/5 w-full flex justify-around font-article text-3xl-nolineheight font-semibold'>
      <button
        onClick={inputMinus}
        className='w-1/3 hover:bg-slate-300 active:bg-yellow-300 flex justify-center items-center'
      >
        -
      </button>
      <button
        onClick={register}
        className='submit w-1/3 hover:bg-slate-300 active:bg-yellow-300 flex justify-center items-center'
      >
        입력
      </button>
      <button
        onClick={inputPlus}
        className='w-1/3 hover:bg-slate-300 active:bg-yellow-300 flex justify-center items-center'
      >
        +
      </button>
    </div>
  );
}

export default function Register() {
  const [inputCount, setInputCount] = useState([0]);

  return (
    <div className='h-1/3 Register'>
      <div className='h-1/5 flex justify-center items-center font-smallTitle text-smalltitle'>
        근무자 입력
      </div>
      <Inputs count={inputCount} />
      <Buttons setInputCount={setInputCount} inputCount={inputCount} />
    </div>
  );
}
