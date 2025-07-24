import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "./store/slices/modeSlice";
import {
  calculatorTypes,
  switchCalculator,
} from "./store/slices/CalculatorTypeSlice";

const ModeSwitch = () => {
  const mode = useSelector((store) => store.mode);
  const dispach = useDispatch();
  return (
    <div>
      <div
        onClick={() => dispach(toggleMode())}
        className={
          (mode == "light"
            ? "bg-stone-100 border-gray-900 justify-start"
            : "bg-gray-900 border-stone-100 justify-end") +
          " w-22 h-10 rounded-3xl border-2  flex items-center"
        }
      >
        {" "}
        {mode == "light" ? (
          <>
            <div className="bg-gray-900 w-10 h-10 rounded-3xl"></div>
            <span className="text-gray-900 text-xs pl-1 font-mono">Light</span>
          </>
        ) : (
          <>
            <span className="text-stone-100 text-xs pr-1 font-mono">Dark</span>
            <div className="bg-stone-100 w-10 h-10 rounded-3xl"></div>
          </>
        )}
      </div>
    </div>
  );
};

const CalculatorSelector = () => {
  const dispatch = useDispatch();
  const calculatorType = useSelector((store) => store.calculatorType);
  const mode = useSelector((store) => store.mode);

  return (
    <div>
      <select
        className={
          (mode == "light" ? "text-gray-900" : "text-stone-100") + " font-mono"
        }
        value={calculatorType}
        onChange={(e) => dispatch(switchCalculator(e.target.value))}
      >
        {calculatorTypes.map((cType) => {
          return (
            <option key={cType} className="font-mono" value={cType}>
              {cType}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const CalculatorAppController = () => {
  return (
    <div className="flex justify-between mb-7 items-center">
      <CalculatorSelector />
      <ModeSwitch />
    </div>
  );
};

export default CalculatorAppController;
