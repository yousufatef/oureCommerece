import { IProducts } from "@customTypes/product"
import styles from "./styles.module.css"

type CartSubTotalPriceProps = { products: IProducts[] }

const CartSubTotalPrice = ({ products }: CartSubTotalPriceProps) => {
    const subtotal = products.reduce((accumulator, el) => {
        const price = el.price;
        const quantity = el.quantity;
        if (quantity && typeof quantity === "number") {
            return accumulator + price * quantity;
        } else {
            return accumulator;
        }
    }, 0);

    return (
        <div className={styles.container}>
            <span>Subtotal:</span>
            <span>{subtotal.toFixed(2)} EGP</span>
        </div>
    );
};
export default CartSubTotalPrice