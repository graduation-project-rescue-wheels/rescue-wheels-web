import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "./../components/toast";

// &----------------------------------------- Login --------------------------------------------

export const HandelLogin = createAsyncThunk(
  "Auth/handleLogin",
  async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/user/signIn`,
        formData
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
        `${import.meta.env.VITE_SERVER_URL}/user/signUp`,
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

export const HandelsignUpAsEmergencyTech = createAsyncThunk(
  "Auth/HandelsignUpAsEmergencyTech",
  async (formData) => {
    console.log(formData);
    let body = formData;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/user/signUpAsEmergencyTech`,
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



export const HandelResendEmailToVerify = createAsyncThunk(
  "Auth/HandelResendEmailToVerify",
  async (formData) => {
    console.log(formData);
    let body = formData;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/user/ResendEmailToVerify`,
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



// &---------------------------------------------HandelVerifyEmail----------------------------------------

export const HandelVerifyEmail = createAsyncThunk(
  "auth/handelVerifyEmail",
  async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/user/verifyEmail`,
        formData
      );

      return response.data;
    } catch (error) {
      console.error("Error occurred during email verification:", error.response.data);
      return error.response.data;
    }
  }
);
// &-----------------------------------------Update Info--------------------------------------------

export const UpdateUser = createAsyncThunk(
  "Auth/updateUserAsync",
  async (formData) => {
    let body = formData;
    const accessToken = await localStorage.getItem("Token");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/user/UpdateUserData`,
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
  "Auth/UpdatePassword",
  async (formData) => {
    let body = formData;
    const accessToken = await localStorage.getItem("Token");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/user/UpdatePassword`,
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
export const HandelForgetPassword = createAsyncThunk(
  "auth/handelForgetPassword",
  async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/user/forgetPassword`,
        formData
      );

      return response.data;
    } catch (error) {
      console.error("Error occurred during password reset:", error.response.data);
      return error.response.data;
    }
  }
);

// &----------------------------------------- OTP --------------------------------------------

export const HandelOTP = createAsyncThunk(
  "auth/handelOTP",
  async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/user/otpverification`,
        formData
      );

      return response.data;
    } catch (error) {
      console.error("Error occurred during OTP verification:", error.response.data);
      return error.response.data;
    }
  }
);

// &----------------------------------------- Reset Password --------------------------------------------

export const HandelResetPassword = createAsyncThunk(
  "auth/handelResetPassword",
  async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/user/ResetPassword`,
        formData
      );

      return response.data;
    } catch (error) {
      console.error("Error occurred during password reset:", error.response.data);
      return error.response.data;
    }
  }
);
// &-------------------------------------------------------------------------------------

// &-----------------------------------------get user data--------------------------------------------

export const getUserData = createAsyncThunk(
  "Auth/getUserData",
  async () => {
    const accessToken = await localStorage.getItem("Token");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/user/getUserData`,
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

export const DeleteUserById = createAsyncThunk(
  "Auth/DeleteUserById",
  async (id) => {
    const accessToken = await localStorage.getItem("Token");
    try {
      const response = await axios.delete(
        `http://localhost:3000/user/DeleteUserById/${id}`,
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



// & ======================= Get All Users =======================
export const GetAllUsers = createAsyncThunk(
  "Auth/GetAllUsers",
  async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/user/GetAllUsers`,
        {
          headers: {
            accesstoken: "prefixToken_" + localStorage.getItem("Token"),
          },
        }
      );
      console.log("All Users:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      return error.response || { error: "An error occurred" };
    }
  }
);

// &-----------------------------------------VerifyAccount--------------------------------------------

export const VerifyAccount = createAsyncThunk(
  "Auth/VerifyAccount",
  async (formData) => {
    try {
      console.log(formData);
      const response = await axios.post(
        `http://localhost:3000/user/verifyEmail`,
        formData
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
    VerifyData: [],
    AllUsers: []
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

// ^ Register
builder.addCase(HandelsignUpAsEmergencyTech.fulfilled, (state, action) => {
  state.UserData = action.payload.userData;
  console.log(action.payload.userData);
});
builder.addCase(HandelsignUpAsEmergencyTech.rejected, (state, action) => {
  state.UserData = action.payload.userData;
  console.log(action.payload.userData);
});
    
    // ^ UpdateUser
    builder.addCase(UpdateUser.fulfilled, (state, action) => {
      // if (action.payload.isValid) {
        state.UserData = action.payload.updatedUser;
        console.log(action.payload);
      // }
    });

    // ^ UpdatePassword
    builder.addCase(UpdatePassword.fulfilled, (state, action) => {
      if (action.payload.isValid) {
        state.UserData = action.payload.data;
        console.log(action.payload.data);
      }
    });
    //^ HandelVerifyEmail
    builder.addCase(HandelVerifyEmail.fulfilled, (state, action) => {
      state.UserData = action.payload.userData;
      console.log(action.payload.userData);
    });
    builder.addCase(HandelVerifyEmail.rejected, (state, action) => {
      state.UserData = action.payload.userData;
      console.log(action.payload.userData);
    });
    //^HandelResendEmailToVerify
    builder.addCase(HandelResendEmailToVerify.fulfilled, (state, action) => {
      state.UserData = action.payload.userData;
      console.log(action.payload.userData);
    });
    builder.addCase(HandelResendEmailToVerify.rejected, (state, action) => {
      state.UserData = action.payload.userData;
      console.log(action.payload.userData);
    });
    // ^ GetUserData
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.UserData = action.payload.data;
      console.log(action.payload.data);
    });

    // ^ GetAllUsers
    builder.addCase(GetAllUsers.fulfilled, (state, action) => {
      state.AllUsers = action.payload.data;
      console.log(action.payload.data);
    });
  //^ VerifyAccount
  builder.addCase(VerifyAccount.fulfilled, (state, action) => {
    state.VerifyData = action.payload.data;
    console.log(action.payload.data);
  });
  
  },
});
export default AuthSlice.reducer;
