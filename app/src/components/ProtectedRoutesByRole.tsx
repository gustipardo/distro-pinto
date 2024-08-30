import { authStore } from "@/store/authStore"
import { Outlet } from "react-router-dom"
import { Forbidden } from "./pages/Forbidden"


const ProtectedRoutes = () => {
    const userData = authStore((state) => state.userData)

    return (userData?.role_name === 'administrator') ? <Outlet /> : <Forbidden />


}

export default ProtectedRoutes