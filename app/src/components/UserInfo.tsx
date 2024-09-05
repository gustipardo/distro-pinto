import { authStore } from "@/store/authStore";
import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "./ui/card";


export const UserInfo: React.FC = () => {
    const userData = authStore((state) => state.userData);
/*     const accessToken = authStore((state) => state.accessToken);
 */    const navigate = useNavigate();
    const logout = authStore((state) => state.logout);
    /*     const refreshAcessToken = authStore((state) => state.refreshAcessToken);
     */
    const handleLogout = async () => {
        navigate('/login');
        await logout();
    };

    /*     const handleRefresToken = async () => {
            await refreshAcessToken();
        }; */
    return (
        <Card>
            <div className="rounded-lg p-8">
                <h1 className="text-2xl font-bold">Perfil del Usuario</h1>
                <p className="text-gray-700"><strong>Nombre:</strong> {userData?.username}</p>
                <p className="text-gray-700"><strong>Rol:</strong> {userData?.role_name}</p>
                {/*                 <p className="text-gray-700 mb-4"><strong>Rol:</strong> {userData?.role_name}</p>
                {accessToken} */}
                <Button className="mt-4" onClick={handleLogout}>Cerrar sesión</Button>
                {/*                 <Button onClick={handleRefresToken}>Refrescar Access Token</Button>
 */}            </div>
        </Card>
    );
}
