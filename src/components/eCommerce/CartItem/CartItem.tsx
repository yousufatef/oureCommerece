import { Button, Form } from "react-bootstrap"
import styles from "./styles.module.css"
import { IProducts } from "@t"
import React, { memo } from "react"
const { cartItem, product, productImg, productInfo } = styles

type TCartItemProps = IProducts & {
  changeQuantityHandler: (id: number, quantity: number) => void,
  removeItemHandler: (id: number) => void,
}

const CartItem = memo(({ id, title, price, img, quantity, max, changeQuantityHandler, removeItemHandler }: TCartItemProps) => {

  const renderOption = Array(max).fill(0).map((_, i) => {
    const quantity = i + 1;
    return <option key={i} value={quantity}>{quantity}</option>;
  });

  const changeQuantity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const quantity = +e.target.value
    changeQuantityHandler(id, quantity)
  };

  const removeItem = () => {
    removeItemHandler(id)
  }

  return (
    <div className={cartItem}>
      <div className={product}>
        <div className={productImg}>
          <img src={img} alt={title} />
        </div>
        <div className={productInfo}>
          <h2>{title}</h2>
          <h3>{price.toFixed(2)} EGP</h3>
          <Button
            onClick={removeItem}
            variant="danger"
            style={{ color: "white", width: "100px" }}
            className="mt-auto"
          >Remove</Button>
        </div>
      </div>
      <div >
        <span className="d-block mb-1" >Quantity</span>
        <Form.Select aria-label="Default select example" value={quantity} onChange={changeQuantity}>
          {renderOption}
        </Form.Select>
      </div>
    </div>
  )
})

export default CartItem