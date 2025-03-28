import { createSlice } from "@reduxjs/toolkit";
import thunkLikeToggle from "./thunk/thunkLikeToggle";
import thunkGetWishlist from "./thunk/thunkGetWishlist";
import { authLogout } from "@store/auth/authSlice";
import { IProducts, TLoading, isString } from "@types";
interface IWishlist {
    itemsId: number[];
    productsFullInfo: IProducts[];
    error: null | string;
    loading: TLoading;
}

const initialState: IWishlist = {
    itemsId: [],
    productsFullInfo: [],
    error: null,
    loading: "idle",
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        cleanWishlistProductsFullInfo: (state) => {
            state.productsFullInfo = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(thunkLikeToggle.pending, (state) => {
            state.error = null;
        });
        builder.addCase(thunkLikeToggle.fulfilled, (state, action) => {
            if (action.payload.type === "add") {
                state.itemsId.push(action.payload.id);
            } else {
                state.itemsId = state.itemsId.filter((el) => el !== action.payload.id);
                state.productsFullInfo = state.productsFullInfo.filter(
                    (el) => el.id !== action.payload.id
                );
            }
        });
        builder.addCase(thunkLikeToggle.rejected, (state, action) => {
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // get wishlist items
        builder.addCase(thunkGetWishlist.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(thunkGetWishlist.fulfilled, (state, action) => {
            state.loading = "succeeded";
            if (action.payload.dataType === "ProductsFullInfo") {
                state.productsFullInfo = action.payload.data as IProducts[];
            } else if (action.payload.dataType === "productsIds") {
                state.itemsId = action.payload.data as number[];
            }
        });
        builder.addCase(thunkGetWishlist.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });

        // when logout reset
        builder.addCase(authLogout, (state) => {
            state.itemsId = [];
            state.productsFullInfo = [];
        });
    },
});

export { thunkLikeToggle, thunkGetWishlist };
export const { cleanWishlistProductsFullInfo } = wishlistSlice.actions;
export default wishlistSlice.reducer;