import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const AddRequest= createAsyncThunk(
    "Emergency/AddRequest",
    async()=>{
        try{
        const response = await axios.post()

            return response.data;
        }catch(error){
            return error.response.data;

        }
    }
)

let EmergencySlice = createSlice({
    name:"Emergency",
    initialState:{
        EmergencyRequestData:[],
    },

    reducers:{},
    extraReducers:()=>{

    }
})

export default EmergencySlice.reducer