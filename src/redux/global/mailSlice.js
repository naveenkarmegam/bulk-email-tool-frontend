import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  error: false,
};
const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    sendMailStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    sendMailSuccess: (state, action) => {
      const { message } = action.payload;
      state.success = message;
      state.loading = false;
      state.error = false;
    },
    sendMailFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { sendMailStart, sendMailSuccess, sendMailFailure } =
  mailSlice.actions;
export default mailSlice.reducer;
