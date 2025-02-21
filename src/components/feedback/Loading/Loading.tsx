import { TLoading } from "@/shared"

type ILoading = {
    status: TLoading,
    error: string | null,
    children: React.ReactNode
}
const Loading = ({ status, error, children }: ILoading) => {
    if (status === "pending") {
        return <div>Loading please wait...</div>
    } else if (status === "failed") {
        return <div>{error}</div>
    } else {
        return <>{children}</>
    }
}

export default Loading

// Using Compose The Component Pattern 