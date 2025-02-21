import { IProducts } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the expected response type as an array of IProducts
type TResponse = IProducts[];

const thunkGetWishlist = createAsyncThunk(
    "wishlist/thunkGetWishlist",
    async (_, thunkAPI) => {
        const { rejectWithValue, fulfillWithValue } = thunkAPI;
        try {
            const userWishlist = await axios.get<{ productId: number }[]>("/wishlist?userId=1");
            if (!userWishlist.data.length) {
                return fulfillWithValue([] as TResponse); 
            }

            const concatenatedItemsId = userWishlist.data
                .map((el) => `id=${el.productId}`)
                .join("&");

            const response = await axios.get<TResponse>(`/products?${concatenatedItemsId}`);
            return response.data;
            
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.message || error.message);
            } else {
                return rejectWithValue("Failed to get Wishlist");
            }
        }
    }
);

export default thunkGetWishlist;