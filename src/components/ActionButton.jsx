import { useSelector, useDispatch } from "react-redux";
import { clearDisplayEquation } from "../store/slices/displayEquationSlice";
import { clearEquation } from "../store/slices/equationSlice";
import { useEffect, useState } from "react";

const ActionButton = ({ buttonText, inputKey, action }) => {
  const mode = useSelector((store) => store.mode);
  const equation = useSelector((store) => store.equation);
  const dispatch = useDispatch();
  const [keyPressCss, setKeyPressCss] = useState(" ");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key == inputKey) {
        setKeyPressCss(mode == "light" ? " bg-gray-950" : " bg-zinc-400");
      }
    };
    const handleKeyUp = (event) => {
      if (event.key == inputKey) {
        if (equation[0] == "NaN") {
          dispatch(clearDisplayEquation());
          dispatch(clearEquation());
        }
        action();
        setKeyPressCss(" ");
      }
    };
    if (inputKey) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [equation]);

  let cssStyle =
    mode === "light"
      ? "bg-gray-800 text-zinc-100 border-zinc-100 hover:bg-gray-900 active:bg-gray-950"
      : "bg-zinc-100 text-black border-black hover:bg-zinc-300 active:bg-zinc-400";
  return (
    <div>
      <button
        className={
          cssStyle +
          keyPressCss +
          " rounded-xl font-bold font-mono " +
          " border-1 w-11 h-10 m-1" +
          " sm:border-1 sm:w-11 sm:h-10 sm:m-1" +
          " md:border-1 md:w-13 md:h-10 md:m-1" +
          " lg:border-1 lg:w-15 lg:h-10 lg:m-1"
        }
        onClick={() => {
          if (equation[0] == "NaN") {
            dispatch(clearDisplayEquation());
            dispatch(clearEquation());
          }
          action();
        }}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ActionButton;
