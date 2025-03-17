import { Button, Form } from "react-bootstrap"
import styles from "./styles.module.css"
import { IProducts } from "@types"
import React, { memo } from "react"
import ProductInfo from "../ProductInfo/ProductInfo"
const { cartItem } = styles

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
      <ProductInfo title={title} price={price} img={img} direction="column">
        <Button
          onClick={removeItem}
          variant="danger"
          style={{ color: "white", width: "100px" }}
          className="mt-auto"
        >Remove</Button>
      </ProductInfo>
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