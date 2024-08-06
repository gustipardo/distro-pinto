import { getPendingInvoicesFromSuppliers } from "@/services/getPendingSuppliers"
import { useEffect, useState } from "react"
import { PendingInvoiceFromSupplier } from "@/commons/Interfaces"
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

import { AddSupplierInvoice } from "@/components/AddSupplierInvoice";
import { AddSupplierPayment } from "../AddSupplierPayment";
import { PaymentsOnHover } from "../PaymentsOnHover";
import { formatNumber } from "@/services/formatNumber";
import { Button } from "../ui/button";
import { PlusIcon } from "@radix-ui/react-icons";


export const Suppliers = () => {
    const [PendingInvoicesSuppliers, setPendingInvoicesSuppliers] = useState<PendingInvoiceFromSupplier[]>([])
    const [updateCount, setUpdateCount] = useState(0);

    useEffect(() => {
        const fetchSuppliers = async () => {
            const response = await getPendingInvoicesFromSuppliers();
            setPendingInvoicesSuppliers(response)
        }
        fetchSuppliers()
    }, [updateCount])
    
    useEffect(() => {
        console.log("suppliers" + PendingInvoicesSuppliers)
        console.log(PendingInvoicesSuppliers[0]?.remaining_amount)
    }, [PendingInvoicesSuppliers])

    const totals = PendingInvoicesSuppliers.reduce(
      (acc, invoice) => {
        acc.pending += invoice.remaining_amount;
        return acc;
      },
      { pending: 0}
    );

    const handleOperationMade = () => {
      setUpdateCount((prev) => prev + 1);
    };

  

    return (
        <div>
        <h1 className="text-4xl font-bold mb-4 underline">Facturas de Proveedores Pendientes</h1>
        <div className="flex justify-end mb-4 gap-4">
        <Button variant="outline" className="ml-4" onClick={handleOperationMade}>
          <PlusIcon className="h-5 w-5" />
          Agregar Proveedor
        </Button>
        <AddSupplierInvoice onInvoiceAdded={handleOperationMade} />

      </div>
        <Table>
          <TableCaption>Facturas de Proveedores Pendientes de Pago.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Fecha</TableHead>
              <TableHead className="w-[150px]">Proveedor</TableHead>
              <TableHead className="text-left">Total</TableHead>
              <TableHead className="text-left">Total Pagado</TableHead>
              <TableHead className="text-left">Total Pendiente</TableHead>
              <TableHead className="text-left">Agregar Pago</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PendingInvoicesSuppliers.map((row, index) => (
              <TableRow key={index} className="text-left">
                <TableCell>{row.invoice_date}</TableCell>
                <TableCell>{row.supplier_name}</TableCell>
                <TableCell className="text-left">$ {formatNumber(parseInt(row.invoice_total))}</TableCell>
                <TableCell className="text-left"><PaymentsOnHover amount={row.invoice_total} invoice_id={row.invoice_id}/></TableCell>
                <TableCell className="text-left text-red-500">$ {formatNumber(row.remaining_amount)}</TableCell>
                <TableCell className="text-left"><AddSupplierPayment invoice_id={row.invoice_id} onPaymentAdded={handleOperationMade}/></TableCell>
              </TableRow>
                ))}
          </TableBody>
          <TableFooter>
            <TableRow>  
              <TableCell colSpan={4} className="text-right">Total Pendiente</TableCell>
              <TableCell className="text-left">$ {formatNumber(totals.pending)}</TableCell>
              <TableCell className="text-left"></TableCell>
            </TableRow>
          </TableFooter>
        </Table>            
        </div>  
    )
}   