import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../components/toast";

// & ======================= AddRepairCenter =======================
export const AddRepairCenter = createAsyncThunk(
  "RepairCenter/AddRepairCenter",
  async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/RepairCenter/AddRepairCenter",
        formData, 
        {
          headers: {
            accessToken: "prefixToken_" + localStorage.getItem("Token"),
          },
        }
      );

      if (response.status === 201) {
        showSuccessToast(response.data.message);
      }

      console.log("repair Center Added successful:", response.data);
      return response.data;
    } catch (error) {

      if (error.response.status === 400) {
        showErrorToast(error.response.data.message);
      } else {
        showErrorToast(error.response.data.errMsg);
      }
      
      console.error("Error during login:", error);
      return error.response || { error: "An error occurred" };
    }
  }
);

// & ======================= Get All RepairCenters =======================
export const GetAllRepairCenters = createAsyncThunk(
  "RepairCenter/GetAllRepairCenters",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/RepairCenter/GetAllRepairCenters",
        {
          headers: {
            accesstoken: "prefixToken_" + localStorage.getItem("Token"),
          },
        }
      );
      console.log("All Repair Centers:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      return error.response || { error: "An error occurred" };
    }
  }
);

// & ======================= Get spacific RepairCenter =======================
export const GetspacificepairCenter = createAsyncThunk(
  "RepairCenter/GetspacificepairCenter",
  async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/RepairCenter/GetSingleRepairCenter/${id}`,
        {
          headers: {
            accesstoken: "prefixToken_" + localStorage.getItem("Token"),
          },
        }
      );
      console.log("Repair Center ", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      return error.response || { error: "An error occurred" };
    }
  }
);

// & ======================= Delete spacific RepairCenter =======================
export const deleteRepairCenterById = createAsyncThunk(
  "user/DeleteRepairCenterById",
  async (id) => {
    const accessToken = await localStorage.getItem("Token");
    try {
      const response = await axios.delete(
        `http://localhost:3000/RepairCenter/DeleteRepairCenterById/${id}`,
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

let RepairCenterSlice = createSlice({
  name: "RepairCenter",
  initialState: {
    AddRepaircenterData: [],
    AllRepaircentersData: [],
    GetspacificepairCenterData: [],
  },
  extraReducers: (builder) => {
    // ^ AddRepairCenter
    builder.addCase(AddRepairCenter.fulfilled, (state, action) => {
      state.AddRepaircenterData = action.payload;
      console.log(action.payload);
    });
    builder.addCase(AddRepairCenter.rejected, (state, action) => {
      state.AddRepaircenterData = action.payload;
      console.log(action.payload);
    });

    // ^ GetAllRepairCenters
    builder.addCase(GetAllRepairCenters.fulfilled, (state, action) => {
      state.AllRepaircentersData = action.payload;
      console.log(action.payload);
    });

    //^GetspacificepairCenter

    builder.addCase(GetspacificepairCenter.fulfilled, (state, action) => {
      state.GetspacificepairCenterData = action.payload;
      console.log(action.payload);
    });
    builder.addCase(GetspacificepairCenter.rejected, (state, action) => {
      state.GetspacificepairCenterData = action.payload;
      console.log(action.payload);
    });
  },
});

export default RepairCenterSlice.reducer;
