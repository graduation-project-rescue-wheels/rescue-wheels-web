import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../components/toast";
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

// &-----------------------------------------add vehicle--------------------------------------------

export const addVehicle = createAsyncThunk(
  "user/addVehicleAsync",
  async (formData) => {
    let body = formData;
    console.log(body);
    const accessToken = await localStorage.getItem("Token");
    try {
      const response = await axios.post(
        "http://localhost:3000/vehicle/addVehicle",
        body,
        {
          headers: {
            accesstoken: "prefixToken_" + accessToken,
          },
        }
      );

      if (response.status === 201) {
        showSuccessToast(response.data.message);
      }

      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 400) {
        showErrorToast(error.response.data.errorMessage);
      } else {
        showErrorToast(error.response.data.errMsg);
      }
      return error.response.data;
    }
  }
);

// &-------------------------------------------------------------------------------------

// &-----------------------------------------get vehicle--------------------------------------------

export const getVehicleById = createAsyncThunk(
  "vehicle/getVehicleByIdAsync",
  async (id) => {
    const accessToken = await localStorage.getItem("Token");
    try {
      const response = await axios.get(
        `http://localhost:3000/vehicle/getVehicleById/${id}`,
        {
          headers: {
            accesstoken: "prefixToken_" + accessToken,
          },
        }
      );

      if (response.status === 201) {
        showSuccessToast(response.data.message);
      }

      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 400) {
        showErrorToast(error.response.data.errorMessage);
      } else {
        showErrorToast(error.response.data.errMsg);
      }
      return error.response.data;
    }
  }
);

// &-------------------------------------------------------------------------------------

// &-----------------------------------------delete vehicle--------------------------------------------

export const deleteVehicle = createAsyncThunk(
  "vehicle/deleteVehicleAsync",
  async (id) => {
    const accessToken = await localStorage.getItem("Token");
    try {
      const response = await axios.delete(
        `http://localhost:3000/vehicle/deleteVehicle/${id}`,
        {
          headers: {
            accesstoken: "prefixToken_" + accessToken,
          },
        }
      );

      if (response.status === 200) {
        showSuccessToast(response.data.message);
      }

      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 400) {
        showErrorToast(error.response.data.errorMessage);
      } else {
        showErrorToast(error.response.data.errMsg);
      }
      return error.response.data;
    }
  }
);



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
// ^ AddVehicle
builder.addCase(addVehicle.fulfilled, (state, action) => {
    state.user = action.payload.user;
    console.log(action.payload.user);
  });

  builder.addCase(addVehicle.rejected,(state,action)=>{
    console.log(action.payload);

})
  // ^ DeleteVehicle
  builder.addCase(deleteVehicle.fulfilled, (state, action) => {
    state.user = action.payload.user;
    console.log(action.payload.user);
  });

  builder.addCase(deleteVehicle.rejected,(state,action)=>{
    console.log(action.payload);
});
  // ^ AddVehicle
  builder.addCase(addVehicle.fulfilled, (state, action) => {
    state.user = action.payload.user;
    console.log(action.payload.user);
  });

  // ^ DeleteVehicle
  builder.addCase(deleteVehicle.fulfilled, (state, action) => {
    state.user = action.payload.user;
    console.log(action.payload.user);
  });


    }
})


export default VehicleSlice.reducer