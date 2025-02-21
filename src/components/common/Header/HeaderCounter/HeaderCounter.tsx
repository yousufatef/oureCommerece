import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

type THeaderCounter = {
    totalQuantity: number;
    svgIcon: React.ReactNode;
    title: string;
    to: string
}
const { container, totalNum, pumpAnimate, iconWrapper } =
    styles;

const HeaderCounter = ({ totalQuantity, svgIcon, to, title }: THeaderCounter) => {
    const navigate = useNavigate()
    const [isAnimate, setIsAnimate] = useState(false)
    const quantityStyle = `${totalNum} ${isAnimate ? pumpAnimate : ""}`;

    // Applying debouncing on Cart Animation
    useEffect(() => {
        if (!totalQuantity) return

        setIsAnimate(true)
        const debounce = setTimeout(() => setIsAnimate(false), 300);
        return () => clearTimeout(debounce);
    }, [totalQuantity]);
    return (
        <div className={container} onClick={() => navigate(to)}>
            <div className={iconWrapper}>
                {svgIcon}
                {totalQuantity > 0 && (
                    <div className={quantityStyle}>{totalQuantity}</div>
                )}
            </div>
            <h3>{title}</h3>
        </div>
    );
};

export default HeaderCounter;