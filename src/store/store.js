import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slice/authSlice.js"
import userSliceReducer from "./Slice/userSlice.js"
import videoSliceReducer from "./Slice/videoSlice.js"

const store  = configureStore({
    reducer: {
        auth: authSliceReducer,
        user: userSliceReducer,
        video: videoSliceReducer,
    }
})

export default store;