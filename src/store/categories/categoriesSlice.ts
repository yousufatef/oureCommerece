import { createSlice } from "@reduxjs/toolkit";
import thunkGetCategories from "./thunk/thunkGetCategories";
import { TLoading } from "@customTypes/shared";
import { ICategories } from "@customTypes/category";


interface ICategoriesState {
    record: ICategories[],
    loading: TLoading,
    error: string | null,
}
const initialState: ICategoriesState = {
    record: [],
    loading: "idle",
    error: null
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(thunkGetCategories.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        builder.addCase(thunkGetCategories.fulfilled, (state, action) => {
            state.loading = "succeeded"
            state.record = action.payload
        })
        builder.addCase(thunkGetCategories.rejected, (state, action) => {
            state.loading = "failed"
            if (action.payload && typeof action.payload === "string") {
                state.error = action.payload
            }
        })
    }
})

export { thunkGetCategories }
export default categoriesSlice.reducer