import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import InvoicesList from "./components/InvoicesList";
import AddInvoice from "./components/AddInvoice";
import Placeholder from "./components/Placeholder";

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/invoices" element={<InvoicesList />} />
        <Route path="/add-invoice" element={<AddInvoice />} />
        <Route path="/placeholder" element={<Placeholder />} />
      </Routes>
    </div>
  );
}

export default App;
