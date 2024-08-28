import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slice/authSlice.js"
import userSliceReducer from "./Slice/userSlice.js"
import videoSliceReducer from "./Slice/videoSlice.js"
import commentSlice from "./Slice/commentSlice.js";
import likeSlice from "./Slice/likeSlice.js";

const store  = configureStore({
    reducer: {
        auth: authSliceReducer,
        user: userSliceReducer,
        video: videoSliceReducer,
        comment: commentSlice,
        like: likeSlice,
    }
})

export default store;