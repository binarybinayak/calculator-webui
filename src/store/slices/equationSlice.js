import { createSlice } from "@reduxjs/toolkit";

const equationSlice = createSlice({
  name: "equation",
  initialState: ["0"],
  reducers: {
    clearEquation: () => [],
    addEquationElement: (state, actions) => {
      state.push(actions.payload);
      return state;
    },
    removeEquationElement: (state) => {
      state.pop();
      return state;
    },
  },
});

export const { clearEquation, addEquationElement, removeEquationElement } =
  equationSlice.actions;
export default equationSlice.reducer;
