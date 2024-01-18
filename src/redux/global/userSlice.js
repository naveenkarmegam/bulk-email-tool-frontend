import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logInStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    logInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    logInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    updateProfileSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    updateProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logOutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    clearMessages: (state, action) => {
      state.error = false;
      state.success = false;
      state.loading = false;
    },
  },
});

export const {
  logInStart,
  logInSuccess,
  logInFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  logOutSuccess,
  clearMessages,
} = userSlice.actions;

export default userSlice.reducer;
