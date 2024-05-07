import {  createSlice } from "@reduxjs/toolkit";

let MapSlice = createSlice({
    name:"Map",
    initialState:{
        lat:0,
        lng:0
    },
    reducers:{
        setCurrentPos:(state,Pos)=>{
            console.log(Pos.payload.lng);
            console.log("Latitude: " + Pos.payload.lng + ", Longitude: " + Pos.payload.lat);
            state.lng = Pos.payload.lng
            state.lat = Pos.payload.lat
        }
    },
    extraReducers:(builder)=>{
        

    }
})


export default MapSlice.reducer
export let {setCurrentPos} = MapSlice.actions;