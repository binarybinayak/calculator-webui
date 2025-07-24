import { configureStore } from "@reduxjs/toolkit";
import modeSlice from "./slices/modeSlice";
import equationSlice from "./slices/equationSlice";
import displayEquationSlice from "./slices/displayEquationSlice";
import calculatorTypeSlice from "./slices/CalculatorTypeSlice";

const store = configureStore({
  reducer: {
    mode: modeSlice,
    equation: equationSlice,
    displayEquation: displayEquationSlice,
    calculatorType: calculatorTypeSlice,
  },
});

export default store;
