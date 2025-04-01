import { IProducts } from "@types";
import { thunkLikeToggle } from "@store/wishlist/wishlistSlice";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";
import styles from "./styles.module.css";
import { Button, Modal, Spinner } from "react-bootstrap";
import { addToast } from "@store/toasts/toastsSlice";
import { memo, useEffect, useState } from "react";
import ProductInfo from "../ProductInfo/ProductInfo";

const { maximumNotice, wishlistBtn } = styles;

const Product = memo(({ id, title, price, img, max, quantity = 0, isLiked, isAuthenticated }: IProducts) => {
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState(false);
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

        dispatch(
            addToast({
                title: "Add to Cart",
                type: "success",
                message: `${title} added to wishlist`,
                onCloseToast: () => {
                    console.log("fired");
                },
            })
        );

        // reached to maximum show warning after success toast
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        currentRemainingQuantity - 1 == 0 &&
            dispatch(
                addToast({
                    type: "warning",
                    message: `you reached to max from ${title}`,
                    delayAnimation: true,
                })
            );

        setIsBtnDisabled(true);
    };
    const likeToggleHandler = () => {
        if (isAuthenticated) {
            if (!isLoading) {
                setIsLoading(true);
                dispatch(thunkLikeToggle(id))
                    .unwrap()
                    .then(() => {
                        setIsLoading(false);
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        !isLiked &&
                            dispatch(
                                addToast({
                                    type: "success",
                                    message: `${title} added to wishlist`,
                                })
                            );
                    })
                    .catch(() => {
                        setIsLoading(false);
                        dispatch(
                            addToast({
                                title: "Failed Operation",
                                type: "danger",
                                message: `Failed to add wishlist, error from server`,
                            })
                        );
                    });
            }
        } else {
            setShowModal(true);
        }
    };

    return (
        <>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Login Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You need to login first to add this item to your wishlist.
                </Modal.Body>
            </Modal>
            <ProductInfo title={title} price={price} img={img} direction="row">
                <div className={wishlistBtn} onClick={likeToggleHandler}>
                    {isLoading ? (
                        <Spinner animation="border" size="sm" variant="primary" />
                    ) : isLiked ? (
                        <LikeFill />
                    ) : (
                        <Like />
                    )}
                </div>

                <p className={maximumNotice}>
                    {quantityReachedToMax
                        ? "You reached to the limit"
                        : `You can add ${currentRemainingQuantity} item(s)`}
                </p>
                <Button
                    variant="info"
                    style={{ color: "white", width: "100%" }}
                    onClick={addToCartHandler}
                    disabled={isBtnDisabled || quantityReachedToMax}
                >
                    {isBtnDisabled ? (
                        <>
                            <Spinner animation="border" size="sm" /> Loading...
                        </>
                    ) : (
                        "Add to cart"
                    )}
                </Button>
            </ProductInfo>
        </>
    );
});

export default Product;