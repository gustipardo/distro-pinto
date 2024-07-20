import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    // Función asincrónica para cargar
    async function fetchInvoices() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/invoices`
        ); // Realiza la petición GET a http://localhost:1234/invoices
        if (!response.ok) {
          throw new Error("Error getting invoices");
        }
        const data = await response.json(); // Convierte la respuesta a JSON
        setInvoices(data); // Guarda los datos de las facturas en el estado
      } catch (error) {
        console.error(error);
      }
    }

    fetchInvoices(); // Llama a la función para cargar datos al montar el componente
  }, []); // El segundo argumento [] asegura que useEffect se ejecute solo una vez al montar el componente

  return (
    <>
      <div className="App">
        <h1>Listado de Facturas</h1>
        <div>invoices: {invoices}</div>
      </div>
    </>
  );
}

export default App;
