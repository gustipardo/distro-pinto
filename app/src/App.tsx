import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import InvoicesList from "./components/pages/InvoicesList";
import { AddInvoice } from "./components/pages/AddInvoice";
import { Placeholder } from "./components/Placeholder";
import Home from "./components/pages/Home";
import { Suppliers } from './components/pages/Suppliers';
import { Stadistic } from "./components/pages/Statistics";
import { Toaster } from "./components/ui/toaster";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { getCookie } from "./services/getCookie";
import { useEffect } from "react";

export const App = () => {
  const location = useLocation();
  const isAuthenticated = true;

  return (
    <div className="App">
      {/* Render Sidebar only if the current route is not '/login' */}
      {(location.pathname === "/login" || location.pathname === "/register") ? null : <Sidebar />}
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route
          path="/facturas"
          element={isAuthenticated ? <InvoicesList /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/agregar-facturas"
          element={isAuthenticated ? <AddInvoice /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/placeholder"
          element={isAuthenticated ? <Placeholder /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/proveedores"
          element={isAuthenticated ? <Suppliers /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/estadisticas"
          element={isAuthenticated ? <Stadistic /> : <Navigate to="/login" replace />}
        />
      </Routes>
      
      <Toaster />
    </div>
  );
};

export default App;
