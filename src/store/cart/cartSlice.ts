import { IProducts } from "@customTypes/product";
import { createSlice } from "@reduxjs/toolkit";
import {
    getCartTotalQuantitySelector,
} from "./selectors";

interface ICartState {
    items: { [key: number]: number },
    productFullInfo: IProducts[]
}

const initialState: ICartState = {
    items: {},
    productFullInfo: []
}

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
})


export  {getCartTotalQuantitySelector}
export const { addToCart } = cartSlice.actions
export default cartSlice.reducer