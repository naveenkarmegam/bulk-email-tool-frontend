import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTemplates = createAsyncThunk(
  "templates/fetchTemplates",
  async () => {
    try {
      const response = await axios.get("/api/template/get-template-by-user");
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
const initialState = {
  templates: [],
  loading: false,
  error: false,
};

const templateSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemplates.pending, (state, actions) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchTemplates.fulfilled, (state, actions) => {
        state.loading = false;
        state.error = false;
        state.templates = actions.payload;
      })
      .addCase(fetchTemplates.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.error.message;
      });
  },
});

export default templateSlice.reducer