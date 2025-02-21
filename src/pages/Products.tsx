import { GridList, Heading } from "@components/common";
import { Product } from "@components/eCommerce"
import Loading from "@components/feedback/Loading/Loading";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { cleanUp, thunkGetProducts } from "@store/products/productsSlice";
import { useEffect } from "react";
import { Container } from "react-bootstrap"
import { useParams } from "react-router-dom";

const Products = () => {
  const params = useParams()
  const dispatch = useAppDispatch();
  const { loading, error, record } = useAppSelector((state) => state.products);

  const cartItems = useAppSelector((state) => state.cart.items)
  const wishlistItemsId = useAppSelector((state) => state.wishlist.itemsId)

  const productsFullInfo = record.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: wishlistItemsId.includes(el.id)
  }));


  useEffect(() => {
    dispatch(thunkGetProducts(params.prefix as string));
    return () => {
      dispatch(cleanUp());
    }
  }, [dispatch, params]);
  return (
    <Container>
      <Heading><span className="text-capitalize">{params.prefix}</span> Products</Heading>
      <Loading status={loading} error={error}>
        <GridList record={productsFullInfo} renderItem={(record) => <Product {...record} />} />
      </Loading>
    </Container>
  )
}

export default Products