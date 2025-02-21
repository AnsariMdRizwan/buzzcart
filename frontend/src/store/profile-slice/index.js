import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    profileImage: [],
};

export const getProfileImages = createAsyncThunk('profile/getProfileImages', async () => {
    const response = await axios.get(`https://buzzcart-web.onrender.com/api/common/profile/get`);
    console.log(response.data);

    return response.data;
});
export const addProfileImages = createAsyncThunk('profile/addProfileImages', async (image) => {
    const response = await axios.post(`https://buzzcart-web.onrender.com/api/common/profile/add`, { image });
    return response.data;
});

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState,

    extraReducers: (builder) => {
        builder.addCase(getProfileImages.pending, (state) => {
            state.isLoading = true;
        }).addCase(getProfileImages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.profileImage = action.payload.data;
            console.log(action.payload.data);

        }).addCase(getProfileImages.rejected, (state) => {
            state.isLoading = false;
            state.profileImage = [];
        });
    }
});


export default profileSlice.reducer;
