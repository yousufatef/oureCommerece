import { useAppDispatch, useAppSelector } from "@store/hooks";
import { thunkGetCategories, categoriesRecordCleanUp } from "@store/categories/categoriesSlice";
import { useEffect } from "react";

const useCategories = () => {
    const dispatch = useAppDispatch();
    const { loading, error, record } = useAppSelector((state) => state.categories);

    useEffect(() => {
        const promise = dispatch(thunkGetCategories());
        return () => {
            promise.abort()
            dispatch(categoriesRecordCleanUp());
        }
    }, [dispatch]);
    return { loading, error, record }
}

export default useCategories