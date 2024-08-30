import { authStore } from "@/store/authStore";
import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";


export const Profile: React.FC = () => {
    const userData = authStore((state) => state.userData);
    const accessToken = authStore((state) => state.accessToken);
    const navigate = useNavigate();
    const logout = authStore((state) => state.logout);

    const handleLogout = async () => {
        navigate('/login');
        await logout();
    };
    return (
        <Card className="flex justify-center items-center h-screen">
            <div className="bg-white rounded-lg p-8">
                <h1 className="text-2xl font-bold mb-4">Perfil del Usuario</h1>
                <p className="text-gray-700"><strong>Nombre:</strong> {userData?.username}</p>
                <p className="text-gray-700 mb-4"><strong>Rol:</strong> {userData?.role_name}</p>
                {accessToken}
                <Button onClick={handleLogout}>Cerrar sesión</Button>
            </div>
        </Card>
    );
}
