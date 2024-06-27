import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../components/toast";

// & ======================= AddRepairCenter =======================
export const AddRepairCenter = createAsyncThunk(
  "RepairCenter/AddRepairCenter",
  async (formData) => {
    const body = formData;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/RepairCenter/AddRepairCenter`,
        body,
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

// & ======================= Get All Offers =======================
export const GetAllOffers = createAsyncThunk(
  "RepairCenter/GetAllOffers",
  async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/Offer/getAllOffer`
      );
      console.log("All Repair Centers:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      return error.response || { error: "An error occurred" };
    }
  }
);
// & ======================= Get All RepairCenters =======================
export const GetAllRepairCenters = createAsyncThunk(
  "RepairCenter/GetAllRepairCenters",
  async (formData) => {
    console.log(formData.filters);
    console.log(formData.sortedBy);
    console.log(formData.isAscending);
    console.log(formData.coords);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/RepairCenter/GetAllRepairCenters/${JSON.stringify(
          formData.filters
        )}/${formData.sortedBy}/${formData.isAscending}/${JSON.stringify(formData.coords)}`,
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
        `${
          import.meta.env.VITE_SERVER_URL
        }/RepairCenter/GetSingleRepairCenter/${id}`,
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
        `${
          import.meta.env.VITE_SERVER_URL
        }/RepairCenter/DeleteRepairCenterById/${id}`,
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
    //^GetAllOffers
    builder.addCase(GetAllOffers.fulfilled, (state, action) => {
      state.GetspacificepairCenterData = action.payload;
      console.log(action.payload);
    });
    builder.addCase(GetAllOffers.rejected, (state, action) => {
      state.GetspacificepairCenterData = action.payload;
      console.log(action.payload);
    });
    
    
        
  },
});

export default RepairCenterSlice.reducer;
