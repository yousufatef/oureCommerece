import { IProducts } from "@customTypes/product";
import { thunkLikeToggle } from "@store/wishlist/wishlistSlice";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";
import styles from "./styles.module.css";
import { Button, Spinner } from "react-bootstrap";

import { memo, useEffect, useState } from "react";

const { product, productImg, maximumNotice, wishlistBtn } = styles;

const Product = memo(({ id, title, price, img, max, quantity = 0, isLiked }: IProducts) => {
    const dispatch = useAppDispatch();
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const currentRemainingQuantity = max - quantity;
    const quantityReachedToMax = currentRemainingQuantity <= 0;

    useEffect(() => {
        if (isBtnDisabled) {
            const debounce = setTimeout(() => {
                setIsBtnDisabled(false);
            }, 300);

            return () => clearTimeout(debounce);
        }
    }, [isBtnDisabled]);

    const addToCartHandler = () => {
        dispatch(addToCart(id));
        setIsBtnDisabled(true);
    };
    const likeToggleHandler = () => {
        if (!isLoading) {
            setIsLoading(true);
            dispatch(thunkLikeToggle(id))
                .unwrap()
                .then(() => setIsLoading(false))
                .catch(() => setIsLoading(false));
        }
    };

    return (
        <div className={product}>
            <div className={wishlistBtn} onClick={likeToggleHandler}>
                {isLoading ? (
                    <Spinner animation="border" size="sm" variant="primary" />
                ) : isLiked ? (
                    <LikeFill />
                ) : (
                    <Like />
                )}
            </div>
            <div className={productImg}>
                <img src={img} alt={title} />
            </div>
            <h2>{title}</h2>
            <h3>{price.toFixed(2)} EGP</h3>
            <p className={maximumNotice}>
                {quantityReachedToMax
                    ? "You Reached To The Limit"
                    : `You Can Add ${currentRemainingQuantity} item(s)`}
            </p>
            <Button

                onClick={addToCartHandler}
                disabled={isBtnDisabled || quantityReachedToMax}
                variant="info"
                style={{ color: "white" }}
            >
                {isBtnDisabled ? (
                    <>
                        <Spinner animation="border" size="sm" /> Loading...
                    </>
                ) : (
                    "Add to cart"
                )}
            </Button>
        </div>
    );
});

export default Product;