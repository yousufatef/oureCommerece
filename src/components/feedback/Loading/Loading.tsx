import { TLoading } from "@types"
import CategorySkeleton from "../Skeletons/CategorySkeleton"

type ILoading = {
    status: TLoading,
    error: string | null,
    children: React.ReactNode
}
const Loading = ({ status, error, children }: ILoading) => {
    if (status === "pending") {
        return <CategorySkeleton />
    } else if (status === "failed") {
        return <div>{error}</div>
    } else {
        return <>{children}</>
    }
}

export default Loading

// Using Compose The Component Pattern 