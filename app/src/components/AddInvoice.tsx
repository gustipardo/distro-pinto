import React, { useState } from "react";
import * as XLSX from "xlsx";
import { addInvoice } from "../services/addInvoice";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
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
import { SelectClient } from "./SelectClient";
import { CalendarPicker } from "./CalendarPicker";

const AddInvoice: React.FC = () => {
  const [fileData, setFileData] = useState<any[]>([]);
  const [additionalRows, setAdditionalRows] = useState<number[]>([]); // State to store additional rows

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

  const handleAddRow = () => {
    setAdditionalRows([...additionalRows, additionalRows.length]); // Add a new row
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
            {additionalRows.map(( index) => (
              <TableRow key={index}>
                <TableCell>
                  <CalendarPicker />
                </TableCell>
                <TableCell>
                  <SelectClient />
                </TableCell>
                <TableCell>
                  <Input placeholder="Total" type="number" min={0}></Input>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <Button variant="outline" size="icon" onClick={handleAddRow}>
                  <PlusIcon/>
                </Button>
              </TableCell>
            </TableRow>
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
