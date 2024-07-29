import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import InvoicesList from "./components/InvoicesList";
import AddInvoice from "./components/AddInvoice";
import Placeholder from "./components/Placeholder";
import Home from "./components/Home";

const App: React.FC = () => {
  return (
    <div className="App">
      <Sidebar />
      <Routes>
        <Route path="/invoices" element={<InvoicesList />} />
        <Route path="/add-invoice" element={<AddInvoice />} />
        <Route path="/placeholder" element={<Placeholder />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
