import ValueButton from "../components/ValueButton";
import ZeroInfinityReplacingValueButton from "../components/ZeroInfinityReplacingValueButton";
import ActionButton from "../components/ActionButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  addEquationElement,
  clearEquation,
  removeEquationElement,
} from "../store/slices/equationSlice";
import { evaluate } from "mathjs";
import {
  addDisplayEquationElement,
  clearDisplayEquation,
  removeDisplayEquationElement,
} from "../store/slices/displayEquationSlice";

import {
  getBalanceParentheses,
  convertEquationToDeg,
} from "../utils/generalCalculatorUtils";

const CalculatorKeypad = () => {
  const [inverse, setInverse] = useState(false);
  const dispatch = useDispatch();
  const equation = useSelector((store) => store.equation);
  const [typeDegRed, setTypeDegRad] = useState("Deg");

  return (
    <div className="sm:w-sm md:w-md lg:w-lg">
      <div className="flex justify-between">
        <ActionButton
          buttonText={"Inv"}
          inputKey={"Tab"}
          action={() => setInverse((prev) => !prev)}
        />
        <ActionButton
          buttonText={typeDegRed}
          action={() =>
            setTypeDegRad((prev) => (prev == "Deg" ? "Rad" : "Deg"))
          }
        />
        <ValueButton
          buttonText={"x!"}
          inputKey={"!"}
          value={"!"}
          displayValue={"!"}
        />
        <ZeroInfinityReplacingValueButton
          buttonText={"("}
          value={"("}
          inputKey={"("}
          displayValue={"("}
        />
        <ActionButton
          buttonText={")"}
          inputKey={")"}
          action={() => {
            const currentEquation = equation.join("").split("");
            const noOfOpenBracketOccurrences = currentEquation.reduce(
              (total, val) => (val === "(" ? total + 1 : total),
              0
            );
            const noOfClosedBracketOccurrences = currentEquation.reduce(
              (total, val) => (val === ")" ? total + 1 : total),
              0
            );
            if (noOfOpenBracketOccurrences > noOfClosedBracketOccurrences) {
              dispatch(addDisplayEquationElement(")"));
              dispatch(addEquationElement(")"));
            }
          }}
        />
        <ActionButton
          buttonText={"C"}
          inputKey={"Escape"}
          action={() => {
            dispatch(clearEquation());
            dispatch(clearDisplayEquation());
            dispatch(addDisplayEquationElement("0"));
            dispatch(addEquationElement("0"));
          }}
        />
        <ActionButton
          buttonText={"<"}
          inputKey={"Backspace"}
          action={() => {
            dispatch(removeEquationElement());
            dispatch(removeDisplayEquationElement());
            if (equation.length <= 1) {
              dispatch(addDisplayEquationElement("0"));
              dispatch(addEquationElement("0"));
            }
          }}
        />
      </div>
      <div className="flex justify-between">
        {!inverse ? (
          <ZeroInfinityReplacingValueButton
            buttonText={"In"}
            value={"log("}
            displayValue={"In("}
          />
        ) : (
          <ZeroInfinityReplacingValueButton
            buttonText={"e^"}
            value={"e^("}
            displayValue={"e^("}
          />
        )}
        {!inverse ? (
          <ZeroInfinityReplacingValueButton
            buttonText={"sin"}
            value={"sin("}
            displayValue={"sin("}
          />
        ) : (
          <ZeroInfinityReplacingValueButton
            buttonText={"sin⁻¹"}
            value={"asin("}
            displayValue={"sin⁻¹("}
          />
        )}
        <ValueButton
          buttonText={"%"}
          inputKey={"%"}
          value={"%"}
          displayValue={"%"}
        />
        <ZeroInfinityReplacingValueButton
          buttonText={"7"}
          inputKey={"7"}
          value={"7"}
          displayValue={"7"}
        />
        <ZeroInfinityReplacingValueButton
          buttonText={"8"}
          inputKey={"8"}
          value={"8"}
          displayValue={"8"}
        />
        <ZeroInfinityReplacingValueButton
          buttonText={"9"}
          inputKey={"9"}
          value={"9"}
          displayValue={"9"}
        />
        <ActionButton
          buttonText={"÷"}
          inputKey={"/"}
          action={() => {
            const replaceSymbols = ["+", "-", "*", "/"];
            const list = JSON.parse(JSON.stringify(equation));
            if (replaceSymbols.includes(list[list.length - 1])) {
              dispatch(removeDisplayEquationElement());
              dispatch(removeEquationElement());
              list.pop();
            }
            let lastElement = list[list.length - 1].split("");
            if (lastElement[lastElement.length - 1] != "(") {
              dispatch(addDisplayEquationElement("÷"));
              dispatch(addEquationElement("/"));
            }
          }}
        />
      </div>
      <div className="flex justify-between">
        {!inverse ? (
          <ZeroInfinityReplacingValueButton
            buttonText={"log"}
            value={"log(10,"}
            displayValue={"log("}
          />
        ) : (
          <ZeroInfinityReplacingValueButton
            buttonText={"10^"}
            value={"10^("}
            displayValue={"10^("}
          />
        )}
        {!inverse ? (
          <ZeroInfinityReplacingValueButton
            buttonText={"cos"}
            value={"cos("}
            displayValue={"cos("}
          />
        ) : (
          <ZeroInfinityReplacingValueButton
            buttonText={"cos⁻¹"}
            value={"acos("}
            displayValue={"cos⁻¹("}
          />
        )}

        {!inverse ? (
          <ActionButton
            buttonText={"√"}
            action={() => {
              let updatedEquation =
                equation.join("") + getBalanceParentheses(equation);
              if (typeDegRed === "Deg") {
                updatedEquation = convertEquationToDeg(updatedEquation);
              }
              let answer = evaluate("sqrt(" + updatedEquation + ")");
              answer = (Math.abs(answer) < 1e-12 ? 0 : +answer.toFixed(10))
                .toString()
                .split("");
              dispatch(clearEquation());
              dispatch(clearDisplayEquation());
              if (answer.join("").includes("Infinity")) {
                dispatch(addDisplayEquationElement("Infinity"));
                dispatch(addEquationElement("Infinity"));
              } else {
                answer.forEach((element) => {
                  dispatch(addDisplayEquationElement(element));
                  dispatch(addEquationElement(element));
                });
              }
            }}
          />
        ) : (
          <ActionButton
            buttonText={"x²"}
            action={() => {
              let updatedEquation =
                equation.join("") + getBalanceParentheses(equation);
              if (typeDegRed === "Deg") {
                updatedEquation = convertEquationToDeg(updatedEquation);
              }
              let answer = evaluate("(" + updatedEquation + ")^2");
              answer = (Math.abs(answer) < 1e-12 ? 0 : +answer.toFixed(10))
                .toString()
                .split("");
              dispatch(clearEquation());
              dispatch(clearDisplayEquation());
              if (answer.join("").includes("Infinity")) {
                dispatch(addDisplayEquationElement("Infinity"));
                dispatch(addEquationElement("Infinity"));
              } else {
                answer.forEach((element) => {
                  dispatch(addDisplayEquationElement(element));
                  dispatch(addEquationElement(element));
                });
              }
            }}
          />
        )}
        <ZeroInfinityReplacingValueButton
          buttonText={"4"}
          inputKey={"4"}
          value={"4"}
          displayValue={"4"}
        />
        <ZeroInfinityReplacingValueButton
          buttonText={"5"}
          inputKey={"5"}
          value={"5"}
          displayValue={"5"}
        />
        <ZeroInfinityReplacingValueButton
          buttonText={"6"}
          inputKey={"6"}
          value={"6"}
          displayValue={"6"}
        />
        <ActionButton
          buttonText={"x"}
          inputKey={"*"}
          action={() => {
            const replaceSymbols = ["+", "-", "*", "/"];
            const list = JSON.parse(JSON.stringify(equation));
            if (replaceSymbols.includes(list[list.length - 1])) {
              dispatch(removeDisplayEquationElement());
              dispatch(removeEquationElement());
              list.pop();
            }
            let lastElement = list[list.length - 1].split("");
            if (lastElement[lastElement.length - 1] != "(") {
              dispatch(addDisplayEquationElement("x"));
              dispatch(addEquationElement("*"));
            }
          }}
        />
      </div>
      <div className="flex justify-between">
        {!inverse ? (
          <ValueButton
            buttonText={"^"}
            inputKey={"^"}
            value={"^("}
            displayValue={"^("}
          />
        ) : (
          <ValueButton
            buttonText={"y√x"}
            value={"^(1/"}
            displayValue={"root("}
          />
        )}

        {!inverse ? (
          <ZeroInfinityReplacingValueButton
            buttonText={"tan"}
            value={"tan("}
            displayValue={"tan("}
          />
        ) : (
          <ZeroInfinityReplacingValueButton
            buttonText={"tan⁻¹"}
            value={"atan("}
            displayValue={"tan⁻¹("}
          />
        )}
        <ActionButton
          buttonText={"1/x"}
          action={() => {
            let updatedEquation =
              equation.join("") + getBalanceParentheses(equation);
            if (typeDegRed === "Deg") {
              updatedEquation = convertEquationToDeg(updatedEquation);
            }
            let answer = evaluate("1/(" + updatedEquation + ")");
            answer = (Math.abs(answer) < 1e-12 ? 0 : +answer.toFixed(10))
              .toString()
              .split("");
            dispatch(clearEquation());
            dispatch(clearDisplayEquation());
            if (answer.join("").includes("Infinity")) {
              dispatch(addDisplayEquationElement("Infinity"));
              dispatch(addEquationElement("Infinity"));
            } else {
              answer.forEach((element) => {
                dispatch(addDisplayEquationElement(element));
                dispatch(addEquationElement(element));
              });
            }
          }}
        />
        <ZeroInfinityReplacingValueButton
          buttonText={"1"}
          inputKey={"1"}
          value={"1"}
          displayValue={"1"}
        />
        <ZeroInfinityReplacingValueButton
          buttonText={"2"}
          inputKey={"2"}
          value={"2"}
          displayValue={"2"}
        />
        <ZeroInfinityReplacingValueButton
          buttonText={"3"}
          inputKey={"3"}
          value={"3"}
          displayValue={"3"}
        />
        <ActionButton
          buttonText={"-"}
          inputKey={"-"}
          action={() => {
            const replaceSymbols = ["+", "-", "*", "/"];
            if (replaceSymbols.includes(equation[equation.length - 1])) {
              dispatch(removeDisplayEquationElement());
              dispatch(removeEquationElement());
            }
            dispatch(addDisplayEquationElement("-"));
            dispatch(addEquationElement("-"));
          }}
        />
      </div>
      <div className="flex justify-between">
        <ValueButton buttonText={"Exp"} value={"E"} displayValue={"E"} />
        <ZeroInfinityReplacingValueButton
          buttonText={"π"}
          value={"pi"}
          displayValue={"π"}
        />
        <ZeroInfinityReplacingValueButton
          buttonText={"e"}
          inputKey={"e"}
          value={"e"}
          displayValue={"e"}
        />
        <ZeroInfinityReplacingValueButton
          buttonText={"0"}
          inputKey={"0"}
          value={"0"}
          displayValue={"0"}
        />
        <ValueButton buttonText={"."} value={"."} displayValue={"."} />
        <ActionButton
          buttonText={"="}
          inputKey={"Enter"}
          action={() => {
            let updatedEquation =
              equation.join("") + getBalanceParentheses(equation);
            if (typeDegRed === "Deg") {
              updatedEquation = convertEquationToDeg(updatedEquation);
            }
            let answer = evaluate(updatedEquation);
            answer = (Math.abs(answer) < 1e-12 ? 0 : +answer.toFixed(10))
              .toString()
              .split("");
            dispatch(clearEquation());
            dispatch(clearDisplayEquation());
            if (answer.join("").includes("Infinity")) {
              dispatch(addDisplayEquationElement("Infinity"));
              dispatch(addEquationElement("Infinity"));
            } else if (answer.join("").includes("NaN")) {
              dispatch(addDisplayEquationElement("NaN"));
              dispatch(addEquationElement("NaN"));
            } else {
              answer.forEach((element) => {
                dispatch(addDisplayEquationElement(element));
                dispatch(addEquationElement(element));
              });
            }
          }}
        />
        <ActionButton
          buttonText={"+"}
          inputKey={"+"}
          action={() => {
            const replaceSymbols = ["+", "-", "*", "/"];
            const list = JSON.parse(JSON.stringify(equation));
            if (replaceSymbols.includes(list[list.length - 1])) {
              dispatch(removeDisplayEquationElement());
              dispatch(removeEquationElement());
              list.pop();
            }
            let lastElement = list[list.length - 1].split("");
            if (lastElement[lastElement.length - 1] != "(") {
              dispatch(addDisplayEquationElement("+"));
              dispatch(addEquationElement("+"));
            }
          }}
        />
      </div>
    </div>
  );
};

const CalculatorScreen = () => {
  const displayEquation = useSelector((store) => store.displayEquation);
  const mode = useSelector((store) => store.mode);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
  }, [displayEquation]);

  return (
    <div>
      <div
        ref={scrollRef}
        className={
          (mode == "light"
            ? "bg-gray-900 border-stone-100 "
            : "bg-stone-100 border-stone-900 ") +
          " font-mono overflow-x-auto text-right text-2xl" +
          "border-2 p-5 mb-5 rounded-2xl mx-1 "
        }
      >
        <span className={mode == "light" ? "text-white" : "text-black"}>
          {displayEquation.join("")}
        </span>
        <span className="text-gray-400">
          {getBalanceParentheses(displayEquation)}
        </span>
      </div>
    </div>
  );
};

const SimpleCalculator = () => {
  return (
    <div className="max-w-sm sm:max-w-sm md:max-w-md lg:max-w-lg">
      <CalculatorScreen />
      <CalculatorKeypad />
    </div>
  );
};

export default SimpleCalculator;
