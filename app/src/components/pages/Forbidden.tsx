import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button'; // Asegúrate de que la ruta sea correcta

export const Forbidden: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800">401</h1>
            <p className="text-xl text-gray-600 mt-4">Oops! No tiene autorizacion para acceder a esta pagina</p>
            <Button onClick={handleGoHome} className="mt-6">
                Volver al Inicio
            </Button>
        </div>
    );
};
