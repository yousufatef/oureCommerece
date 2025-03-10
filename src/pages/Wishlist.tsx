import { GridList, Heading } from "@components/common"
import { Product } from "@components/eCommerce"
import Loading from "@components/feedback/Loading/Loading"
import useWishlist from "@hooks/useWishlist"


const Wishlist = () => {
  const { error, loading, records } = useWishlist()

  return (
    <div>
      <Heading title={"Your Wishlist"} />
      <Loading status={loading} error={error} type="product">
        <>
          <GridList record={records}
            emptyMessage="Your wishlist is empty"
            renderItem={(records) => <Product {...records} />} />
        </>
      </Loading>
    </div>
  )
}

export default Wishlist