import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@util/axiosErrorHandler";
import axios from "axios";

type TFormData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

const thunkAuthRegister = createAsyncThunk("auth/thunkAuthRegister", async (formData: TFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    try {
        const response = await axios.post("/register", formData)
        return response.data
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }
})

export default thunkAuthRegister;