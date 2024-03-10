import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";


export const ConfigStore = configureStore({
    reducer:{
        AuthData :AuthSlice
    }
})