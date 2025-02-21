import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    approvalURL: null,
    isLoading: false,
    orderId: null,
    orderList: [],
    orderDetails: null
}

export const createNewOrder = createAsyncThunk('/order/createNewOrder', async (orderData) => {
    const response = await axios.post('https://buzzcart-web.onrender.com/api/shop/order/create', orderData)

    return response.data;
})


export const capturePayment = createAsyncThunk('/order/capturePayment', async ({ paymentId, payerId, orderId }) => {
    const response = await axios.post('https://buzzcart-web.onrender.com/api/shop/order/capture', { paymentId, payerId, orderId })

    return response.data;
})


export const getALlOrderByuserId = createAsyncThunk('/order/getALlOrderByuserId', async (userId) => {
    const response = await axios.get(`https://buzzcart-web.onrender.com/api/shop/order/list/${userId}`)



    return response.data;
})
export const getOrderDetails = createAsyncThunk('/order/getOrderDetails', async (id) => {
    const response = await axios.get(`https://buzzcart-web.onrender.com/api/shop/order/details/${id}`)

    return response.data;
})





const shoppingOrderSlice = createSlice({
    name: "shoppingOrderSlice",
    initialState,
    reducers: {
        resetOrderDEtails: (state) => {
            state.orderDetails = null
        },

    },
    extraReducers: (builder) => {

        builder.addCase(createNewOrder.pending, (state) => {
            state.isLoading = true
        }).addCase(createNewOrder.fulfilled, (state, action) => {
            state.isLoading = false
            state.approvalURL = action.payload.approvalURL
            state.orderId = action.payload.orderId
            sessionStorage.setItem('currentOrderId', JSON.stringify(action.payload.orderId))
        }).addCase(createNewOrder.rejected, (state) => {
            state.isLoading = false
            state.approvalURL = null
            state.orderId = null
        }).addCase(getALlOrderByuserId.pending, (state) => {
            state.isLoading = true
        }).addCase(getALlOrderByuserId.fulfilled, (state, action) => {
            console.log(action.payload, "API response");
            state.isLoading = false
            state.orderList = action.payload.data


        }).addCase(getALlOrderByuserId.rejected, (state) => {
            state.isLoading = false
            state.orderList = []


        }).addCase(getOrderDetails.pending, (state) => {
            state.isLoading = true
        }).addCase(getOrderDetails.fulfilled, (state, action) => {
            state.isLoading = false
            state.orderDetails = action.payload.data
            console.log(action.payload);

        }).addCase(getOrderDetails.rejected, (state) => {
            state.isLoading = false
            state.orderDetails = null;
        })
    }

})

export const { resetOrderDEtails } = shoppingOrderSlice.
    actions;

export default shoppingOrderSlice.reducer
