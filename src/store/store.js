import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist"

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const reducer  = combineReducers({
    AuthData :AuthSlice,
})

const persistedReducer = persistReducer(persistConfig, reducer);

export const ConfigStore = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(ConfigStore)