import { Heading } from "@components/common"
import { CartItemList, CartSubTotalPrice } from "@components/eCommerce"
import Loading from "@components/feedback/Loading/Loading"
import { cartItemChangeQuantity, cartItemRemove, thunkGetProductByItems } from "@store/cart/cartSlice"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { useCallback, useEffect } from "react"

const Cart = () => {
    const dispatch = useAppDispatch()
    const { items, productsFullInfo, loading, error } = useAppSelector((state) => state.cart)
    const products = productsFullInfo.map((el) => ({ ...el, quantity: items[el.id] }))

    useEffect(() => {
        dispatch(thunkGetProductByItems())
    }, [dispatch])

    const changeQuantityHandler = useCallback(((id: number, quantity: number) => {
        dispatch(cartItemChangeQuantity({ id, quantity }));
    }), [dispatch])

    const removeItemHandler = useCallback((id: number) => {
        dispatch(cartItemRemove(id));
    }, [dispatch])

    return (
        <>
            <Heading>Cart</Heading>
            <Loading status={loading} error={error}>
                <>
                    {products.length ? (
                        <>
                            <CartItemList
                                products={products}
                                changeQuantityHandler={changeQuantityHandler}
                                removeItemHandler={removeItemHandler}
                            />
                            <CartSubTotalPrice products={products} />
                        </>
                    ) : (
                        "Your Cart is empty"
                    )}
                </>
            </Loading>
        </>
    );
}

export default Cart