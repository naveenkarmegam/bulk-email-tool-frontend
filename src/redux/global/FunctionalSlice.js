import { createSlice } from "@reduxjs/toolkit";

export const functionalSlice = createSlice({
  name: "functionality",
  initialState: {
    sideBarToggle: true,
    greetings: "",
  },
  reducers: {
    setSideBarToggle: (state, action) => {
      state.sideBarToggle = action.payload;
      return state;
    },
    setGreetings: (state, action) => {
      state.greetings = action.payload;
      return state;
    }
  },
 
});

export const {
  setSideBarToggle,
  setGreetings,
} = functionalSlice.actions;


export default functionalSlice.reducer;
