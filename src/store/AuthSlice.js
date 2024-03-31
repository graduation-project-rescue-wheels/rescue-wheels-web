import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showErrorToast, showSuccessToast } from './../components/toast';

// &----------------------------------------- Login --------------------------------------------

export const HandelLogin = createAsyncThunk(
  "auth/handleLogin",
  async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/signIn",
        formData,
        
      );

      console.log("Login successful:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error during login:", error);

      // Returning the error object directly is better than returning error.response
      // It provides more detailed error information to the caller
      return error.response || { error: "An error occurred" };
    }
  }
);
// &-------------------------------------------------------------------------------------

// &-----------------------------------------Register--------------------------------------------

export const HandelRegister = createAsyncThunk(
  "Auth/HandelRegister",
  async (formData) => {
    console.log(formData);
    let body = formData;
    try {
      const response = await axios.post(
        "http://localhost:3000/user/signUp",
        body
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error occurred during registration:", error.response.data);
      return error.response.data;
    }
  }
);

// &-------------------------------------------------------------------------------------

// &-----------------------------------------Update Info--------------------------------------------

export const UpdateUser = createAsyncThunk(
  "user/updateUserAsync",
  async (formData) => {
    let body = formData;
    const accessToken = await localStorage.getItem("Token");
    try {
      const response = await axios.put(
        "http://localhost:3000/user/UpdateUserData",
        body,
        {
          headers: {
            accesstoken: "prefixToken_" + accessToken,
          },
        }
      );

      if (response.status === 200) {
        showSuccessToast(response.data.message);
      }

      return response.data;
    } catch (error) {
      if (error.response.status === 400) {
        showErrorToast(error.response.data.errorMessage);
      } else {
        showErrorToast(error.response.data.message);
      }
      return error.response.data;
    }
  }
);
// &-------------------------------------------------------------------------------------

// &-----------------------------------------Update Password--------------------------------------------

export const UpdatePassword = createAsyncThunk(
  "user/updatePasswordAsync",
  async (formData) => {
    let body = formData;
    const accessToken = await localStorage.getItem("Token");
    try {
      const response = await axios.put(
        "http://localhost:3000/user/UpdatePassword",
        body,
        {
          headers: {
            accesstoken: "prefixToken_" + accessToken,
          },
        }
      );

      if (response.status === 200) {
        showSuccessToast(response.data.message);
      }

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

// &-----------------------------------------get user data--------------------------------------------

export const getUserData = createAsyncThunk(
  "user/getUserDataAsync",
  async () => {
    const accessToken = await localStorage.getItem("Token");
    try {
      const response = await axios.get(
        "http://localhost:3000/user/getUserData",
        {
          headers: {
            accesstoken: "prefixToken_" + accessToken,
          },
        }
      );

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

// &-----------------------------------------add vehicle--------------------------------------------

export const addVehicle = createAsyncThunk(
  "user/addVehicleAsync",
  async (formData) => {
    let body = formData;
    console.log(body);
    const accessToken = await localStorage.getItem("Token");
    try {
      const response = await axios.post(
        "http://localhost:3000/user/addVehicle",
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

// &-----------------------------------------get vehicle--------------------------------------------

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


// &-----------------------------------------get vehicle--------------------------------------------

export const VerifyAccount = createAsyncThunk(
  "Auth/VerifyAccount",
  async (formData) => {
    try {
      console.log(formData);
      const response = await axios.post(
        `http://localhost:3000/user/verifyEmail`,formData
        
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);

      // Returning the error object directly is better than returning error.response
      // It provides more detailed error information to the caller
      return error.response || { error: "An error occurred" };
    
    }
  }
);
let AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    UserData: [],
    VerifyData:[]
  },
  reducers: {},
  extraReducers: (builder) => {
    // ^ Login
    builder.addCase(HandelLogin.fulfilled, (state, action) => {
      state.UserData = action.payload.userData;
      console.log(action.payload.userData);
    });
    builder.addCase(HandelLogin.rejected, (state, action) => {
      state.UserData = action.payload.userData;
      console.log(action.payload);
    });

    // ^ Register
    builder.addCase(HandelRegister.fulfilled, (state, action) => {
      state.UserData = action.payload.userData;
      console.log(action.payload.userData);
    });
    builder.addCase(HandelRegister.rejected, (state, action) => {
      state.UserData = action.payload.userData;
      console.log(action.payload.userData);
    });

    // ^ UpdateUser
    builder.addCase(UpdateUser.fulfilled, (state, action) => {
      if (action.payload.isValid) {
        state.UserData = action.payload.data;
        console.log(action.payload);
      }
    });

    // ^ UpdatePassword
    builder.addCase(UpdatePassword.fulfilled, (state, action) => {
      if (action.payload.isValid) {
        state.UserData = action.payload.data;
        console.log(action.payload.data);
      }
    });

    // ^ GetUserData
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.UserData = action.payload.data;
      console.log(action.payload.data);
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


    //^ VerifyAccount
    builder.addCase(VerifyAccount.fulfilled, (state, action) => {
      state.VerifyData = action.payload.data;
      console.log(action.payload.data);
    });
  },
});
export default AuthSlice.reducer;
