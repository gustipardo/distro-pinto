import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/invoices">Consultar Facturas</Link>
        </li>
        <li>
          <Link to="/add-invoice">Agregar Factura</Link>
        </li>
        <li>
          <Link to="/placeholder">Placeholder</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
