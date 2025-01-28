import { ICategories } from '@customTypes/category';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type TResponse = ICategories[]

const thunkGetCategories = createAsyncThunk('categories/thunkGetCategories', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await axios.get<TResponse>("/categories");
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data.message || error.message);
        } else {
            return rejectWithValue("An error occurred while fetching categories.");
        }
    }
});

export default thunkGetCategories;