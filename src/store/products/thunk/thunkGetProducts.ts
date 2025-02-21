import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosErrorHandler from "@util/axiosErrorHandler"
import axios from "axios"

const thunkGetProducts = createAsyncThunk(
    'products/thunkGetProducts', async (prefix: string, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI
        try {
            const response = await axios.get(`/products?cat_prefix=${prefix}`, {
                signal
            })
            return response.data
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error))
        }
    }
)

export default thunkGetProducts