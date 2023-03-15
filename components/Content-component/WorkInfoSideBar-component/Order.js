import {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { ContentContext } from "../../Content.js";
import CalenderDataMaker from "@/libs/CalenderDataMaker.js";

const Order = () => {
  const [result, setResult] = useState(
    <div className='h-1/3'>
      <h2>로딩중</h2>
    </div>
  );
  const orderId = useRef(0);
  const mainData = useContext(ContentContext).mainData;
  const setMainData = useContext(ContentContext).setMainData;
  const WorkOrder = useMemo(() => [...mainData.WorkOrder], [mainData]);

  //앞 순서로 옮길때 발생하는 이벤트
  const upEvent = useCallback(
    (e) => {
      const selected =
        e.target.parentElement.parentElement.firstElementChild.innerText;
      const idx = WorkOrder.arrayIndexOf(selected);

      if (idx === 0) {
        const firstOrder = WorkOrder.shift();
        WorkOrder.push(firstOrder);
      } else {
        WorkOrder[idx] = WorkOrder[idx - 1];
        WorkOrder[idx - 1] = selected.split(", ");
      }

      setMainData((prev) => ({
        ...prev,
        WorkOrder,
        CalenderData: CalenderDataMaker(
          prev.Year,
          prev.Month,
          prev.CalenderData,
          WorkOrder,
          prev.mode
        ),
      }));
    },
    [setMainData, WorkOrder]
  );

  // 뒤 순서로 옮길때 발생하는 이벤트
  const downEvent = useCallback(
    (e) => {
      const selected =
        e.target.parentElement.parentElement.firstElementChild.innerText;
      const idx = WorkOrder.arrayIndexOf(selected);

      if (idx === WorkOrder.length - 1) {
        const lastOrder = WorkOrder.pop();
        WorkOrder.unshift(lastOrder);
      } else {
        WorkOrder[idx] = WorkOrder[idx + 1];
        WorkOrder[idx + 1] = selected.split(", ");
      }

      setMainData((prev) => ({
        ...prev,
        WorkOrder,
        CalenderData: CalenderDataMaker(
          prev.Year,
          prev.Month,
          prev.CalenderData,
          WorkOrder,
          prev.mode
        ),
      }));
    },
    [setMainData, WorkOrder]
  );

  // 근무순서를 삭제할 때 발생하는 이벤트
  const removeEvent = useCallback(
    (e) => {
      const selected =
        e.target.parentElement.parentElement.firstElementChild.innerText.split(
          ", "
        );

      const newWorkOrder = WorkOrder.filter(
        (order) => JSON.stringify(order) !== JSON.stringify(selected)
      );

      setMainData((prev) => ({
        ...prev,
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
    [setMainData, WorkOrder]
  );

  useEffect(() => {
    setResult(
      <div className='h-1/3'>
        <div className='h-1/5 flex justify-center items-center font-smallTitle text-smalltitle'>
          근무 순서
        </div>
        <div className='h-4/5 font-article text-lg font-extrabold overflow-y-auto scroll-design'>
          {WorkOrder.map((team) => {
            orderId.current += 1;
            return (
              <div
                key={orderId.current}
                className='grid grid-cols-2fr-1fr mb-3'
              >
                <div>{team.join(", ")}</div>
                <div className='flex justify-center'>
                  <button onClick={upEvent}>▲</button>
                  <button onClick={downEvent}>▼</button>
                  <button onClick={removeEvent}>⨉</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [mainData, WorkOrder, upEvent, downEvent, removeEvent]);

  return <>{result}</>;
};

export default Order;
