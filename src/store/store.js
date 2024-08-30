import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slice/authSlice.js"
import userSliceReducer from "./Slice/userSlice.js"
import videoSliceReducer from "./Slice/videoSlice.js"
import commentSlice from "./Slice/commentSlice.js";
import likeSlice from "./Slice/likeSlice.js";
import subscriptionSlice from "./Slice/subscriptionSlice.js";
import playListSlice from "./Slice/playListSlice.js";

const store  = configureStore({
    reducer: {
        auth: authSliceReducer,
        user: userSliceReducer,
        video: videoSliceReducer,
        comment: commentSlice,
        like: likeSlice,
        subscription: subscriptionSlice,
        playlist: playListSlice,
    }
})

export default store;