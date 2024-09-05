import { Routes, Route } from "react-router-dom";
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
import { NotFound } from "./components/pages/NotFound";
import { Profile } from "./components/pages/Profile";
import ProtectedRoutesByRole from "./components/ProtectedRoutesByRole";

export const App = () => {
  const isAuthenticated = authStore((state) => state.isAuthenticated)

  return (
    <div className="App">
      {isAuthenticated && <Sidebar />}
      <Routes>
        <Route path="/login" element={<Login />} />
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