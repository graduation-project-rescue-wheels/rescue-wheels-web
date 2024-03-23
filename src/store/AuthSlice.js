import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// &----------------------------------------- Login --------------------------------------------

export const HandelLogin = createAsyncThunk(
  "auth/handleLogin",
  async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/signIn",
        formData,
        null
      );

      console.log('Login successful:', response.data);

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

      console.log(response);
      return response;
    } catch (error) {
      console.error("Error occurred during registration:", error.response.data);
      return error.response.data;
    }
  }
);


let AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    UserData: [],
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
      console.log(action.payload.userData);
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
  }
});
export default AuthSlice.reducer;
