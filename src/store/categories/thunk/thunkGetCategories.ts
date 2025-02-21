import { ICategories } from '@customTypes/category';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosErrorHandler from '@util/axiosErrorHandler';
import axios from 'axios';

type TResponse = ICategories[]

const thunkGetCategories = createAsyncThunk('categories/thunkGetCategories', async (_, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
        const response = await axios.get<TResponse>("/categories", { signal });
        return response.data
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }
});

export default thunkGetCategories;