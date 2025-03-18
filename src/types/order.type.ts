import { IProducts } from "./product.types"

export type TOrderItem = {
    id: number,
    userId: number,
    items: IProducts[],
    subtotal: number,

}