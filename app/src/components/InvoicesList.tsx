import React, { useEffect, useState } from "react";
import { getInvoices } from "../services/getInvoices";

interface Invoice {
  id: number;
  date: string;
  client: string;
  amount: number;
  created_at: string;
}

const InvoicesList: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [dateSelected, setDateSelected] = useState<string>(new Date().toISOString().split('T')[0]); // Default to today's date

  const loadInvoices = async (date?: string) => {
    try {
      const data = await getInvoices(date);
      setInvoices(data);
    } catch (error) {
      console.error("Error loading invoices:", error);
    }
  };

  useEffect(() => {
    loadInvoices(dateSelected);
  }, [dateSelected]);

  return (
    <div>
      <h1>Listado de Facturas</h1>
      <input
        type="date"
        value={dateSelected}
        onChange={(e) => setDateSelected(e.target.value)}
      />
      <button onClick={() => loadInvoices(dateSelected)}>Recargar</button>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            <p>ID: {invoice.id}</p>
            <p>Fecha: {invoice.date}</p>
            <p>Cliente: {invoice.client}</p>
            <p>Monto: {invoice.amount}</p>
            <p>Creado el: {invoice.created_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InvoicesList;
