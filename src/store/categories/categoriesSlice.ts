import { createSlice } from "@reduxjs/toolkit";
import thunkGetCategories from "./thunk/thunkGetCategories";
import { isString, TLoading } from "@types";
import { ICategories } from "@types";


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
    reducers: {
        categoriesRecordCleanUp: (state) => {
            state.record = []
        }
    },
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
            if (isString(action.payload)) {
                state.error = action.payload
            }
        })
    }
})

export { thunkGetCategories }
export const { categoriesRecordCleanUp } = categoriesSlice.actions
export default categoriesSlice.reducer