import React, { useState } from "react";
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
import { ArrowRightIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SelectTypeOfPayment } from "../reusable/SelectTypeOfPayment";
import { Movement, PaymentMethod } from "@/commons/Interfaces"
import { addMovement } from "@/services/addMovement";
import { getMovementByDate } from "@/services/getMovementByDate";



interface Invoice {
  id: number;
  client: string;
  date: string;
  amount: number;
  credit_note: number;
}

export const Home: React.FC = () => {
  const userData = authStore((state) => state.userData);
  const [roadmapDate, setRoadmapDate] = useState<string>(formatDateToYYYYMMDD(new Date()))
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [movement, setMovement] = useState<Movement>({
    date: roadmapDate,
    description: "",
    amount: 0,
    type: "expense",
    payment_method: "cash"
  });

  const handleDateChange = (date: Date | undefined) => {
    console.log("Fecha seleccionada:", date);
    if (date) {
      setRoadmapDate(formatDateToYYYYMMDD(date))
      setMovement((prev) => ({ ...prev, date: formatDateToYYYYMMDD(date) }))
    }
  };

  const handleClick = async () => {
    try {
      // Vaciar el estado de invoices y movements antes de hacer las nuevas peticiones
      setInvoices([]);
      setMovements([]);

      // Obtener las facturas por la fecha seleccionada
      const invoices = await getRoadmapByDate(roadmapDate);
      const invoiceIds = invoices.map((item: { invoice_id: number }) => item.invoice_id);
      console.log("data", invoiceIds);

      // Obtener las facturas usando Promise.all
      const invoicePromises = invoiceIds.map(async (id: number) => {
        try {
          const response = await getInvoiceById(id);
          return response[0]; // Asumiendo que response[0] es la factura correcta
        } catch (error) {
          console.error(`Error fetching invoice with id ${id}:`, error);
          return null;
        }
      });
      const fetchedInvoices = await Promise.all(invoicePromises);
      const validInvoices = fetchedInvoices.filter((invoice) => invoice !== null);
      setInvoices((prevInvoices) => [...prevInvoices, ...validInvoices]);

      // Obtener movimientos por la fecha seleccionada
      const movements = await getMovementByDate(roadmapDate);
      setMovements(movements); // Actualizar el estado con los movimientos obtenidos
      console.log("Movements", movements);
    } catch (error) {
      console.error("Error loading roadmap or movements:", error);
    }
  };

  const handleSendExpense = async () => {
    try {
      console.log("General expense", movement);
      const response = await addMovement({
        date: movement.date,
        description: movement.description,
        amount: movement.amount,
        payment_method: movement.payment_method,
        type: movement.type
      });

      // Obtener los movimientos actualizados
      const movements = await getMovementByDate(roadmapDate);
      setMovements(movements);
      console.log("res", response);

      // Vaciar los campos de descripción y monto
      setMovement((prev) => ({
        ...prev,
        description: "",
        amount: 0,
      }));

      return response;
    } catch (error) {
      console.error("Error sending general expense:", error);
    }
  };


  const handleMovementChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setMovement((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) || 0 : value,
    }));
  };

  const handlePaymentChange = (payment_method: PaymentMethod) => {
    setMovement((prev) => ({ ...prev, payment_method }));
  };


  return (
    <div className="flex justify-center items-center flex-col h-full p-4">
      <Card className="w-full max-w-lg p-4 mb-4">
        <div className="flex flex-col space-y-4">
          <Label>Seleccion fecha de hoja de ruta</Label>
          <CalendarPicker onDateChange={handleDateChange} />
          <Button onClick={handleClick} className="w-full sm:w-auto">Consultar Hoja de ruta</Button>
        </div>
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
                    <TableRow key={index}>
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
                  <TableHead className="w-[200px] text-center">Monto</TableHead>
                  <TableHead className="w-[200px] text-center">Tipo de pago</TableHead>
                  <TableHead className="w-[200px] text-center">Tipo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movements.map((movement, index) => {
                  const paymentMethodMap = {
                    cash: "Efectivo",
                    mp_vani: "Mp Vani",
                    mp_gus: "Mp Gus",
                  };

                  const typeMap = {
                    expense: "Egreso",
                    income: "Ingreso",
                  };

                  return (
                    <TableRow key={index}>
                      <TableCell className="min-w-[300px] flex-grow">
                        {movement.description}
                      </TableCell>
                      <TableCell className="w-[400px]">
                        {movement.amount}
                      </TableCell>
                      <TableCell className="w-[120px]">
                        {paymentMethodMap[movement.payment_method] || movement.payment_method}
                      </TableCell>
                      <TableCell className="w-[120px]">
                        {typeMap[movement.type] || movement.type}
                      </TableCell>
                      <TableCell className="w-[80px]">
                      </TableCell>
                    </TableRow>
                  );
                })}


                <TableRow>
                  <TableCell className="min-w-[300px] flex-grow">
                    <Input
                      type="text"
                      placeholder="Descripción"
                      value={movement.description}
                      name="description"
                      onChange={handleMovementChange}
                    />
                  </TableCell>
                  <TableCell className="w-[400px]">
                    <Input
                      type="number"
                      name="amount"
                      value={movement.amount}
                      placeholder="Monto"
                      onChange={handleMovementChange}
                    />
                  </TableCell>
                  <TableCell className="w-[120px]">
                    <SelectTypeOfPayment

                      onPaymentChange={handlePaymentChange}
                    />
                  </TableCell>
                  <TableCell className="w-[120px]">
                    <Select
                      name="type"
                      defaultValue="expense"
                      onValueChange={(value) => handleMovementChange({ target: { name: 'type', value } } as React.ChangeEvent<HTMLSelectElement>)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="expense">Egreso</SelectItem>
                          <SelectItem value="income">Ingreso</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="w-[80px]">
                    <Button size="icon" onClick={handleSendExpense}>
                      <ArrowRightIcon />
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
                  <Balance date={roadmapDate} />
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