import React, { useEffect, useState } from "react";

interface Invoice {
  id: number;
  date: string;
  client: string;
  amount: number;
  created_at: string;
}

const InvoicesList: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    async function fetchInvoices() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/invoices`);
        if (!response.ok) {
          throw new Error("Error getting invoices");
        }
        const data = await response.json();
        setInvoices(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchInvoices();
  }, []);

  return (
    <div>
      <h1>Listado de Facturas</h1>
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
    