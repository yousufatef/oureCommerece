import CategorySkeleton from "../Skeletons/CategorySkeleton";
import ProductSkeleton from "../Skeletons/ProductSkeleton";
import TableSkeleton from "../Skeletons/TableSkeleton";
import CartSkeleton from "../Skeletons/CartSkeleton";
import LottieHandler from "../LottieHandler/LottieHandler";


import { TLoading } from "@types";

const skeletonsTypes = {
    category: CategorySkeleton,
    product: ProductSkeleton,
    cart: CartSkeleton,
    table: TableSkeleton,
};

type LoadingProps = {
    status: TLoading;
    error: null | string;
    children: React.ReactNode;
    type?: keyof typeof skeletonsTypes;
};

const Loading = ({
    status,
    error,
    children,
    type = "category",
}: LoadingProps) => {
    const Component = skeletonsTypes[type];

    if (status === "pending") {
        return <Component />;
    }
    if (status === "failed") {
        return (
            <div>
                <LottieHandler type="error" message={error as string} />
                {error}
            </div>
        );
    }
    return <div>{children}</div>;
};

export default Loading;