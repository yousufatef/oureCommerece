import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "@util";
import { IProducts } from "@types";
import { RootState } from "@store/index";

type TDataType = "productsFullInfo" | "ProductIds";
type TResponse = IProducts[];

const thunkGetWishlist = createAsyncThunk(
    "wishlist/thunkGetWishlist",
    async (dataType: TDataType, thunkAPI) => {
        const { rejectWithValue, signal, getState } = thunkAPI;
        const { auth } = getState() as RootState;
        try {
            const userWishlist = await axios.get<{ productId: number }[]>(
                `/wishlist?userId=${auth.user?.id}`,
                { signal }
            );

            if (!userWishlist.data.length) {
                return { data: [], dataType: "empty" };
            }

            if (dataType === "ProductIds") {
                const concatenatedItemsId = userWishlist.data.map((el) => el.productId);
                return { data: concatenatedItemsId, dataType: "productsIds" };
            } else {
                const concatenatedItemsId = userWishlist.data
                    .map((el) => `id=${el.productId}`)
                    .join("&");

                const response = await axios.get<TResponse>(
                    `/products?${concatenatedItemsId}`
                );
                return { data: response.data, dataType: "ProductsFullInfo" };
            }
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default thunkGetWishlist;