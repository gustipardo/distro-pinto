import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const AddInvoice: React.FC = () => {
  const [fileData, setFileData] = useState<any[]>([]);

  useEffect(() => {

    console.log(`fileData`, fileData[0]?.Fecha);
  }, [fileData]);

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
      const rows = jsonData.slice(3,-1).map((row: any) => ({
        Fecha: row[3],
        Cliente: row[4],
        Total: row[5],
      }));
      setFileData(rows);
    };
    reader.readAsArrayBuffer(file);

    
  };

  return (
    <div>
      <h1>Upload and Process Excel File</h1>
      <input type="file" accept=".xls,.xlsx" onChange={handleFileUpload} />
      <div>
        <h2>Data from Excel</h2>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {fileData.map((row, index) => (
              <tr key={index}>
                <td>{row.Fecha}</td>
                <td>{row.Cliente}</td>
                <td>{row.Total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default AddInvoice;
