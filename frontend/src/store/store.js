import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import { persistStore, persistReducer } from "redux-persist";

import authReducer from "./auth-slice";
import AdmminProductsSlice from './admin/products-slice/index.js';
import shopProductsSlice from './shop/product-slice';
import shopCartSlice from './shop/cart-slice';
import shopAddressSlice from './shop/address-slice';
import shopOrderSlice from './shop/order-slice';
import adminOrderSlice from './admin/order-slice';
import shopSearchSlice from "./shop/search-slice";
import shopReviewSlice from "./shop/review-slice";
import commonFeatureSlice from "./common-slice";
import profileSlice from "./profile-slice";

// Step 1: Configure persistence settings
const persistConfig = {
    key: "root",
    storage, // Uses localStorage
    whitelist: ["auth", "shopCart"], // Persist only selected reducers
};

// Step 2: Combine reducers
const rootReducer = combineReducers({
    auth: authReducer, // Persisted (User stays logged in)
    adminproducts: AdmminProductsSlice,
    shopProducts: shopProductsSlice,
    shopCart: shopCartSlice, // Persisted (Cart remains after refresh)
    shopingAddress: shopAddressSlice,
    shoppingOrder: shopOrderSlice,
    adminOrder: adminOrderSlice,
    shopSearch: shopSearchSlice,
    shopReview: shopReviewSlice,
    commonFeature: commonFeatureSlice,
    profilePhoto: profileSlice,
});

// Step 3: Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Step 4: Configure store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serialization check for Redux Persist
        }),
});

// Step 5: Create persistor
const persistor = persistStore(store);

export default store;
export { persistor };

