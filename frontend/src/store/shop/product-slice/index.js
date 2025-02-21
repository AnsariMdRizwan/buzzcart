import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    isLoading: false,
    productList: [],
    productsDetails: null
}


export const fetchALLFilteredProducts = createAsyncThunk(
    "/products/fetchAllproducts",
    async ({ filterParams, sortParam }) => {

        const query = new URLSearchParams({
            ...filterParams,
            sortBy: sortParam
        })

        const result = await axios.get(`https://buzzcart-web.onrender.com/api/shop/product/get?${query}`)

        return result?.data;

    }
)
export const fetchProductDetails = createAsyncThunk(
    "/products/fetchProductDetails",
    async (id) => {
        const result = await axios.get(`https://buzzcart-web.onrender.com/api/shop/product/get/${id}`)

        return result?.data;

    }
)

const shopProductSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducers: {
        setproductDetails: (state) => {
            state.productsDetails = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchALLFilteredProducts.pending, (state, action) => {
            state.isLoading = true
        }).addCase(fetchALLFilteredProducts.fulfilled, (state, action) => {
            console.log(action.payload)
            state.isLoading = false
            state.productList = action.payload.data

        }).addCase(fetchALLFilteredProducts.rejected, (state, action) => {
            console.log(action.payload)
            state.isLoading = false
            state.productList = []
        }).addCase(fetchProductDetails.pending, (state, action) => {
            state.isLoading = true
        }).addCase(fetchProductDetails.fulfilled, (state, action) => {

            state.isLoading = false
            state.productsDetails = action.payload.data

        }).addCase(fetchProductDetails.rejected, (state, action) => {
            console.log(action.payload)
            state.isLoading = false
            state.productsDetails = null
        })
    }
})

export const { setproductDetails } = shopProductSlice.actions;

export default shopProductSlice.reducer

