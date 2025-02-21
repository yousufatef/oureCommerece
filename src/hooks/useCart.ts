import { cartItemChangeQuantity, cartItemRemove, cleanCartProductFullInfo, thunkGetProductByItems } from "@store/cart/cartSlice"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { useCallback, useEffect } from "react"

const useCart = () => {
    const dispatch = useAppDispatch()
    const { items, productsFullInfo, loading, error } = useAppSelector((state) => state.cart)
    const products = productsFullInfo.map((el) => ({ ...el, quantity: items[el.id] }))

    useEffect(() => {
        dispatch(thunkGetProductByItems())
        return () => {
            dispatch(cleanCartProductFullInfo());
        }
    }, [dispatch])

    const changeQuantityHandler = useCallback(((id: number, quantity: number) => {
        dispatch(cartItemChangeQuantity({ id, quantity }));
    }), [dispatch])

    const removeItemHandler = useCallback((id: number) => {
        dispatch(cartItemRemove(id));
    }, [dispatch])
    return { loading, error, products, changeQuantityHandler, removeItemHandler }
}

export default useCart