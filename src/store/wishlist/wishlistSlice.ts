import { createSlice } from "@reduxjs/toolkit";
import thunkLikeToggle from "./thunk/thunkLikeToggle";
import thunkGetWishlist from "./thunk/thunkGetWishlist";
import { TLoading } from "@customTypes/shared";
import { IProducts } from "@customTypes/product";

interface IWishlistState {
    itemsId: number[];
    productsFullInfo: IProducts[];
    error: null | string;
    loading: TLoading;
}

const initialState: IWishlistState = {
    itemsId: [],
    productsFullInfo: [],
    error: null,
    loading: "idle",
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        productsFullInfoCleanUp: (state) => {
            state.productsFullInfo = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(thunkLikeToggle.pending, (state) => {
            state.error = null;
        });
        builder.addCase(thunkLikeToggle.fulfilled, (state, action) => {
            if (action.payload?.type === "add") {
                state.itemsId.push(action.payload.id);
            } else {
                state.itemsId = state.itemsId.filter((el) => el !== action.payload?.id);
                state.productsFullInfo = state.productsFullInfo.filter(
                    (el) => el.id !== action.payload?.id
                );
            }
        });
        builder.addCase(thunkLikeToggle.rejected, (state, action) => {
            if (action.payload && typeof action.payload === "string") {
                state.error = action.payload;
            }
        });

        //get wishlist items
        builder.addCase(thunkGetWishlist.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(thunkGetWishlist.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.productsFullInfo = action.payload;
        });
        builder.addCase(thunkGetWishlist.rejected, (state, action) => {
            state.loading = "failed";
            if (action.payload && typeof action.payload === "string") {
                state.error = action.payload;
            }
        });
    },
});

export { thunkLikeToggle, thunkGetWishlist };
export default wishlistSlice.reducer;
export const { productsFullInfoCleanUp } = wishlistSlice.actions;