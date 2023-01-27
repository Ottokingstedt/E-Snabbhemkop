import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { toast } from 'react-toastify';
import { url } from './api';
import { setHeaders } from './api';
const initialState = {
    list: [],
    status: null,
    error: null,
    DeleteStatus: null,
    UpdateStatus: null,
};

export const usersFetch = createAsyncThunk(
    "users/usersFetch", 
    async() => {
    try{
        const response = await axios.get(`${url}/users`, setHeaders())
        return response.data;
    } catch(error){
        console.log(error.response.data);
    }
   
    }
);

export const usersUpated = createAsyncThunk(
    "users/usersUpated",
    async( values ) => {
        try{
            const response = await axios.put(
                `${url}/users/${values.product._id}`, 
                values,
                setHeaders()
            );
            return response.data;
        } catch(error){
            console.log(error);
            toast.error(error.response?.data)
        }
    }
);

export const usersDelete = createAsyncThunk(
    "user/usersDelete",
    async( id ) => {
        try{
            const response = await axios.delete(
                `${url}/users/${id}`, 
                setHeaders()
            );
            return response.data;
        } catch(error){
            console.log(error);
            toast.error(error.response?.data, {
                position: "bottom-left"
            })
        }
    }
);

 const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: {

        // Fetch

        [usersFetch.pending]: (state, action) =>{
            state.status = "pending";
        },
        [usersFetch.fulfilled]: (state, action) =>{
            state.status = "success";
            state.list = action.payload;
        },
        [usersFetch.rejected]: (state, action) =>{
            state.status = "rejected";
            state.list = action.payload;
        },


        // Update

        [usersUpated.pending]: (state, action) =>{
            state.UpdateStatus = "pending";
        },
        [usersUpated.fulfilled]: (state, action) =>{

            const updatedUsers = state.items.map((user) =>
            user._id === action.payload._id ? action.payload : user
            );

            state.list = updatedUsers;
            state.UpdateStatus = "success";
            toast.info("User Updated");
        },
        [usersUpated.rejected]: (state, action) =>{
            state.UpdateStatus = "rejected";
        },

        // Delete

        [usersDelete.pending]: (state, action) =>{
            state.DeleteStatus = "pending";
        },
        [usersDelete.fulfilled]: (state, action) =>{
            
            const newList = state.list.filter(
                (user) => user._id !== action.payload._id
                );
            state.list = newList;
            state.DeleteStatus = "success";
            toast.error("User Deleted!", {
                position: "bottom-left"
            });
        },
        [usersDelete.rejected]: (state, action) =>{
            state.DeleteStatus = "rejected";
        },
    }
})

export default usersSlice.reducer;