import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import axiosIN from "../../hooks/axiosIN"

const initialState = {
    loading: false,
    likedVideos: [],
}

export const toggleVideoLike = createAsyncThunk('toggleVideoLike', async (videoId) => {
    try {
        const response = await axiosIN.post(`/likes/toggle/v/${videoId}`)
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
    }
})

export const toggleCommentLike = createAsyncThunk("toggleCommentLike", async (commentId) => {
    try {
        const response = await axiosIN.post(`/likes/toggle/c/${commentId}`)
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error;
    }

})

export const getLikedVideos = createAsyncThunk("getLikedVideos", async () => {
    try {
        const response = await axiosIN.get("likes/videos");
        return response.data.data;
    } catch (error) {
        toast.error("Pleace Login!")

        throw error;
    }
});

const likeSlice = createSlice({
    name: "like",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLikedVideos.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getLikedVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.likedVideos = action.payload;
        });
    },
});

export default likeSlice.reducer;