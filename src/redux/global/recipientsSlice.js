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

export const fetchRecipientById = createAsyncThunk(
  "recipient/fetchRecipientById",
  async (recipientId) => {
    try {
      const response = await axios.get(`/api/recipient/get-recipient/${recipientId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error.response.data; // Rethrow the error to be caught by the rejected action
    }
  }
);

export const updateRecipient = createAsyncThunk(
  "recipient/updateRecipient",
  async ( recipientId, updatedData ) => {
    try {
      const response = await axios.patch(`/api/recipient/update-recipient/${recipientId}`, updatedData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error.response.data;
    }
  }
);

export const deleteRecipient = createAsyncThunk(
  "recipient/deleteRecipient",
  async (recipientId) => {
    try {
      await axios.delete(`/api/recipient/${recipientId}`);
      return recipientId; 
    } catch (error) {
      console.log(error);
      throw error.response.data;
    }
  }
);

const initialState = {
  recipients: [],
  status: "idle",
  error: false,
  selectedRecipient: null,
};
const recipientsSlice = createSlice({
  name: "recipients",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRecipient.pending, (state, action) => {
        state.status === "loading";
      })
      .addCase(fetchRecipient.fulfilled, (state, action) => {
        state.status === "succeeded";
        state.recipients = action.payload;
      })
      .addCase(fetchRecipient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchRecipientById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchRecipientById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedRecipient = action.payload;
      })
      .addCase(fetchRecipientById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateRecipient.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateRecipient.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update the specific recipient in the array
        state.recipients = state.recipients.map((recipient) =>
          recipient._id === action.payload._id ? action.payload : recipient
        );
      })
      .addCase(updateRecipient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteRecipient.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteRecipient.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Remove the deleted recipient from the array
        state.recipients = state.recipients.filter(
          (recipient) => recipient._id !== action.payload
        );
      })
      .addCase(deleteRecipient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export default recipientsSlice.reducer