import { GridList, Heading } from "@components/common";
import { Product } from "@components/eCommerce"
import Loading from "@components/feedback/Loading/Loading";
import useProducts from "@hooks/useProducts";
import { Container } from "react-bootstrap"


const Products = () => {
  const { error, loading, productsFullInfo, productPrefix } = useProducts()
  return (
    <Container>
      <Heading title={`${productPrefix?.toUpperCase()} Products`} />
      <Loading status={loading} error={error}>
        <GridList record={productsFullInfo} renderItem={(record) => <Product {...record} />} />
      </Loading>
    </Container>
  )
}

export default Products

