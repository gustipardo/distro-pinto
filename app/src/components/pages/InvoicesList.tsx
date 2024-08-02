import { useEffect, useState } from "react";
import { getInvoices } from "@/services/getInvoices";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
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

export const InvoicesList = () => {
  const [invoices, setInvoices] = useState<InvoiceAndPayments[]>([]);
  const [dateSelected, setDateSelected] = useState<Date | undefined>(new Date()); // Default to today's date

  const loadInvoices = async (date?: string) => {
    try {
      const data = await getInvoices(date);
      setInvoices(data);
    } catch (error) {
      console.error("Error loading invoices:", error);
    }
  };

  useEffect(() => {
    if (dateSelected) {
      loadInvoices(dateSelected.toISOString().split('T')[0]);
    }
  }, [dateSelected]);

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
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] pl-3 text-left font-normal">
              {dateSelected ? (
                new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium' }).format(dateSelected)
              ) : (
                <span>Selecciona una fecha</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateSelected}
              onSelect={setDateSelected}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button onClick={() => loadInvoices(dateSelected?.toISOString().split('T')[0])}>
          Recargar
        </Button>
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
              <TableCell>{invoice.date}</TableCell>
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
