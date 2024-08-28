import axiosIN from "../../hooks/axiosIN";
import { BASE_URL } from "../../env";
import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    uploading: false,
    uploaded: false,
    videos: {
        docs: [],
        hasNextPage: false
    },
    video: null,
    publishToggles: false,
}

export const getAllVideos = createAsyncThunk('getAllVideos',
    async ({userId, sortBy, sortType, query,page,limit}) =>{
        try {
            const url = new URL(`${BASE_URL}/video`);

            if (userId) url.searchParams.set("userId", userId);
            if (query) url.searchParams.set("query", query);
            if (page) url.searchParams.set("page", page);
            if (limit) url.searchParams.set("limit", limit);
            if (sortBy && sortType) {
                url.searchParams.set("sortBy", sortBy);
                url.searchParams.set("sortType", sortType);
            }
            const response = await axiosIN.get(url);
            console.log(">>>>", response);
            
            return response.data.data;
        } catch (error) {
            toast.error(error.response.data.message);
            throw error;
        }
    }
)


const videoSlice = createSlice({
    name:"video",
    initialState,
    reducers:{
        updateUploadState: (state)=>{
            state.uploading =false;
            state.uploaded =false;
        },
        makeVideosNull: (state)=>{
            state.videos.docs = [];
        },
    },
    extraReducers:(builder) => {
        builder.addCase(getAllVideos.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.videos.docs = [...state.videos.docs,...action.payload.docs];
            state.videos.hasNextPage = action.payload.hasNextPage;
        });
        builder.addCase(getAllVideos.rejected, (state) => {
            state.loading = false;
        });
    }
})

export const { updateUploadState, makeVideosNull } = videoSlice.actions;

export default videoSlice.reducer;