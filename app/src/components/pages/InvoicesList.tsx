import { useEffect, useState } from "react";
import { getInvoices } from "@/services/getInvoices";
import { DateRangePicker } from "../reusable/date-range-picker";
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
import { InvoiceAndPayments } from "@/commons/Interfaces";
import { formatDateToYYYYMMDD, formatDateToDDMMYYYY } from "@/services/formatDate";

export const InvoicesList = () => {
  const [invoices, setInvoices] = useState<InvoiceAndPayments[]>([]);


  useEffect(() => {
    handleDateRangeUpdate({ range: { from: new Date(), to: new Date() } });
  }, []);

  const handleDateRangeUpdate = async (values: { range: any}) => {
    /* console.log("From:", values.range.from, "To:", values.range.to); */
    const from = formatDateToYYYYMMDD(values.range.from);
    const to = values.range.to ? formatDateToYYYYMMDD(values.range.to) : from;
    try {
      const data = await getInvoices(from, to);
      setInvoices(data);
    } catch (error) {
      console.error("Error loading invoices:", error);
    }
  };

  const totals = invoices.reduce(
    (acc, invoice) => {
      acc.total += invoice.amount;
      acc.cash += invoice.cash;
      acc.mpVani += invoice.mp_vani;
      acc.mpGus += invoice.mp_gus;
      return acc;
    },
    { total: 0, cash: 0, mpVani: 0, mpGus: 0 }
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Listado de Facturas</h1>
      <div className="flex items-center gap-4 mb-6">

        <DateRangePicker
            locale="es-AR"
            showCompare={false}
            onUpdate={handleDateRangeUpdate} // Pasa el callback aquí
          />
      </div>
      <Table>
        <TableCaption>Listado de facturas para la fecha seleccionada.</TableCaption>
        <TableHeader>
          <TableRow className="text-left">
            <TableHead >ID</TableHead>
            <TableHead >Fecha</TableHead>
            <TableHead >Cliente</TableHead>
            <TableHead >Monto</TableHead>
            <TableHead >Efectivo</TableHead>
            <TableHead >Mp Vani</TableHead>
            <TableHead >Mp Gus</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id} className="text-left">
              <TableCell>{invoice.id}</TableCell>
              <TableCell>{formatDateToDDMMYYYY(invoice.date)}</TableCell>
              <TableCell>{invoice.client}</TableCell>
              <TableCell>$ {invoice.amount}</TableCell>
              <TableCell>$ {invoice.cash}</TableCell>
              <TableCell>$ {invoice.mp_vani}</TableCell>
              <TableCell>$ {invoice.mp_gus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="text-left font-bold">
            <TableCell className="text-center" colSpan={3}>Totales</TableCell>
            <TableCell>$ {totals.total.toFixed(2)}</TableCell>
            <TableCell>$ {totals.cash.toFixed(2)}</TableCell>
            <TableCell>$ {totals.mpVani.toFixed(2)}</TableCell>
            <TableCell>$ {totals.mpGus.toFixed(2)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default InvoicesList;
