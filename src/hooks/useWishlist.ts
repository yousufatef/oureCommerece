import { useAppDispatch, useAppSelector } from "@store/hooks"
import { cleanWishlistProductsFullInfo, thunkGetWishlist } from "@store/wishlist/wishlistSlice"
import { useEffect } from "react"

const useWishlist = () => {
    const dispatch = useAppDispatch()
    const { productsFullInfo, loading, error } = useAppSelector((state) => state.wishlist)
    const cartItems = useAppSelector((state) => state.cart.items)
    const records = productsFullInfo.map((el) => ({ ...el, quantity: cartItems[el.id], isLiked: true }))

    useEffect(() => {
        dispatch(thunkGetWishlist())
        return () => {
            dispatch(cleanWishlistProductsFullInfo())
        }
    }, [dispatch])
    return {error, loading, records}
}

export default useWishlist