import { GridList, Heading } from "@components/common"
import { Product } from "@components/eCommerce"
import Loading from "@components/feedback/Loading/Loading"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { productsFullInfoCleanUp, thunkGetWishlist } from "@store/wishlist/wishlistSlice"
import { useEffect } from "react"

const Wishlist = () => {
  const dispatch = useAppDispatch()
  const { productsFullInfo, loading, error } = useAppSelector((state) => state.wishlist)
  const cartItems = useAppSelector((state) => state.cart.items)
  const records = productsFullInfo.map((el) => ({ ...el, quantity: cartItems[el.id], isLiked: true }))

  useEffect(() => {
    dispatch(thunkGetWishlist())
    return () => {
      dispatch(productsFullInfoCleanUp())
    }
  }, [dispatch])


  return (
    <div>
      <Heading>Your Wishlist</Heading>
      <Loading status={loading} error={error}>
        <>
          <GridList record={records} renderItem={(records) => <Product {...records} />} />
        </>
      </Loading>
    </div>
  )
}

export default Wishlist