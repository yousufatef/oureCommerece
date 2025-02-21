
import { Container } from "react-bootstrap";
import { GridList, Heading } from "@components/common";
import { Category } from "@components/eCommerce";
import Loading from "@components/feedback/Loading/Loading";
import useCategories from "@hooks/useCategories";

const Categories = () => {
    const { loading, error, record } = useCategories()

    return (
        <Container>
            <Heading title={"Categories"} />
            <Loading status={loading} error={error}>
                <GridList
                    record={record}
                    renderItem={(record) => <Category {...record} />}
                />
            </Loading>
        </Container>
    ); 
};

export default Categories;