import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// & ======================= AddRepairCenter =======================
export const AddRepairCenter = createAsyncThunk(
    "RepairCenter/AddRepairCenter",
    async(formData)=>{
        try{
             const response = await axios.post("http://localhost:3000/RepairCenter/AddRepairCenter",formData,null)
             console.log("repair Center Added successful:",response.data)
             return response.data
        }catch(error){
            console.error('Error during login:', error);
            return error.response || { error: 'An error occurred' };
        }
    }
)

// & ======================= Get All RepairCenters =======================
export const GetAllRepairCenters = createAsyncThunk(
    "RepairCenter/GetAllRepairCenters",
    async()=>{
        try{
             const response = await axios.get("http://localhost:3000/RepairCenter/GetAllRepairCenters",{
                    headers:{
                        accesstoken:"prefixToken_"+localStorage.getItem("Token")
                    }
             })
             console.log("All Repair Centers:",response.data)
             return response.data
        }catch(error){
            console.error('Error during login:', error);
            return error.response || { error: 'An error occurred' };
        }
    }
)

// & ======================= Get spacific RepairCenter =======================
export const GetspacificepairCenter = createAsyncThunk(
    "RepairCenter/GetspacificepairCenter",
    async(id)=>{
        try{
             const response = await axios.get(`http://localhost:3000/RepairCenter/GetSingleRepairCenter/${id}`,{
                    headers:{
                        accesstoken:"prefixToken_"+localStorage.getItem("Token")
                    }
             })
             console.log("All Repair Centers:",response.data)
             return response.data
        }catch(error){
            console.error('Error during login:', error);
            return error.response || { error: 'An error occurred' };
        }
    }
)
let RepairCenterSlice = createSlice({
    name:"RepairCenter",
    initialState:{
        AddRepaircenterData:[],
        AllRepaircentersData:[],
        GetspacificepairCenterData:[]
    },
    extraReducers:(builder)=>{
        // ^ AddRepairCenter
        builder.addCase(AddRepairCenter.fulfilled,(state,action)=>{
            state.AddRepaircenterData=action.payload   
            console.log(action.payload);
        })
        builder.addCase(AddRepairCenter.rejected,(state,action)=>{
            state.AddRepaircenterData = action.payload
            console.log(action.payload);
    
        })

        // ^ GetAllRepairCenters
        builder.addCase(GetAllRepairCenters.fulfilled,(state,action)=>{
            state.AllRepaircentersData=action.payload   
            console.log(action.payload);
        })
        builder.addCase(GetAllRepairCenters.rejected,(state,action)=>{
            state.AllRepaircentersData = action.payload
            console.log(action.payload);
    
        })

        //^GetspacificepairCenter

        builder.addCase(GetspacificepairCenter.fulfilled,(state,action)=>{
            state.GetspacificepairCenterData=action.payload   
            console.log(action.payload);
        })
        builder.addCase(GetspacificepairCenter.rejected,(state,action)=>{
            state.GetspacificepairCenterData = action.payload
            console.log(action.payload);
    
        })
    }
})


export default RepairCenterSlice.reducer