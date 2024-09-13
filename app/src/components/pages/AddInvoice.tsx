import React, { useState } from "react";
import * as XLSX from "xlsx";
import { addInvoice } from "../../services/addInvoice";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
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
import { SelectEntities } from "../reusable/SelectEntities";
import { CalendarPicker } from "../reusable/CalendarPicker";
import { formatDateDDMMYYYYToYYYYMMDD, formatDateToYYYYMMDD } from "@/services/formatDate";
import { getCustomerByName } from "@/services/getCustomerByName";
import { addEntity } from "@/services/addEntity";

export const AddInvoice = () => {
  const [fileData, setFileData] = useState<any[]>([]);
  const [additionalRows, setAdditionalRows] = useState<number[]>([]);
  const [manualInvoices, setManualInvoices] = useState<any[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
      const rows = jsonData.slice(3, -1).map((row: any) => ({
        // Modifica la fecha al formato dd-mm-yyyy
        Fecha: row[3] ? formatDateDDMMYYYYToYYYYMMDD(row[3]) : null,
        Cliente: row[4],
        Total: row[5],
      }));
      setFileData(rows);
    };
    reader.readAsArrayBuffer(file);
  };
  

  const handleClick = async () => {
    // Solo procesamos los datos del Excel (fileData)
    const processedFileData = await Promise.all(
      fileData.map(async (row) => {
        // Buscar cliente por nombre
        let customer = await getCustomerByName(row.Cliente);
        
        // Si no se encuentra, agregar el cliente y luego volver a buscarlo
        if (customer.length === 0) {
          console.log("Cliente no encontrado, agregando...");
          await addEntity({ name: row.Cliente, type: "customer" });
          customer = await getCustomerByName(row.Cliente); // Buscar nuevamente el cliente para obtener su ID
        }
        
        // Formatear el dato con el cliente como ID
        return {
          ...row,
          Cliente: customer[0].id,  // Convertir el nombre en el ID del cliente
        };
      })
    );
  
    // Combinar los datos procesados del Excel con las facturas manuales
    const combinedData = [...processedFileData, ...manualInvoices];
    
    console.log("Facturas enviadas:", combinedData);
  
    // Enviar las facturas
    for (const row of combinedData) {  
      console.log("Enviando factura:", row);
      const response = await addInvoice({
        date: row.Fecha,
        entity_id: row.Cliente, // Aquí ya es el ID del cliente
        total: row.Total,
      });
      console.log("Factura enviada:", response);
    }
  };
  

  const handleAddRow = () => {
    const today = new Date(); // Obtenemos la fecha actual
    setAdditionalRows([...additionalRows, additionalRows.length]);
    setManualInvoices([
      ...manualInvoices,
      { Fecha: formatDateToYYYYMMDD(today), Cliente: null, Total: null }, // Establecemos la fecha por defecto
    ]);
  };

  const handleManualInvoiceChange = (index: number, field: string, value: any) => {
    const updatedInvoices = [...manualInvoices];
    updatedInvoices[index] = { ...updatedInvoices[index], [field]: value };
    setManualInvoices(updatedInvoices);
  };

  const handleEntitySelect = (index: number, selectedEntity: { id: string; name: string }) => {
    handleManualInvoiceChange(index, "Cliente", selectedEntity.id);
  };

  const handleDateChange = (index: number, date: Date | undefined) => {
    if (!date) return;
    handleManualInvoiceChange(index, "Fecha", formatDateToYYYYMMDD(date));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Agregar Facturas</h1>
      <div className="flex items-center gap-4 mb-6">
        <Input className="w-fit" type="file" accept=".xls,.xlsx" onChange={handleFileUpload} />
        <Button onClick={handleClick}>Enviar Facturas</Button>
      </div>
      <div>
        <h2>Datos del excel</h2>
        <Table>
          <TableCaption>Datos importados desde el archivo Excel.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Fecha</TableHead>
              <TableHead className="w-[150px]">Cliente</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fileData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.Fecha}</TableCell>
                <TableCell>{row.Cliente}</TableCell>
                <TableCell className="text-right">{row.Total}</TableCell>
              </TableRow>
            ))}
            {additionalRows.map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <CalendarPicker onDateChange={(date) => handleDateChange(index, date)} />
                </TableCell>
                <TableCell>
                  <SelectEntities onSelectEntity={(entity) => handleEntitySelect(index, entity)} />
                </TableCell>
                <TableCell>
                  <Input
                    placeholder="Total"
                    type="number"
                    min={0}
                    onChange={(e) =>
                      handleManualInvoiceChange(index, "Total", parseFloat(e.target.value))
                    }
                  />
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
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">
                {/* Suma total si es necesario */}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};
