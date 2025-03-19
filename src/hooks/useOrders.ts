import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { thunkGetOrders, resetOrderStatus } from "@store/orders/ordersSlice";
import { IProducts } from "@types";

const useOrders = () => {
    const dispatch = useAppDispatch();

    const { loading, error, orderList } = useAppSelector((state) => state.orders);

    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<IProducts[]>([]);

    const viewDetailsHandler = (id: number) => {
        const productDetails = orderList.find((order) => order.id === id);
        const newItems = productDetails?.items ?? [];

        setShowModal(true);
        setSelectedProduct((prev) => [...prev, ...newItems]);
    };

    const closeModalHandler = () => {
        setShowModal(false);
        setSelectedProduct([]);
    };

    useEffect(() => {
        const promise = dispatch(thunkGetOrders());

        return () => {
            promise.abort();
            dispatch(resetOrderStatus());
        };
    }, [dispatch]);

    return {
        loading,
        error,
        orderList,
        showModal,
        selectedProduct,
        viewDetailsHandler,
        closeModalHandler,
    };
};

export default useOrders;