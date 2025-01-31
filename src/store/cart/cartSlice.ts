import { IProducts } from "@customTypes/product";
import { createSlice } from "@reduxjs/toolkit";
import {
    getCartTotalQuantitySelector,
} from "./selectors";
import thunkGetProductByItems from "./thunk/thunkGetProductByItems";
import { TLoading } from "@customTypes/shared";

interface ICartState {
    items: { [key: string]: number };
    productsFullInfo: IProducts[];
    loading: TLoading;
    error: null | string;
}

const initialState: ICartState = {
    items: {},
    productsFullInfo: [],
    loading: "idle",
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const id = action.payload
            if (state.items[id]) {
                state.items[id]++
            }
            else {
                state.items[id] = 1
            }

        }
    },
    extraReducers: (builder) => {
        builder.addCase(thunkGetProductByItems.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(thunkGetProductByItems.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.productsFullInfo = action.payload as unknown as IProducts[];
        });
        builder.addCase(thunkGetProductByItems.rejected, (state, action) => {
            state.loading = "failed";
            if (action.payload && typeof action.payload === "string") {
                state.error = action.payload;
            }
        });
    },
})


export { getCartTotalQuantitySelector, thunkGetProductByItems }
export const { addToCart } = cartSlice.actions
export default cartSlice.reducer