import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosIN from "../../hooks/axiosIN";
import { toast } from "react-toastify";
import { BASE_URL } from "../../env";

const initialState = {
    loading: false,
    comments: [],
    totalComments: null,
    hasNextPage: false
};

export const createAComment = createAsyncThunk('createAComment', async ({ videoId, content, dispatch }) => {
    try {
        await axiosIN.post(`/comment/${videoId}`, { content });
        dispatch(getVideoComments({ videoId }));
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});

export const editAComment = createAsyncThunk("editAComment", async ({ commentId, content }) => {
    try {
        const response = await axiosIN.patch(`/comment/c/${commentId}`, { content });
        toast.success(response.data?.message);
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});

export const deleteAComment = createAsyncThunk("deleteAComment", async (commentId, { dispatch, videoId }) => {
    try {
        const response = await axiosIN.delete(`/comment/c/${commentId}`);
        toast.success(response.data?.message);
        dispatch(getVideoComments(videoId));
        return commentId;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});

export const getVideoComments = createAsyncThunk('getVideoComments', async ({ videoId, page, limit }) => {

    const url = new URL(`${BASE_URL}/comment/${videoId}`);
    if (page) url.searchParams.set("page", page);
    if (limit) url.searchParams.set("limit", limit);

    try {
        const response = await axiosIN.get(url);

        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});
const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        cleanUpComments: (state) => {
            state.comments = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getVideoComments.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getVideoComments.fulfilled, (state, action) => {
            state.loading = false;
            const newComments = action.payload.docs;

            const existingCommentsMap = new Map(state.comments.map(comment => [comment._id, comment]));

            newComments.forEach(comment => {
                if (!existingCommentsMap.has(comment._id)) {
                    existingCommentsMap.set(comment._id, comment);
                }
            });

            state.comments = Array.from(existingCommentsMap.values()).sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            state.totalComments = action.payload.totalDocs;
            state.hasNextPage = action.payload.hasNextPage;
        });
        builder.addCase(deleteAComment.fulfilled, (state, action) => {
            state.comments = state.comments.filter(
                (comment) => comment._id !== action.payload
            );
            state.totalComments--;
        });
    },
});

export const { cleanUpComments } = commentSlice.actions;

export default commentSlice.reducer;
