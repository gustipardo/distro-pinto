import React from "react";
import "./Navbar.css";
import { Button } from "@/components/ui/button"
import {Chart} from "./Chart";
import { Chart2 } from "./Chart2";

const Home: React.FC = () => {
  return (
    <div>Home
        <Button>Click me</Button>
        <Chart2 />

        <Chart />
    </div>
    
  );
}

export default Home;
