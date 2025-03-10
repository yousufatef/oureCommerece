import { createSlice } from "@reduxjs/toolkit"
import thunkGetProducts from "./thunk/thunkGetProducts"
import { isString, TLoading } from "@types"
import { IProducts } from "@types"

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
            if (isString(action.payload)) {
                state.error = action.payload
            }
        })
    }
})

export { thunkGetProducts }
export default productSlice.reducer
export const { cleanUpProductsRecord } = productSlice.actions