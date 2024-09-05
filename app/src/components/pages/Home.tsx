import { authStore } from "@/store/authStore";
import React from "react";

export const Home: React.FC = () => {
  const isAuthenticated = authStore((state) => state.isAuthenticated)
  const userData = authStore((state) => state.userData)

  return (
    <div className="flex justify-center items-center h-full">
      Home,  {isAuthenticated && <p>Authenticated</p>}
      {userData?.role_name}
    </div>
  );
}