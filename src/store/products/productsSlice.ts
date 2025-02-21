import { createSlice } from "@reduxjs/toolkit"
import thunkGetProducts from "./thunk/thunkGetProducts"
import { TLoading } from "@customTypes/shared"
import { IProducts } from "@customTypes/product"

interface IProductsState {
    record: IProducts[],
    loading: TLoading,
    error: string | null,
}

const initialState: IProductsState = {
    record: [],
    loading: "idle",
    error: null
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        cleanUpProductsRecord: (state) => {
            state.record = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(thunkGetProducts.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        builder.addCase(thunkGetProducts.fulfilled, (state, action) => {
            state.loading = "succeeded"
            state.record = action.payload
            state.error = null
        })
        builder.addCase(thunkGetProducts.rejected, (state, action) => {
            state.loading = "failed"
            if (action.payload && typeof action.payload === "string") {
                state.error = action.payload
            }
        })
    }
})

export { thunkGetProducts }
export default productSlice.reducer
export const { cleanUpProductsRecord } = productSlice.actions