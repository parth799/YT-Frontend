import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slice/authSlice.js"

const store  = configureStore({
    reducer: {
        auth: authSliceReducer
    }
})

export default store;