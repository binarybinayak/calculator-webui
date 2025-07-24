import { addEquationElement } from "../store/slices/equationSlice";
import { addDisplayEquationElement } from "../store/slices/displayEquationSlice";
import ActionButton from "./ActionButton";
import { useDispatch } from "react-redux";

const ValueButton = ({ buttonText, inputKey, value, displayValue }) => {
  const dispatch = useDispatch();
  return (
    <ActionButton
      buttonText={buttonText}
      inputKey={inputKey}
      action={() => {
        dispatch(addEquationElement(value));
        dispatch(addDisplayEquationElement(displayValue));
      }}
    />
  );
};

export default ValueButton;
