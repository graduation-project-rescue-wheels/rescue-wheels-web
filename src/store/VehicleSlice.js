import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// & ======================= Get All Vehicles =======================
export const GetAllVehicles = createAsyncThunk(
    "Vehicle/GetAllVehicles",
    async()=>{
        try{
             const response = await axios.get("http://localhost:3000/vehicle/GetAllvehicleForLoginUser",{
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

let VehicleSlice = createSlice({
    name:"Vehicle",
    initialState:{
        AddVehicleData:[],
        AllVehiclesData:[],
        GetspacificepairCenterData:[]
    },
    extraReducers:(builder)=>{
        // ^ GetAllVehicles
        builder.addCase(GetAllVehicles.fulfilled,(state,action)=>{
            state.AllVehiclesData=action.payload   
            console.log(action.payload);
        })
        builder.addCase(GetAllVehicles.rejected,(state,action)=>{
            state.AllVehiclesData = action.payload
            console.log(action.payload);
    
        })

    }
})


export default VehicleSlice.reducer