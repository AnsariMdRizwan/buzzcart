import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    cartItems: [], // Initialize cart items as an empty array
    isLoading: false,
    error: null,
};

// Thunk for adding items to cart
export const addTocart = createAsyncThunk('cart/addToCart', async ({ userId, productId, quantity }) => {
    const response = await axios.post(`https://buzzcart-web.onrender.com/api/shop/cart/add`, {
        userId,
        productId,
        quantity,
    });
    return response.data;
});

// Thunk for fetching cart items
export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (userId) => {
    const response = await axios.get(`https://buzzcart-web.onrender.com/api/shop/cart/get/${userId}`);
    return response.data;
});

// Thunk for updating cart items
export const updateCartItems = createAsyncThunk('cart/updateCartItems', async ({ userId, productId, quantity }) => {
    const response = await axios.put(`https://buzzcart-web.onrender.com/api/shop/cart/updateCart`, {
        userId,
        productId,
        quantity,
    });
    return response.data;
});

// Thunk for deleting cart items
export const deleteCartItems = createAsyncThunk('cart/deleteCartItems', async ({ userId, productId }) => {
    const response = await axios.delete(`https://buzzcart-web.onrender.com/api/shop/cart/${userId}/${productId}`);
    return response.data;
});


// Thunk for deleting the cartItems after Purchasing the items 

export const deleteCartAfterPayment = createAsyncThunk('cart/deleteCartAfterPayment', async (userId) => {
    const response = await axios.post(`https://buzzcart-web.onrender.com/api/shop/cart/payment`, { userId })
    return response.data
})

// Cart slice
const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {
        clearCartState: (state) => {
            state.cartItems = [];
            state.isLoading = false;
            state.error = null;
        },
    },


    extraReducers: (builder) => {
        builder
            .addCase(addTocart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addTocart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data; // Update cart items with response data
                toast.success("Product Added to Cart.");
            })
            .addCase(addTocart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchCartItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data; // Update cart items with response data
                console.log(state.cartItems);
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(updateCartItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data; // Update cart items with response data
            })
            .addCase(updateCartItems.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(deleteCartItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data; // Update cart items with response data
            })
            .addCase(deleteCartItems.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            }).addCase(deleteCartAfterPayment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCartAfterPayment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = []; // Clear cart items after payment
                toast.success("Payment successful! Cart cleared.");
            })
            .addCase(deleteCartAfterPayment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                toast.error("Failed to clear cart after payment.");
            });
    },
});

export const { clearCartState } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;



