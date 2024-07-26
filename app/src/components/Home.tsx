import React from "react";
import "./Navbar.css";
import { Button } from "@/components/ui/button"
import {Chart} from "./Chart";

const Home: React.FC = () => {
  return (
    <div>Home
        <Button>Click me</Button>
        <Chart />
    </div>
    
  );
}

export default Home;
