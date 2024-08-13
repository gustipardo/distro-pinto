import { useEffect, useState } from "react";
import { getInvoices } from "@/services/getInvoices";
import { DateRangePicker } from "../reusable/date-range-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Label } from "@/components/ui/label";
import { SelectEntities } from "../reusable/SelectEntities";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "../ui/card";

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

  const handleEntitySelect = (selectedEntity: { id: string; name: string }) => {
    console.log("Entidad seleccionada:", selectedEntity);
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
  <div className="flex flex-col md:flex-row gap-4 mb-6">

        <div className="flex flex-col items-start gap-4">
        <Label className="bg-gray-100 text-gray-600 p-2 rounded-md w-full h-10 flex items-center justify-center">Seleccione un rango de fechas</Label>
        <DateRangePicker
          locale="es-AR"
          showCompare={false}
          onUpdate={handleDateRangeUpdate}
        />
      </div>
<Card className="w-full flex flex-col md:flex-row gap-4 mb-6 p-6">
      <div className="flex flex-col items-start md:w-[480px]">
      <Tabs defaultValue="client" className="w-full flex flex-col gap-2">
        <TabsList>
          <TabsTrigger value="client">Clientes</TabsTrigger>
          <TabsTrigger value="supplier">Proveedores</TabsTrigger>
        </TabsList>
        <TabsContent value="client">
          <Label className="text-sm text-left block">Filtrar por un cliente:</Label>
          <SelectEntities isCustomer={true} onSelectEntity={handleEntitySelect} />
        </TabsContent>
        <TabsContent value="supplier">
          <Label className="text-sm text-left block">Filtrar por un proveedor:</Label>
          <SelectEntities isCustomer={false} onSelectEntity={handleEntitySelect} />
        </TabsContent>
      </Tabs>
      </div>  
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="paid" />
            <label
              htmlFor="paid"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Pagadas
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="pending" />
            <label
              htmlFor="pending"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Pendientes
            </label>
          </div>
        </div>
        <Button className="w-full">Filtrar</Button>
    </Card>
  </div>

    
      <Table>
        <TableCaption>Listado de facturas para la fecha seleccionada.</TableCaption>
        <TableHeader>
          <TableRow className="text-left">
            <TableHead >ID</TableHead>
            <TableHead >Fecha</TableHead>
            <TableHead >Entidad</TableHead>
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
