import React, { useState } from "react";
import * as XLSX from "xlsx";
import { addInvoice } from "../services/addInvoice";
import { Input } from "@/components/ui/input";
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

const AddInvoice: React.FC = () => {
  const [fileData, setFileData] = useState<any[]>([]);

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

      // Remove the header row and process the data
      const rows = jsonData.slice(3, -1).map((row: any) => ({
        Fecha: row[3],
        Cliente: row[4],
        Total: row[5],
      }));
      setFileData(rows);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleClick = () => {
    if (!fileData.length) return;
    fileData.forEach(async (row: any) => {
      await addInvoice({
        date: row.Fecha,
        client: row.Cliente,
        amount: row.Total,
      });
    });
  };

  return (
    <div>
      <h1>Agregar Facturas</h1>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Input type="file" accept=".xls,.xlsx" onChange={handleFileUpload} />
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
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">
                {/* Puedes agregar una suma total aquí si lo deseas */}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default AddInvoice;
