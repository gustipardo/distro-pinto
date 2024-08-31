import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import InvoicesList from "./components/pages/InvoicesList";
import { AddInvoice } from "./components/pages/AddInvoice";
import { Placeholder } from "./components/Placeholder";
import { Home } from "./components/pages/Home";
import { Suppliers } from './components/pages/Suppliers';
import { Statistic } from "./components/pages/Statistics";
import { Toaster } from "./components/ui/toaster";
import { Login } from "./components/pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { authStore } from "./store/authStore";
import { Register } from "./components/pages/Register";
import { NotFound } from "./components/pages/NotFound";
import { Profile } from "./components/pages/Profile";
import ProtectedRoutesByRole from "./components/ProtectedRoutesByRole";
import { useLayoutEffect, useState } from "react";

export const App = () => {
  const [loading, setLoading] = useState(true);
  const isAuthenticated = authStore((state) => state.isAuthenticated)
  const validateAccessTokenStore = authStore((state) => state.validateAccessToken)

  useLayoutEffect(() => {
    const validateAccessToken = async () => {
      try {
        await validateAccessTokenStore();
      } catch (err) {
        console.log('Error validating access token:', err)
      } finally {
        setLoading(false);
      }
    };

    validateAccessToken();
    console.log('isAthtenticated', isAuthenticated);
  }, [validateAccessTokenStore]);

  if (loading) {
    return <div>Loading...</div>; // Or a more sophisticated loading indicator
  }


  return (
    <div className="App">
      {isAuthenticated && <Sidebar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/agregar-facturas" element={<AddInvoice />} />
          <Route path="/placeholder" element={<Placeholder />} />
          <Route path="/" element={<Home />} />
          <Route path="/proveedores" element={<Suppliers />} />
          <Route path="/estadisticas" element={<Statistic />} />
          <Route path="/facturas" element={<InvoicesList />} />
          <Route element={<ProtectedRoutesByRole />}>
            <Route path="/perfil" element={<Profile />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
      <Toaster />
    </div>
  );
}

export default App;