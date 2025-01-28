import { useAppDispatch, useAppSelector } from "@store/hooks";
import { thunkGetCategories } from "@store/categories/categoriesSlice";
import { Container } from "react-bootstrap";
import { useEffect } from "react";
import { GridList, Heading } from "@components/common";
import { Category } from "@components/eCommerce";
import Loading from "@components/feedback/Loading/Loading";

const Categories = () => {
    const dispatch = useAppDispatch();
    const { loading, error, record } = useAppSelector((state) => state.categories);

    useEffect(() => {
        if (!record.length) {
            dispatch(thunkGetCategories());
        }
    }, [dispatch, record]);

    return (
        <Container>
            <Heading>Categories</Heading>
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