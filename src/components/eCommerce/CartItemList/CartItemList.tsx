import { IProducts } from "@customTypes/product"
import CartItem from "../CartItem/CartItem"

type TCartItemListProps = {
    products: IProducts[],
    changeQuantityHandler: (id: number, quantity: number) => void,
    removeItemHandler: (id: number) => void,
}
const CartItemList = ({ products, changeQuantityHandler, removeItemHandler }: TCartItemListProps) => {
    const renderList = products.map(el => <CartItem key={el.id} {...el} changeQuantityHandler={changeQuantityHandler} removeItemHandler={removeItemHandler} />)
    return (
        <>
            {renderList}
        </>
    )
}

export default CartItemList