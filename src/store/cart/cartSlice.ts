import { IProducts } from "@types";
import { TLoading } from "@types";
import { createSlice } from "@reduxjs/toolkit";
import {
    getCartTotalQuantitySelector,
} from "./selectors";
import thunkGetProductByItems from "./thunk/thunkGetProductByItems";

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

        },
        cartItemChangeQuantity: (state, action) => {
            state.items[action.payload.id] = action.payload.quantity;
        },
        cartItemRemove: (state, action) => {
            delete state.items[action.payload];
            state.productsFullInfo = state.productsFullInfo.filter(
                (el) => el.id !== action.payload
            );
        },
        cleanCartProductFullInfo: (state) => {
            state.productsFullInfo = []
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
export const { addToCart, cartItemChangeQuantity, cartItemRemove, cleanCartProductFullInfo } = cartSlice.actions
export default cartSlice.reducer