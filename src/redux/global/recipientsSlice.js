import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRecipient = createAsyncThunk(
  "recipient/fetchRecipient",
  async () => {
    try {
      const response = await axios.get("/api/recipient/all-recipients");
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);
const initialState = {
  recipients: [],
  loading: false,
  error: false,
  recipientsEmail: [],
};
const recipientsSlice = createSlice({
  name: "recipients",
  initialState,
  reducers: {
    addRecipientStart: (state) => {
      state.loading = true;
    },
    addRecipientSuccess: (state, action) => {
      state.loading = false;
      const { recipient } = action.payload;
      state.recipients = [...state.recipients, recipient];
    },
    addRecipientFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateRecipientStart: (state) => {
      state.loading = true;
    },
    updateRecipientSuccess: (state, action) => {
      const { updatedRecipient } = action.payload;
      const index = state.recipients.findIndex(
        (recipient) => recipient._id === updatedRecipient._id
      );
      if (index !== -1) {
        state.recipients[index] = updatedRecipient;
      }
      state.loading = false;
    },
    updateRecipientFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteRecipientStart: (state) => {
      state.loading = true;
    },
    deleteRecipientSuccess: (state, action) => {
      const { deletedRecipient } = action.payload;
      console.log(action.payload);
      state.recipients = state.recipients.filter(
        (recipient) => recipient._id !== deletedRecipient._id
      );
      state.loading = false;
    },
    deleteRecipientFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedRecipientEmail: (state, action) => {
      state.recipientsEmail = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRecipient.pending, (state) => {
        state.loading === true;
      })
      .addCase(fetchRecipient.fulfilled, (state, action) => {
        state.loading === false;
        state.recipients = action.payload;
      })
      .addCase(fetchRecipient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  addRecipientStart,
  addRecipientSuccess,
  addRecipientFailure,
  updateRecipientFailure,
  updateRecipientStart,
  updateRecipientSuccess,
  deleteRecipientFailure,
  deleteRecipientStart,
  deleteRecipientSuccess,
  setSelectedRecipientEmail,
} = recipientsSlice.actions;
export default recipientsSlice.reducer;
