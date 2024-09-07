import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosIN from "../../hooks/axiosIN";
import { toast } from "react-toastify";

const initialState = {
    loading: false,
    profileData: null,
    history: [],
}

export const userChannelProfile = createAsyncThunk("getUserChannelProfile",
    async (username) => {
        try {
            const response = await axiosIN.get(`/users/c/${username}`);
            return response.data.data;
        } catch (error) {
            toast.error("Pleace Login!")
            throw error;
        }
    }
)

export const getWatchHistory = createAsyncThunk("getWatchhistory",
    async () => {
        try {
            const response = await axiosIN.get("/users/watch-history");
            return response.data.data;
        } catch (error) {
            console.log(error);
            toast.error("Pleace Login!")
            throw error;
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userChannelProfile.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(userChannelProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.profileData = action.payload;
        });
        builder.addCase(getWatchHistory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getWatchHistory.fulfilled, (state, action) => {
            state.loading = false;
            state.history = action.payload;
        });
    },
});

export default userSlice.reducer;