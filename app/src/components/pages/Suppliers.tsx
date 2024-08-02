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

    const handleInvoiceAdded = () => {
      setUpdateCount((prev) => prev + 1); 
  };
  

    return (
        <div>
        <h1>Proveedores</h1>
            <AddSupplierInvoice onInvoiceAdded={handleInvoiceAdded}/>
        <Table>
          <TableCaption>Facturas pendientes de pago para proveedores.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">ID</TableHead>
              <TableHead className="w-[150px]">Proveedor</TableHead>
              <TableHead className="text-left">Total</TableHead>
              <TableHead className="text-left">Total Pagado</TableHead>
              <TableHead className="text-left">Total Pendiente</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PendingInvoicesSuppliers.map((row, index) => (
              <TableRow key={index} className="text-left">
                <TableCell>{row.invoice_id}</TableCell>
                <TableCell>{row.supplier_name}</TableCell>
                <TableCell className="text-left">$ {row.invoice_total}</TableCell>
                <TableCell className="text-left">$ {row.total_paid}</TableCell>
                <TableCell className="text-left">$ {row.remaining_amount}</TableCell>
              </TableRow>
                ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="text-right">Total Pendiente</TableCell>
              <TableCell className="text-left">$ {totals.pending}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>            
        </div>  
    )
}   