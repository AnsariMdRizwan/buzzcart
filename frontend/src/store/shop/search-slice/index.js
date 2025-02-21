import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    searchResults: [],
};

export const getSearchResult = createAsyncThunk('api/shop/search', async (keyword) => {
    const response = await axios.get(`https://buzzcart-web.onrender.com/api/shop/search/${keyword}`);
    return response.data;
});

const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {
        resetSearchResults: (state) => {
            state.searchResults = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getSearchResult.pending, (state) => {
            state.isLoading = true;
        }).addCase(getSearchResult.fulfilled, (state, action) => {
            state.isLoading = false;
            state.searchResults = action.payload.data;
            console.log(action.payload);

        }).addCase(getSearchResult.rejected, (state) => {
            state.isLoading = false;
            state.searchResults = [];
        });
    }
});

export const { resetSearchResults } = searchSlice.actions
export default searchSlice.reducer;
