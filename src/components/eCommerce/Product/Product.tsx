import { Button } from "react-bootstrap";
import styles from "./styles.module.css";
const { product, productImg } = styles;

const Product = () => {
    return (
        <div className={product}>
            <div className={productImg}>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8RkrzdHQ8KyY8iyjbBCL1ibN4dnOtUpAI1A&s"
                    alt=""
                />
            </div>
            <h2>Title</h2>
            <h3>10 EGP</h3>
            <Button variant="info" style={{ color: "white" }}>
                Add to cart
            </Button>
        </div>
    );
};

export default Product;