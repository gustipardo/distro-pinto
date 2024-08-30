import { authStore } from "@/store/authStore";
import React, { useEffect } from "react";

export const Home: React.FC = () => {
  const isAuthenticated = authStore((state) => state.isAuthenticated)

  useEffect(() => {
    console.log('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div className="flex justify-center items-center h-full">
      Home,  {isAuthenticated && <p>Authenticated</p>}
    </div>
  );
}