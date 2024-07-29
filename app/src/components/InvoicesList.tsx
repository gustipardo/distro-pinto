import React, { useEffect, useState } from "react";
import { getInvoices } from "../services/getInvoices";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Invoice {
  id: number;
  date: string;
  client: string;
  amount: number;
  cash: number;
  mp_vani: number;
  mp_gus: number;
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Listado de Facturas</h1>
      <div className="flex items-center gap-4 mb-6">
        <input
          type="date"
          value={dateSelected}
          onChange={(e) => setDateSelected(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <Button
          onClick={() => loadInvoices(dateSelected)}
        >
          Recargar
        </Button>
      </div>
      <Table>
        <TableCaption>Listado de facturas para la fecha seleccionada.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead className="text-right">Monto</TableHead>
            <TableHead className="text-right">Efectivo</TableHead>
            <TableHead className="text-right">Mp Vani</TableHead>
            <TableHead className="text-right">Mp Gus</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>{invoice.client}</TableCell>
              <TableCell className="text-right">{invoice.amount}</TableCell>
              <TableCell className="text-right">{invoice.cash}</TableCell>
              <TableCell className="text-right">{invoice.mp_vani}</TableCell>
              <TableCell className="text-right">{invoice.mp_gus}</TableCell>

            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total de facturas</TableCell>
            <TableCell className="text-right">
              {/* Aquí puedes agregar una suma total si lo deseas */}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default InvoicesList;
