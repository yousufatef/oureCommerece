import { Heading } from "@components/common"
import { CartItemList, CartSubTotalPrice } from "@components/eCommerce"
import Loading from "@components/feedback/Loading/Loading"
import { thunkGetProductByItems } from "@store/cart/cartSlice"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { useEffect } from "react"

const Cart = () => {
    const dispatch = useAppDispatch()
    const { items, productsFullInfo, loading, error } = useAppSelector((state) => state.cart)
    const products = productsFullInfo.map((el) => ({ ...el, quantity: items[el.id] }))
    console.log(products);

    useEffect(() => {
        dispatch(thunkGetProductByItems())
    }, [dispatch])
    return (
        <>
            <Heading>Cart</Heading>
            <Loading status={loading} error={error}>
                <CartItemList products={products} />
                <CartSubTotalPrice />
            </Loading>
        </>
    );
}

export default Cart