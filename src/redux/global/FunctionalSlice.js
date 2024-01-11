import { createSlice } from "@reduxjs/toolkit";

export const FunctionalSlice = createSlice({
  name: "funactionality",
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
  sideBarToggle,
  setSideBarToggle,
  setGreetings,
} = FunctionalSlice.actions;


export default FunctionalSlice.reducer;
