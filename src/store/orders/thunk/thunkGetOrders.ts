import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@util/axiosErrorHandler";
import { RootState } from "@store/index";
import { TOrderItem } from "@types";

type TResponse = TOrderItem[];

const thunkGetOrders = createAsyncThunk(
    "orders/thunkGetOrders",
    async (_, thunkAPI) => {
        const { rejectWithValue, getState, signal } = thunkAPI;
        const { auth } = getState() as RootState;

        try {
            const res = await axios.get<TResponse>(
                `/orders?userId=${auth.user?.id}`,
                { signal }
            );

            return res.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default thunkGetOrders;