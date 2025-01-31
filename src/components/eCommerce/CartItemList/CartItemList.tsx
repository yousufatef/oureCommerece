import { IProducts } from "@customTypes/product"
import CartItem from "../CartItem/CartItem"

type TCartItemListProps = {
    products: IProducts[]
}
const CartItemList = ({products}: TCartItemListProps) => {
    const renderList = products.map( el => <CartItem key={el.id} {...el} />)
    return (
        <>
            {renderList}
        </>
    )
}

export default CartItemList