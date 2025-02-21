import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@util/axiosErrorHandler";
import axios from "axios";

const thunkLikeToggle = createAsyncThunk("wishlist/thunkLikeToggle", async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const isRecordExist = await axios.get(`/wishlist?userId=1&productId=${id}`)
        if (isRecordExist.data.length > 0) {
            await axios.delete(`/wishlist/${isRecordExist.data[0].id}`)
            return { type: 'remove', id }
        } else {
            await axios.post(`/wishlist`, { userId: 1, productId: id })
            return { type: 'add', id }
        }
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }

})

export default thunkLikeToggle;