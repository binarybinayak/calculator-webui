import { createSlice } from "@reduxjs/toolkit";

const modeSlice = createSlice({
  name: "mode",
  initialState: "light",
  reducers: {
    toggleMode: (state) => {
      return state === "light" ? "dark" : "light";
    },
  },
});

export default modeSlice.reducer;

export const { toggleMode } = modeSlice.actions;
