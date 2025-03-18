import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
    thunkGetProductByItems,
    cartItemChangeQuantity,
    cartItemRemove,
    cleanCartProductFullInfo,
} from "@store/cart/cartSlice";
import { resetOrderStatus } from "@store/orders/ordersSlice";

const useCart = () => {
    const dispatch = useAppDispatch();

    const { items, productsFullInfo, loading, error } = useAppSelector(
        (state) => state.cart
    );

    const userAccessToken = useAppSelector((state) => state.auth.accessToken);

    const placeOrderStatus = useAppSelector((state) => state.orders.loading);

    const changeQuantityHandler = useCallback(
        (id: number, quantity: number) => {
            dispatch(cartItemChangeQuantity({ id, quantity }));
        },
        [dispatch]
    );

    const removeItemHandler = useCallback(
        (id: number) => {
            dispatch(cartItemRemove(id));
        },
        [dispatch]
    );

    const products = productsFullInfo.map((el) => ({
        ...el,
        quantity: items[el.id],
    }));

    useEffect(() => {
        const promise = dispatch(thunkGetProductByItems());

        return () => {
            promise.abort();
            dispatch(cleanCartProductFullInfo());
            dispatch(resetOrderStatus());
        };
    }, [dispatch]);

    return {
        loading,
        error,
        products,
        userAccessToken,
        placeOrderStatus,
        changeQuantityHandler,
        removeItemHandler,
    };
};

export default useCart;