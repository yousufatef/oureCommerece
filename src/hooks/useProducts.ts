import { useAppDispatch, useAppSelector } from "@store/hooks";
import { cleanUpProductsRecord, thunkGetProducts } from "@store/products/productsSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const useProducts = () => {
    const params = useParams()
    const productPrefix = params.prefix
    const dispatch = useAppDispatch();
    const { loading, error, record } = useAppSelector((state) => state.products);
    const userAccessToken = useAppSelector((state) => state.auth.accessToken)

    const cartItems = useAppSelector((state) => state.cart.items)
    const wishlistItemsId = useAppSelector((state) => state.wishlist.itemsId)

    const productsFullInfo = record.map((el) => ({
        ...el,
        quantity: cartItems[el.id] || 0,
        isLiked: wishlistItemsId.includes(el.id),
        isAuthenticated: userAccessToken ? true : false,
    }));


    useEffect(() => {
        const promise = dispatch(thunkGetProducts(params.prefix as string));
        return () => {
            dispatch(cleanUpProductsRecord());
            promise.abort()
        }
    }, [dispatch, params]);

    return { error, loading, productsFullInfo, productPrefix }
}

export default useProducts