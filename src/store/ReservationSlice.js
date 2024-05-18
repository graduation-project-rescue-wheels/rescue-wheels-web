import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// & ======================= Add Reservation Client =======================
export const AddReservationClient = createAsyncThunk(
    "Reservation/AddReservationClient",
    async ({ id, formData }) => { // Destructure id and formData from payload
        console.log(formData);
        try {
            const response = await axios.post(`http://localhost:3000/Reservation/addReservation/${id}`, formData, {
                headers: {
                    accesstoken: "prefixToken_" + localStorage.getItem("Token")
                }
            });
            console.log("Add Reservation Client:", response.data);
            return response.data;
        } catch (error) {
            console.error('Error during login:', error);
            return error.response || { error: 'An error occurred' };
        }
    }
);
// & ======================= update Reservation Client =======================
export const updateReservationClient = createAsyncThunk(
    "Reservation/updateReservationClient",
    async ({ id, formData }) => { // Destructure id and formData from payload
        console.log(formData);
        try {
            const response = await axios.put(`http://localhost:3000/Reservation/updateReservation/${id}`, formData, {
                headers: {                    accesstoken: "prefixToken_" + localStorage.getItem("Token")
                }

            });
            console.log("update Reservation Client:", response.data);
            return response.data;
        } catch (error) {
            console.error('Error during login:', error);
            return error.response || { error: 'An error occurred' };
        }
    }
);

// & ======================= delete Reservation Client =======================
export const deleteReservationClient = createAsyncThunk(
    "Reservation/deleteReservationClient",
    async ({ id }) => { // Destructure id and formData from payload
        try {
            const response = await axios.delete(`http://localhost:3000/Reservation/deleteReservation/${id}`, {
                headers: {                    accesstoken: "prefixToken_" + localStorage.getItem("Token")
                }

            });
            console.log("delete Reservation Client:", response.data);
            return response.data;
        } catch (error) {
            console.error('Error during login:', error);
            return error.response || { error: 'An error occurred' };
        }
    }
);
let ReservationSlice = createSlice({
    name:"Reservation",
    initialState:{
        AddReservationClientData:[],
        updateReservationClientData:[],
        deleteReservationClientData:[]
    },
    extraReducers:(builder)=>{
        // ^ AddReservationClient
        builder.addCase(AddReservationClient.fulfilled,(state,action)=>{
            state.AddReservationClientData=action.payload   
            console.log(action.payload);
        })
        builder.addCase(AddReservationClient.rejected,(state,action)=>{
            state.AddReservationClientData = action.payload
            console.log(action.payload);
    
        })

 // ^ updateReservationClient
 builder.addCase(updateReservationClient.fulfilled,(state,action)=>{
    state.updateReservationClientData=action.payload   
    console.log(action.payload);
})
builder.addCase(updateReservationClient.rejected,(state,action)=>{
    state.updateReservationClientData = action.payload
    console.log(action.payload);

})

 // ^ deleteReservationClient
 builder.addCase(deleteReservationClient.fulfilled,(state,action)=>{
    state.deleteReservationClientData=action.payload   
    console.log(action.payload);
})
builder.addCase(deleteReservationClient.rejected,(state,action)=>{
    state.deleteReservationClientData = action.payload
    console.log(action.payload);

})

    }

    
})


export default ReservationSlice.reducer