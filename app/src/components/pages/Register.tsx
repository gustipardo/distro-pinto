import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { register } from "@/services/register";
import { SelectRol } from "../reusable/SelectRole";
import { regiterUserSchemaResolver } from "@/commons/Schemas";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const Register: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Inicializa useForm con zodResolver
  const form = useForm({
    resolver: regiterUserSchemaResolver,
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      roleId: "",
    },
  });

  const onSubmit = async (values: {
    username: string;
    password: string;
    confirmPassword: string;
    roleId: string;
  }) => {
    setLoading(true);
    setError(null);

    // Verificar que las contraseñas coincidan
    if (values.password !== values.confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    try {
      const result = await register({
        username: values.username,
        password: values.password,
        roleId: values.roleId,
      });
      if (result.error) {
        setError(result.error); // Ajusta esto según cómo manejes los errores en tu respuesta
      } else {
        console.log("Registration successful:", result);
        window.location.href = "/login";
      }
    } catch (err) {
      setError("Hubo un error al intentar registrarse");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRolSelect = (selectedRol: { id: string; name: string }) => {
    form.setValue("roleId", selectedRol.id);
  };

  return (
    <div className="w-full ">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold text-left">Registra un nuevo usuario</h1>
            <p className="text-muted-foreground text-left">
              Ingresa tus datos para crear una cuenta
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-left block">Nombre de usuario</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Nombre de usuario" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="roleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-left block">Seleccione el rol del usuario:</FormLabel>
                    <SelectRol onSelectRol={handleRolSelect} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-left block">Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Contraseña" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-left block">Confirmar Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirmar Contraseña"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <div className="text-red-500 text-center">{error}</div>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Registrando..." : "Regístrate"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
