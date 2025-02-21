import { IProducts } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@util/axiosErrorHandler";
import axios from "axios";

// Define the expected response type as an array of IProducts
type TResponse = IProducts[];

const thunkGetWishlist = createAsyncThunk(
    "wishlist/thunkGetWishlist",
    async (_, thunkAPI) => {
        const { rejectWithValue, fulfillWithValue, signal } = thunkAPI;
        try {
            const userWishlist = await axios.get<{ productId: number }[]>("/wishlist?userId=1", { signal });
            if (!userWishlist.data.length) {
                return fulfillWithValue([] as TResponse);
            }

            const concatenatedItemsId = userWishlist.data
                .map((el) => `id=${el.productId}`)
                .join("&");

            const response = await axios.get<TResponse>(`/products?${concatenatedItemsId}`);
            return response.data;

        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error))
        }
    }
);

export default thunkGetWishlist;