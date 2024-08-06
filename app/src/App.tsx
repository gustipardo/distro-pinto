import { Routes, Route } from "react-router-dom";
import "./App.css";
import {Sidebar} from "./components/Sidebar";
import InvoicesList from "./components/pages/InvoicesList";
import {AddInvoice} from "./components/pages/AddInvoice";
import {Placeholder} from "./components/Placeholder";
import Home from "./components/Home";
import { Suppliers } from "./components/pages/Suppliers";

export const App = () => {
  return (
    <div className="App">
      <Sidebar />
      <Routes>
        <Route path="/facturas" element={<InvoicesList />} />
        <Route path="/agregar-facturas" element={<AddInvoice />} />
        <Route path="/placeholder" element={<Placeholder />} />
        <Route path="/" element={<Suppliers />} />
        <Route path="/proveedores" element={<Suppliers />} />
      </Routes>
    </div>
  );
}

export default App;
