import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    featureImageList: [],
};

export const getFeatureImages = createAsyncThunk('api/common/features', async () => {
    const response = await axios.get(`https://buzzcart-web.onrender.com/api/common/features/get`);
    console.log(response.data);

    return response.data;
});
export const addFeatureImages = createAsyncThunk('api/common/features', async (image) => {
    const response = await axios.post(`https://buzzcart-web.onrender.com/api/common/features/add`, { image });
    return response.data;
});

const commonSlice = createSlice({
    name: 'commonSlice',
    initialState,

    extraReducers: (builder) => {
        builder.addCase(getFeatureImages.pending, (state) => {
            state.isLoading = true;
        }).addCase(getFeatureImages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.featureImageList = action.payload.data;
            console.log(action.payload.data);

        }).addCase(getFeatureImages.rejected, (state) => {
            state.isLoading = false;
            state.featureImageList = [];
        });
    }
});


export default commonSlice.reducer;
