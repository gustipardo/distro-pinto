import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { login } from "@/services/login";
import { getCookie } from "@/services/getCookie";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const access_token = getCookie("access_token");
   
  useEffect(() => {
    console.log("access_token", access_token);
  }, [access_token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const result = await login({ username, password });
      if (result.error) {
        setError(result.error); // Ajusta esto según cómo manejes los errores en tu respuesta
      } else {
        // Maneja la respuesta exitosa, por ejemplo, redirigiendo al usuario
        console.log("Login successful:", result);
        // Redirigir al usuario o realizar otras acciones aquí
      }
      window.location.href = "/";
    } catch (err) {
      setError("Hubo un error al intentar iniciar sesión");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold text-left">Iniciar sesión</h1>
            <p className="text-muted-foreground text-left">
              Ingresa tu nombre de usuario y contraseña para acceder
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="login-username">Nombre de usuario</Label>
                </div>
              <Input
                id="login-username"
                type="text"
                placeholder="Ingrese su nombre de usuario"
                className="mt-1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="login-password">Contraseña</Label>
              </div>
              <Input
                id="login-password"
                type="password"
                placeholder="Ingrese su contraseña"
                className="mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="text-red-500 text-center">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            ¿No tienes una cuenta?{" "}
            <a href="/register" className="underline">
              Regístrate
            </a>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center bg-zinc-200">
        <img
          src="/distribuidoraLogo.svg"
          alt="Logo"
          width="84"
          height="84"
          className="object-cover dark:brightness-[0.2] dark:grayscale"
        />
        <p className="text-5xl">Distro Pinto</p>
      </div>
    </div>
  );
};

export default Login;
