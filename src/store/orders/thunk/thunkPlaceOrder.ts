import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@util/axiosErrorHandler";
import { RootState } from "@store/index";

const thunkPlaceOrder = createAsyncThunk(
    "orders/thunkPlaceOrder",
    async (subtotal: number, thunkAPI) => {
        const { rejectWithValue, getState } = thunkAPI;
        const { cart, auth } = getState() as RootState;

        const orderItems = cart.productsFullInfo.map((el) => ({
            id: el.id,
            title: el.title,
            price: el.price,
            img: el.img,
            quantity: cart.items[el.id],
        }));

        try {
            const res = await axios.post("/orders", {
                userId: auth.user?.id,
                items: orderItems,
                subtotal,
            });

            return res.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default thunkPlaceOrder;