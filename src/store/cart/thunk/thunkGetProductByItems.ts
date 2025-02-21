import { IProducts } from '@customTypes/product';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axiosErrorHandler from '@util/axiosErrorHandler';
import axios from "axios";

type TResponse = IProducts

const thunkGetProductByItems = createAsyncThunk("cart/thunkGetProductByItems", async (_, thunAPI) => {
    const { rejectWithValue, fulfillWithValue, getState, signal } = thunAPI
    const { cart } = getState() as RootState
    const itemsId = Object.keys(cart.items).map((id) => id)

    if (!itemsId.length) {
        return fulfillWithValue([]);
    }
    try {
        const concatenatedItemsId = itemsId.map((id) => `id=${id}`).join('&')
        const response = await axios.get<TResponse>(
            `/products?${concatenatedItemsId}`, { signal })
        return response.data

    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }

})

export default thunkGetProductByItems