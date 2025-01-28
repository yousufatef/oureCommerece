import { useEffect, useState } from "react";
import { useAppSelector } from "@store/hooks";
import { getCartTotalQuantitySelector } from "@store/cart/cartSlice";
import Logo from "@assets/svg/cart.svg?react";

import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
const { basketContainer, basketQuantity, pumpCartQuantity, basketCart } =
    styles;

const HeaderBasket = () => {
    const navigate = useNavigate()
    const [isAnimate, setIsAnimate] = useState(false)
    const totalQuantity = useAppSelector(getCartTotalQuantitySelector);
    const quantityStyle = `${basketQuantity} ${isAnimate ? pumpCartQuantity : ""}`;

    // Applying debouncing on Cart Animation
    useEffect(() => {
        if (!totalQuantity) return

        setIsAnimate(true)
        const debounce = setTimeout(() => setIsAnimate(false), 300);
        return () => clearTimeout(debounce);
    }, [totalQuantity]);
    return (
        <div className={basketContainer} onClick={() => navigate("cart")}>
            <div className={basketCart}>
                <Logo title="basket icon" />
                <div className={quantityStyle}>{totalQuantity}</div>
            </div>
            <h3>Cart</h3>
        </div>
    );
};

export default HeaderBasket;