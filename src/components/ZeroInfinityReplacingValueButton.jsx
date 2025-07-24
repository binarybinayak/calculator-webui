import {
  addEquationElement,
  clearEquation,
} from "../store/slices/equationSlice";
import {
  addDisplayEquationElement,
  clearDisplayEquation,
} from "../store/slices/displayEquationSlice";
import ActionButton from "./ActionButton";
import { useSelector, useDispatch } from "react-redux";

const ZeroInfinityReplacingValueButton = ({
  buttonText,
  inputKey,
  value,
  displayValue,
}) => {
  const dispatch = useDispatch();
  const equation = useSelector((store) => store.equation);
  return (
    <ActionButton
      buttonText={buttonText}
      inputKey={inputKey}
      action={() => {
        if (
          (equation.length === 1 && equation[0] == "0") ||
          (equation.length === 1 && equation[0] == "Infinity")
        ) {
          dispatch(clearDisplayEquation());
          dispatch(clearEquation());
        }
        dispatch(addEquationElement(value));
        dispatch(addDisplayEquationElement(displayValue));
      }}
    />
  );
};

export default ZeroInfinityReplacingValueButton;
