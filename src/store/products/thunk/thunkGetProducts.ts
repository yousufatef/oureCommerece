import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const thunkGetProducts = createAsyncThunk(
    'products/thunkGetProducts', async (prefix: string, thunkAPI) => {
        const { rejectWithValue } = thunkAPI
        try {
            const response = await axios.get(`/products?cat_prefix=${prefix}`)
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.message || error.message)
            } else {
                rejectWithValue('Failed to get products')
            }
        }
    }
)

export default thunkGetProducts