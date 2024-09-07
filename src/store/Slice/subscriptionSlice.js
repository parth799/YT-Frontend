import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosIN from "../../hooks/axiosIN";
import { toast } from "react-toastify";


const initialState = {
    loading: false,
    subscribed: null,
    channelSubscribers: [],
    mySubscriptions: [],
};

export const toggleSubscription = createAsyncThunk('toggleSubscription', async (channelId) => {
    try {
        const response = await axiosIN.post(`/subscriptions/c/${channelId}`);
        return response.data.data.subscribed;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
})

export const getUserChannelSubscribers = createAsyncThunk('getUserChannelSubscribers', async (channelId) => {
    try {
        const response = await axiosIN.get(`/subscriptions/c/${channelId}`);
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
})

export const getSubscribedChannels = createAsyncThunk('getSubscribedChannels', async (subscriberId) => {
    try {
        if (subscriberId !== undefined) {
            const response = await axiosIN.get(`/subscriptions/u/${subscriberId}`);
            return response.data.data;
        }
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
})

const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(toggleSubscription.pending, (state) => {
            state.loading = true;
        })
            .addCase(toggleSubscription.fulfilled, (state, action) => {
                state.loading = false;
                state.subscribed = action.payload;
            })
            .addCase(toggleSubscription.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getUserChannelSubscribers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserChannelSubscribers.fulfilled, (state, action) => {
                state.loading = false;
                state.channelSubscribers = action.payload;
            })
            .addCase(getUserChannelSubscribers.rejected, (state) => {
                state.loading = false;
            })
        builder.addCase(getSubscribedChannels.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getSubscribedChannels.fulfilled, (state, action) => {
            state.loading = false;
            state.mySubscriptions = action.payload.filter(
                (subscription) => subscription?.subscribedChannel?.latestVideo
            );

        });
    }
})

export default subscriptionSlice.reducer