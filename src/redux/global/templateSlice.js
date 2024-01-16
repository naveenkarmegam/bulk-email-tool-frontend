import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const fetchTemplates = createAsyncThunk('templates/fetchTemplates',async()=>{
    try {
        const response = await axios.get('/api/get-all-templates')
        return response.data
    } catch (error) {
        return error.response.data
    }
})
const initialState = {
    templates:[],
    loading:false,
    error:false
}

const templateSlice = createSlice({
    name:'templates',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchTemplates.pending,(state,actions)=>{
            state.loading = true
        })
        .addCase(fetchTemplates.fulfilled,(state,actions)=>{
            state.loading = false
            state.loading = actions.payload
        })
        .addCase(fetchTemplates.pending,(state,actions)=>{
            state.loading = false
            state.error = actions.payload.message
        })
        
    }
})