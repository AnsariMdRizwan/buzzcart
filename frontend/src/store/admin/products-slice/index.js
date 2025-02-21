import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    isLoading: false,
    productList: [],
}

export const addNewproduct = createAsyncThunk(
    "/products/addnewproduct",
    async (formData) => {
        const result = await axios.post('https://buzzcart-web.onrender.com/api/admin/product/add', formData, {
            headers: {
                'Content-Type': "application/json",
            },
        })
        return result?.data;
    }
)
export const fetchAllProducts = createAsyncThunk(
    "/products/fetchAllproducts",
    async () => {
        const result = await axios.get('https://buzzcart-web.onrender.com/api/admin/product/get')

        return result?.data;

    }
)
export const editProduct = createAsyncThunk(
    "/products/editProduct",
    async ({ id, formData }) => {
        const result = await axios.put(`https://buzzcart-web.onrender.com/api/admin/product/edit/${id}`, formData, {
            headers: {
                'Content-Type': "application/json",
            },
        })
        return result?.data;
    }
)
export const deleteProduct = createAsyncThunk(
    "/products/deleteProduct",
    async ({ id, formData }) => {
        const result = await axios.delete(`https://buzzcart-web.onrender.com/api/admin/product/delete/${id}`, formData, {
            headers: {
                'Content-Type': "application/json",
            },
        })
        return result?.data;
    }
)


const AdmminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchAllProducts.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchAllProducts.fulfilled,
            (state, action) => {
                console.log(action.payload);
                state.isLoading = false
                state.productList = action.payload.data;
            }).addCase(fetchAllProducts.rejected, (state, action) => {
                state.isLoading = false
                state.productList = [];
            })
    }
})

export default AdmminProductsSlice.reducer