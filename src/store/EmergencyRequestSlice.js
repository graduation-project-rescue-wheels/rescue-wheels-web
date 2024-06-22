import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../components/toast";

// & ======================= AddRequest =======================
export const AddRequest = createAsyncThunk(
  "EmergencyRequest/AddRequest",
  async (formData) => {
    try {
      const body = formData;
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/emrgencyRequest/addRequest`,
        body,
        {
          headers: {
            accesstoken: "prefixToken_" + localStorage.getItem("Token"),
          },
        }
      );
      console.log("All Repair Centers:", response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 400) {
        showErrorToast(error.response.data.errorMessage);
      } else {
        showErrorToast(error.response.data.message);
      }
      return error.response || { error: "An error occurred" };
    }
  }
);

// & ======================= AddRequest =======================
export const getNearByRequests = createAsyncThunk(
  "EmergencyRequest/getNearByRequests",
  async ({ long, lat }) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/emrgencyRequest/nearbyRequests/${long}/${lat}`,
        {
          headers: {
            accesstoken: "prefixToken_" + localStorage.getItem("Token"),
          },
        }
      );
      console.log("All Requests :", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during Send:", error);
      return error.response || { error: "An error occurred" };
    }
  }
);

// & ======================= AddRequest =======================
export const acceptRequest = createAsyncThunk(
  "EmergencyRequest/acceptRequest",
  async (formdata) => {
    const body = formdata;
    console.log("Bodt", body);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/emrgencyRequest/acceptRequest/`,
        body,
        {
          headers: {
            accesstoken: "prefixToken_" + localStorage.getItem("Token"),
          },
        }
      );
      console.log("All Requests :", response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 400) {
        showErrorToast(error.response.data.errorMessage);
      } else {
        showErrorToast(error.response.data.message);
      }
      return error.response || { error: "An error occurred" };
    }
  }
);

// & ======================= Get All Emergency Requests =======================
export const getAllRequests = createAsyncThunk(
  "Emergency/getAllRequests",
  async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/emrgencyRequest/getAllRequests`,
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
        `${import.meta.env.VITE_SERVER_URL}/emrgencyRequest/cancelRequest`,
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
// & ======================= Get All Emergency Requests =======================
export const cancelResponder = createAsyncThunk(
  "Emergency/cancelResponder",
  async (formdata) => {
    const body = formdata;
    console.log(body);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/emrgencyRequest/cancelResponder`,
        body,
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
// & =======================Get Request By ID =======================
export const GetRequestById = createAsyncThunk(
  "EmergencyRequest/GetRequestById",
  async (id) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/emrgencyRequest/getRequestById/${id}`,
        {
          headers: {
            accesstoken: "prefixToken_" + localStorage.getItem("Token"),
          },
        }
      );
      console.log("All Requests :", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during Send:", error);
      return error.response || { error: "An error occurred" };
    }
  }
);

// & ======================== Cancle Request ============================
export const CancleRequest = createAsyncThunk(
  "EmergencyRequest/CancleRequest",
  async (formdata) => {
    const body = formdata;
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/emrgencyRequest/cancelRequest/`,
        body,
        {
          headers: {
            accesstoken: "prefixToken_" + localStorage.getItem("Token"),
          },
        }
      );
      console.log("All Requests :", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during Send:", error);
      return error.response || { error: "An error occurred" };
    }
  }
);
let EmergencyRequestSlice = createSlice({
  name: "EmergencyRequest",
  initialState: {
    AddRequestData: [],
    getNearByRequestsData: [],
    acceptRequestData: [],
    AllEmergencyRequests: [],
    cancleRequestData: [],
    GetRequestByIdData: [],
    AcceptRequestData: [],
    cancelResponderData: [],
  },
  extraReducers: (builder) => {
    // ^ GetAllVehicles
    builder.addCase(AddRequest.fulfilled, (state, action) => {
      state.AddRequestData = action.payload;
      console.log(action.payload);
    });
    builder.addCase(AddRequest.rejected, (state, action) => {
      state.AddRequestData = action.payload;
      console.log(action.payload);
    });
    //^ getNearByRequests
    builder.addCase(getNearByRequests.fulfilled, (state, action) => {
      state.getNearByRequestsData = action.payload;
      console.log(action.payload);
    });
    builder.addCase(getNearByRequests.rejected, (state, action) => {
      state.getNearByRequestsData = action.payload;
      console.log(action.payload);
    });

    //^ GetRequestById
    builder.addCase(GetRequestById.fulfilled, (state, action) => {
      state.GetRequestByIdData = action.payload;
      console.log(action.payload);
    });
    builder.addCase(GetRequestById.rejected, (state, action) => {
      state.GetRequestByIdData = action.payload;
      console.log(action.payload);
    });
    // ^ Cancle request
    builder.addCase(CancleRequest.fulfilled, (state, action) => {
      state.cancleRequestData = action.payload;
      console.log(action.payload);
    });
    builder.addCase(CancleRequest.rejected, (state, action) => {
      state.cancleRequestData = action.payload;
      console.log(action.payload);
    });

    // ^ accept request
    builder.addCase(acceptRequest.fulfilled, (state, action) => {
      state.acceptRequestData = action.payload;
      console.log(action.payload);
    });
    builder.addCase(acceptRequest.rejected, (state, action) => {
      state.acceptRequestData = action.payload;
      console.log(action.payload);
    });

    // ^ get all requests
    builder.addCase(getAllRequests.fulfilled, (state, action) => {
      state.AllEmergencyRequests = action.payload.data;
      console.log(action.payload);
    });

    // ^cancelResponder
    builder.addCase(cancelResponder.fulfilled, (state, action) => {
      state.cancelResponderData = action.payload;
      console.log(action.payload);
    });
    builder.addCase(cancelResponder.rejected, (state, action) => {
      state.cancelResponderData = action.payload;
      console.log(action.payload);
    });
  },
});

export default EmergencyRequestSlice.reducer;
