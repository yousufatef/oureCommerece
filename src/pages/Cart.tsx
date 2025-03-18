import useCart from "@hooks/useCart";
import { Heading } from "@components/common";
import { Loading, LottieHandler } from "@components/feedback";
import { CartItemList, CartSubTotalPrice } from "@components/eCommerce";

const Cart = () => {
    const {
        loading,
        error,
        products,
        userAccessToken,
        placeOrderStatus,
        changeQuantityHandler,
        removeItemHandler,
    } = useCart();

    return (
        <>
            <Heading title="Your Cart" />
            <Loading status={loading} error={error} type="cart">
                {products.length ? (
                    <>
                        <CartItemList
                            products={products}
                            changeQuantityHandler={changeQuantityHandler}
                            removeItemHandler={removeItemHandler}
                        />
                        <CartSubTotalPrice
                            products={products}
                            userAccessToken={userAccessToken}
                        />
                    </>
                ) : placeOrderStatus === "succeeded" ? (
                    <LottieHandler
                        message="Your order has been placed successfully"
                        type="success"
                    />
                ) : (
                    <LottieHandler message="Your cart is empty" type="empty" />
                )}
            </Loading>
        </>
    );
};

export default Cart;