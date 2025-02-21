import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "@store";

const getCartTotalQuantitySelector = createSelector((state: RootState) => state.cart.items, (items) => {
    const totalQuantity = Object.values(items).reduce((acc, quantity) => acc + quantity, 0)
    return totalQuantity
})


export  {getCartTotalQuantitySelector}