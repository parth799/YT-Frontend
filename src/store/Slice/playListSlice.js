import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosIN from "../../hooks/axiosIN";

const initialState = {
    loading: false,
    playlist: [],
    playlists: [],
};

export const createAPlaylist = createAsyncThunk('createAPlaylist', async ({ name, description }) => {
    try {
        const response = await axiosIN.post("/playlist", {
            name,
            description,
        });
        if (response.data?.success) {
            toast.success(response.data.message);
        }
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
})

export const addVideoToPlayList = createAsyncThunk('addVideoToPlayList', async ({videoId, playlistId}) => {
    try {
        const response = await axiosIN.patch(`/playlist/add/${videoId}/${playlistId}`);
        if (response.data?.success) {
            toast.success(response.data.message);
        }
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
})

export const removeVideoFromPlaylist = createAsyncThunk('removeVideoFromPlaylist', async ({videoId, playlistId}) => {
    try {
        const response = await axiosIN.patch(`/playlist/remove/${videoId}/${playlistId}`);
        if (response.data?.success) {
            toast.success(response.data.message);
        }
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
})


export const getPlaylistById = createAsyncThunk(
    "getPlaylistById",
    async (playlistId) => {
        try {
            const response = await axiosIN.get(`/playlist/${playlistId}`);            
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const getPlaylistsByUser = createAsyncThunk(
    "getPlaylistsByUser",
    async (userId) => {
        try {
            const response = await axiosIN.get(
                `/playlist/user/${userId}`
            );
            return response.data.data;
            
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const upadtePlaylist = createAsyncThunk(
    "upadtePlaylist",
    async ({ playlistId, name, description }) => {
        try {
            const response = await axiosIN.patch(
                `/playlist/${playlistId}`,
                { name, description }
            );
            if (response.data.success) {
                toast.success(response.data.message);
            }
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const deletePlaylist = createAsyncThunk(
    "deletePlaylist",
    async (playlistId) => {
        try {
            const response = await axiosIN.delete(`/playlist/${playlistId}`);
            if (response.data.success) {
                toast.success(response.data.message);
            }
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    })

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPlaylistsByUser.fulfilled, (state, action) => {
            state.playlists = action.payload;
        });
        builder.addCase(getPlaylistById.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getPlaylistById.fulfilled, (state, action) => {
            state.loading = false;
            state.playlist = action.payload;
        })
        builder.addCase(getPlaylistById.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(addVideoToPlayList.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addVideoToPlayList.fulfilled, (state, action) => {
            state.loading = false;
            state.playlist = action.payload;
        })
        builder.addCase(addVideoToPlayList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });


    },
});

export default playlistSlice.reducer;