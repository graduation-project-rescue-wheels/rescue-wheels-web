import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../components/toast";

export const AddRequest = createAsyncThunk("Emergency/AddRequest", async () => {
  try {
    const response = await axios.post();

    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

// & ======================= Get All Emergency Requests =======================
export const getAllRequests = createAsyncThunk(
  "Emergency/getAllRequests",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/emrgencyRequest/getAllRequests",
        {
          headers: {
            accessToken: "prefixToken_" + localStorage.getItem("Token"),
          },
        }
      );
      console.log("All Emergency Requests:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error :", error);
      return error.response || { error: "An error occurred" };
    }
  }
);

// & ======================= Get All Emergency Requests =======================
export const cancelRequest = createAsyncThunk(
  "Emergency/cancelRequest",
  async (id) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/emrgencyRequest/cancelRequest",
        id,
        {
          headers: {
            accessToken: "prefixToken_" + localStorage.getItem("Token"),
          },
        }
      );

      if (response.status === 200) {
        showSuccessToast("Request Cancelled Successfully");
      }

      console.log("Emergency Request Cancelled:", response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 400) {
        showErrorToast(error.response.data.errorMessage);
      } else {
        showErrorToast(error.response.data.errMsg);
      }
      return error.response || { error: "An error occurred" };
    }
  }
);

let EmergencySlice = createSlice({
  name: "Emergency",
  initialState: {
    EmergencyRequestData: [],
    AllEmergencyRequests: [],
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllRequests.fulfilled, (state, action) => {
      state.AllEmergencyRequests = action.payload.data;
      console.log(action.payload);
    });

    builder.addCase(cancelRequest.fulfilled, (state, action) => {
      console.log(action.payload);
    });
  },
});

export default EmergencySlice.reducer;
