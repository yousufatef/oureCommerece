import { Heading } from "@components/common"
import { CartItemList, CartSubTotalPrice } from "@components/eCommerce"
import Loading from "@components/feedback/Loading/Loading"
import useCart from "@hooks/useCart"


const Cart = () => {
   const  { loading, error, products, changeQuantityHandler, removeItemHandler } = useCart()

    return (
        <>
            <Heading title={"Your Cart"} />
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