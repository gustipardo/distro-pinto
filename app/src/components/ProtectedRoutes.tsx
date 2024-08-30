import { authStore } from "@/store/authStore"
import { Navigate, Outlet } from "react-router-dom"


const ProtectedRoutesByRole = () => {
    const isAuthenticated = authStore((state) => state.isAuthenticated)

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />


}

export default ProtectedRoutesByRole