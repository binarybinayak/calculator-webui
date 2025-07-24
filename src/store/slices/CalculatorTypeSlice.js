import { createSlice } from "@reduxjs/toolkit";

export const calculatorTypes = ["Simple Calculator"];

const calculatorTypeSlice = createSlice({
  name: "CalculatorType",
  initialState: "Simple Calculator",
  reducers: {
    switchCalculator: (state, actions) => {
      if (calculatorTypes.includes(actions.payload)) {
        return actions.payload;
      }
    },
  },
});

export const { switchCalculator } = calculatorTypeSlice.actions;
export default calculatorTypeSlice.reducer;
