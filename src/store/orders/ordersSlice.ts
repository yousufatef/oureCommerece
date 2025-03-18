import thunkPlaceOrder from './thunk/thunkPlaceOrder';
import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@types";
import { TOrderItem } from "@types";

interface IOrderSlice {
    orderList: TOrderItem[];
    loading: TLoading;
    error: string | null;
}

const initialState: IOrderSlice = {
    orderList: [],
    loading: "idle",
    error: null,
};


const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        resetOrderStatus: (state) => {
            state.loading = "idle";
            state.error = null;
        },
    },
})


export { thunkPlaceOrder };
export const { resetOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer