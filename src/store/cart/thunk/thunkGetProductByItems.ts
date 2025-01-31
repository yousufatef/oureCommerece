import { IProducts } from '@customTypes/product';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";

type TResponse = IProducts

const thunkGetProductByItems = createAsyncThunk("cart/thunkGetProductByItems", async (_, thunAPI) => {
    const { rejectWithValue, fulfillWithValue, getState } = thunAPI
    const { cart } = getState() as RootState
    const itemsId = Object.keys(cart.items).map((id) => id)

    if (!itemsId.length) {
        return fulfillWithValue([]);
    }
    try {
        const concatenatedItemsId = itemsId.map((id) => `id=${id}`).join('&')
        const response = await axios.get<TResponse>(
            `/products?${concatenatedItemsId}`)
        return response.data

    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data.message || error.message);
        } else {
            return rejectWithValue("An Unexpected error occurred");
        }
    }

})

export default thunkGetProductByItems