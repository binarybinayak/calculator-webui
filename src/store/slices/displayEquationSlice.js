import { createSlice } from "@reduxjs/toolkit";

const displayEquationSlice = createSlice({
  name: "displayEquation",
  initialState: ["0"],
  reducers: {
    clearDisplayEquation: () => [],
    addDisplayEquationElement: (state, actions) => {
      state.push(actions.payload);
      return state;
    },
    removeDisplayEquationElement: (state) => {
      state.pop();
      return state;
    },
  },
});

export const {
  clearDisplayEquation,
  addDisplayEquationElement,
  removeDisplayEquationElement,
} = displayEquationSlice.actions;
export default displayEquationSlice.reducer;
