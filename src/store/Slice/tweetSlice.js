import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import axiosIN from "../../hooks/axiosIN";


const initialState = {
    loading: false,
    tweets: [],
}

export const createTweet = createAsyncThunk("createTweet", async (content) => {
    try {
        const response = await axiosIN.post("/tweet", content, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        toast.success(response.data?.message);
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});


export const editTweet = createAsyncThunk(
    "editTweet",
    async ({ tweetId, content, image }) => {
      try {
        const formData = new FormData();
        formData.append("content", content);  
        if (image) {
          formData.append("CommunityPostImage", image);
        }
  
        const response = await axiosIN.patch(`/tweet/${tweetId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success(response.data?.message);
        return response.data.data;
      } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
      }
    }
  );
  


export const deleteTweet = createAsyncThunk("deleteTweet", async (tweetId) => {
    try {
        const response = await axiosIN.delete(`/tweet/${tweetId}`);
        toast.success(response.data?.message);
        return response.data.data.tweetId;
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error;
    }
})

export const getUserTweets = createAsyncThunk("getUserTweets", async (userId) => {
    try {
        const response = await axiosIN.get(`/tweet/user/${userId}`);
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error;
    }
})

const tweetSlice = createSlice({
    name: "tweet",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserTweets.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserTweets.fulfilled, (state, action) => {
            state.loading = false;
            state.tweets = action.payload;
        });
        builder.addCase(createTweet.fulfilled, (state, action) => {
            state.tweets.unshift(action.payload);
        })
        builder.addCase(deleteTweet.fulfilled, (state, action) => {
            state.tweets = state.tweets.filter((tweet) => tweet._id !== action.payload);
        })
    },
})

export const { addTweet } = tweetSlice.actions;

export default tweetSlice.reducer;