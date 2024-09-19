import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import { CalendarPicker } from "../reusable/CalendarPicker";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { authStore } from "@/store/authStore";
import { Balance } from "./Balance";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { formatDateToYYYYMMDD } from "@/services/formatDate";
import { getRoadmapByDate } from "@/services/getRoadmapByDate";
import { getInvoiceById } from "@/services/getInvoiceById";

interface Invoice {
  id: number;
  client: string;
  date: string;
  amount: number;
  credit_note: number;
}

export const Home: React.FC = () => {
  const [manualInvoices, setManualInvoices] = useState<any[]>([]);
  const [additionalRows, setAdditionalRows] = useState<number[]>([]);
  const userData = authStore((state) => state.userData);
  const [roadmapDate, setRoadmapDate] = useState<string>('')
  const [invoices, setInvoices] = useState<Invoice[]>([]);


  const data = [
    {
      id: 1,
      date: "2023-01-01",
      client: "Cliente 1",
      total: 100
    },
    {
      id: 2,
      date: "2023-01-02",
      client: "Cliente 2",
      total: 200
    },
    {
      id: 3,
      date: "2023-01-03",
      client: "Cliente 3",
      total: 300
    }
  ]

  const handleAddRow = () => {
    setAdditionalRows([...additionalRows, additionalRows.length]);
    setManualInvoices([
      ...manualInvoices,
    ]);
  };

  const handleDateChange = (date: Date | undefined) => {
    console.log("Fecha seleccionada:", date);
    if (date) {
      setRoadmapDate(formatDateToYYYYMMDD(date))

    }
  };

  const handleClick = async () => {
    try {
      // Vaciar el estado de invoices antes de hacer las nuevas peticiones
      setInvoices([]);

      const data = await getRoadmapByDate(roadmapDate);
      const invoiceIds = data.map((item: { invoice_id: number; }) => item.invoice_id);
      console.log("data", invoiceIds);

      // Usar Promise.all para esperar todas las peticiones antes de actualizar el estado
      const invoicePromises = invoiceIds.map(async (id: number) => {
        console.log("Peticion", id);
        try {
          const response = await getInvoiceById(id);
          return response[0]; // Asumiendo que response[0] es la factura correcta
        } catch (error) {
          console.error(`Error fetching invoice with id ${id}:`, error);
          return null; // Devolver null en caso de error
        }
      });

      const fetchedInvoices = await Promise.all(invoicePromises);

      // Filtrar facturas válidas (no nulas)
      const validInvoices = fetchedInvoices.filter((invoice) => invoice !== null);

      // Verificar si hay facturas duplicadas y añadir solo las nuevas
      setInvoices((prevInvoices) => {
        const newInvoices = validInvoices.filter(
          (newInvoice) => !prevInvoices.some((existingInvoice) => existingInvoice.id === newInvoice.id)
        );
        return [...prevInvoices, ...newInvoices];
      });

      console.log("Invoices", validInvoices);
    } catch (error) {
      console.error("Error loading roadmap:", error);
    }
  };


  return (
    <div className="flex justify-center items-center flex-col h-full">
      <Card>
        <Label>Seleccion fecha de hoja de ruta</Label>
        <CalendarPicker onDateChange={handleDateChange} />
        <Button onClick={handleClick}>Consultar Hoja de ruta</Button>

      </Card>
      <Card>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Hoja de ruta de FECHA</h1>
          <div>
            <h2 className="text-xl font-bold mb-4 text-left">Ingresos de clientes</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px] text-center">Fecha</TableHead>
                  <TableHead className="text-left">Cliente</TableHead>
                  <TableHead className="text-right w-[200px]">Total</TableHead>
                  <TableHead className="w-[200px] text-center">Efectivo</TableHead>
                  <TableHead className="w-[200px] text-center">Mp Vani</TableHead>
                  <TableHead className="w-[200px] text-center">Mp Gus</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice, index) => {
                  return (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell className="text-left">{invoice.client}</TableCell>
                      <TableCell className="text-right">${invoice.amount}</TableCell>
                      <TableCell className="text-right"><Input></Input></TableCell>
                      <TableCell className="text-right"><Input></Input></TableCell>
                      <TableCell className="text-right"><Input></Input></TableCell>
                    </TableRow>
                  )
                })
                }
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={5}>Total</TableCell>
                  <TableCell className="text-right">
                    {/* Suma total si es necesario */}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4 text-left">Egresos generales</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[300px] flex-grow text-center">Descripción</TableHead>
                  <TableHead className="w-[200px] text-center">Efectivo</TableHead>
                  <TableHead className="w-[200px] text-center">Mp Vani</TableHead>
                  <TableHead className="w-[200px] text-center">Mp Gus</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {additionalRows.map((_, index) => (
                  <TableRow key={index}>
                    <TableCell className="min-w-[300px] flex-grow">
                      <Input type="text" placeholder="Descripción" />
                    </TableCell>
                    <TableCell className="w-[200px]">
                      <Input />
                    </TableCell>
                    <TableCell className="w-[200px]">
                      <Input />
                    </TableCell>
                    <TableCell className="w-[200px]">
                      <Input />
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>
                    <Button variant="outline" size="icon" onClick={handleAddRow}>
                      <PlusIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4}>Total</TableCell>
                  <TableCell className="text-right">
                    {/* Suma total si es necesario */}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            {userData?.role_name === 'administrator' ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Generar balance de FECHA</Button>
                </DialogTrigger>
                <DialogContent className="w-auto max-w-screen max-h-screen overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Balance de FECHA</DialogTitle>
                  </DialogHeader>
                  <Balance />
                  <DialogFooter>
                    <Button type="submit">Guardar Saldo de FECHA</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>) : null}
          </div>
        </div>
      </Card>
    </div>
  );
}