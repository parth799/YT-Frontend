import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify";
import axiosIN from "../../hooks/axiosIN"

const initialState = {
    loding : false,
    status : false,
    userData: null,
}


export const createAccount = createAsyncThunk("register", async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("avatar", data.avatar[0]);
    formData.append("fullName", data.fullName);

    if (data.coverImage) {
        formData.append("coverImage", data.coverImage[0]);
    }
    try {
        const response = await axiosIN.post("/users/register", formData)
        console.log(response.data);
        toast.success("Account created successfully");
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
});

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createAccount.pending, (state) => {
                state.loading = true;
            })
            .addCase(createAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.status = true;
                state.userData = action.payload;
            })
            .addCase(createAccount.rejected, (state) => {
                state.loading = false;
                state.status = false;
                state.userData = null;
            })
    }
})

export default authSlice.reducer;