import React, { useState } from "react";
import * as XLSX from "xlsx";

const Placeholder: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      readExcel(selectedFile);
    }
  };

  const readExcel = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      if (data) {
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        setData(jsonData);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <h1>Placeholder</h1>
      <p>Esta es una página de placeholder.</p>

      <input type="file" accept=".xls, .xlsx" onChange={handleFileChange} />

      {data.length > 0 && (
        <div>
          <h2>Datos del archivo Excel:</h2>
          <table>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, idx) => (
                    <td key={idx}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Placeholder;
  