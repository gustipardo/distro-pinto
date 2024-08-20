import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import InvoicesList from "./components/pages/InvoicesList";
import { AddInvoice } from "./components/pages/AddInvoice";
import { Placeholder } from "./components/Placeholder";
import Home from "./components/pages/Home";
import { Suppliers } from './components/pages/Suppliers';
import { Stadistic } from "./components/pages/Statistics";
import { Toaster } from "./components/ui/toaster";

export const App = () => {
  return (
    <div className="App">
      <Sidebar />
      <Routes>
        <Route path="/facturas" element={<InvoicesList />} />
        <Route path="/agregar-facturas" element={<AddInvoice />} />
        <Route path="/placeholder" element={<Placeholder />} />
        <Route path="/" element={<Home />} />
        <Route path="/proveedores" element={<Suppliers />} />
        <Route path="/estadisticas" element={<Stadistic />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
