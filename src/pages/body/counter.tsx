import { useNavigate } from "react-router-dom";

import counterSlice from "../../redux/store/slice/counter";
import { useAppDispatch, useAppSelector } from "../../store";

const Page = () => {
  const counter = useAppSelector((s) => s.counter);

  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const add = () => {
    dispatch(counterSlice.actions.incrementByAmount(2));
  };

  return (
    <>
      <div
        onClick={() => {
          nav("/");
        }}
      >
        Navigate
      </div>
      <div>{`${counter.value}`}</div>
      <button onClick={add}>up</button>
    </>
  );
};

export default Page;
