import React from "react";
import { DateRangePicker } from "../reusable/date-range-picker";

const Home: React.FC = () => {
  return (
    <div>Home
      <DateRangePicker locale="es-AR" showCompare={false} />
    </div>
    
  );
}

export default Home;
