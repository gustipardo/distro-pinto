import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addEntitySchemaResolver } from "@/commons/Schemas";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { PlusIcon } from "@radix-ui/react-icons";
import { addEntity } from "@/services/addEntity";
import { useToast } from "./ui/use-toast";

interface AddEntityProps {
  onEntityAdded: () => void,
  isCustomer?: boolean,
}

export const AddEntity = ({ onEntityAdded, isCustomer = true }: AddEntityProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm({
    resolver: addEntitySchemaResolver,
    defaultValues: {
      name: ""    
    },
  });

  const onSubmit = async (values: { name: string}) => {
    const response = await addEntity({name: values.name, type: isCustomer ? "customer" : "supplier"});
    if (response.error) {
      toast({
        variant: "destructive",
        title: "Uh! Algo salió mal",
        description: response.error
      })
    }
    setOpen(false);
    if (response) {
      onEntityAdded(); 
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline"><PlusIcon className="mr-2 h-4 w-4"/> Agregar {isCustomer ? "Cliente" : "Proveedor"}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del {isCustomer ? "cliente" : "proveedor"}</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">Agregar</Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};
