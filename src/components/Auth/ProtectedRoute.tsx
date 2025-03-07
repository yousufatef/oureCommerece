import { useAppSelector } from "@store/hooks"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { accessToken } = useAppSelector((state) => state.auth);

    if (!accessToken) {
       return <Navigate to="/login?message=login_required" />
    }
    return <>{children}</>
}

export default ProtectedRoute