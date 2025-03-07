import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@util/axiosErrorHandler";
import axios from "axios";

type TFormData = {
    email: string,
    password: string,
}
type TResponse = {
    user: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
    };
    accessToken: string;
};

const thunkAuthLogin = createAsyncThunk("auth/thunkAuthLogin", async (formData: TFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    try {
        const response = await axios.post<TResponse>("/login", formData)
        return response.data
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }
})

export default thunkAuthLogin;