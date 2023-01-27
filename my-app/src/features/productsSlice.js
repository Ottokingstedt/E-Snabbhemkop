import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { toast } from 'react-toastify';
import { url } from './api';
import { setHeaders } from './api';
const initialState = {
    items: [],
    status: null,
    error: null,
    createStatus: null, 
    DeleteStatus: null,
    UpdateStatus: null,
};

export const productsFetch = createAsyncThunk(
    "products/productsFetch", 
    async() => {
    try{
        const response = await axios.get(`${url}/products`)
        return response.data;
    } catch(error){
        console.log(error.response.data);
    }
   
    }
);

export const productsCreate = createAsyncThunk(
    "products/productsCreate",
    async( values ) => {
        try{
            const response = await axios.post(
                `${url}/products`, 
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

export const productsUpdated = createAsyncThunk(
    "products/productsUpdated",
    async( values ) => {
        try{
            const response = await axios.put(
                `${url}/products/${values.product._id}`, 
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

export const productsDelete = createAsyncThunk(
    "products/productsDelete",
    async( id ) => {
        try{
            const response = await axios.delete(
                `${url}/products/${id}`, 
                setHeaders()
            );
            return response.data;
        } catch(error){
            console.log(error);
            toast.error(error.response?.data)
        }
    }
);

 const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: {

        // Fetch

        [productsFetch.pending]: (state, action) =>{
            state.status = "pending";
        },
        [productsFetch.fulfilled]: (state, action) =>{
            state.status = "success";
            state.items = action.payload;
        },
        [productsFetch.rejected]: (state, action) =>{
            state.status = "rejected";
            state.items = action.payload;
        },

        // Create

        [productsCreate.pending]: (state, action) =>{
            state.createStatus = "pending";
        },
        [productsCreate.fulfilled]: (state, action) =>{
            state.createStatus = "success";
            state.items.push(action.payload);
            toast.success("Product created!")

        },
        [productsCreate.rejected]: (state, action) =>{
            state.createStatus = "rejected";
        },


        // Update

        [productsUpdated.pending]: (state, action) =>{
            state.UpdateStatus = "pending";
        },
        [productsUpdated.fulfilled]: (state, action) =>{

            const updatedProducts = state.items.map((product) =>
            product._id === action.payload._id ? action.payload : product
            );

            state.items = updatedProducts;
            state.UpdateStatus = "success";
            toast.info("Product Updated");
        },
        [productsUpdated.rejected]: (state, action) =>{
            state.UpdateStatus = "rejected";
        },

        // Delete

        [productsDelete.pending]: (state, action) =>{
            state.DeleteStatus = "pending";
        },
        [productsDelete.fulfilled]: (state, action) =>{
            
            const newList = state.items.filter(
                (item) => item._id !== action.payload._id
                );
            state.items = newList;
            state.DeleteStatus = "success";
            toast.error("Product Deleted");
        },
        [productsDelete.rejected]: (state, action) =>{
            state.DeleteStatus = "rejected";
        },
    }
})

export default productsSlice.reducer;