import SimpleCalculator from "./calculators/SimpleCalculator";
import "./App.css";
import { useSelector } from "react-redux";
import CalculatorAppController from "./CalculatorAppController";

const Calculator = () => {
  const calculatorType = useSelector((store) => store.calculatorType);
  if (calculatorType == "Simple Calculator") {
    return <SimpleCalculator />;
  }
};

function App() {
  const mode = useSelector((store) => store.mode);
  return (
    <div
      className={
        (mode == "light" ? "" : "bg-gray-800") +
        " h-screen flex justify-center-safe items-center-safe"
      }
    >
      <div>
        <CalculatorAppController />
        <Calculator />
      </div>
    </div>
  );
}

export default App;
