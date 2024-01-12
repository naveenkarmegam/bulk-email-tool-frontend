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
    setLoading: (state) => {
      state.loading = true;
    },
    logInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileSucess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    logOutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  setLoading,
  logInSuccess,
  setError,
  updateProfileSucess,
  logOutSuccess,
} = userSlice.actions;

export default userSlice.reducer;
