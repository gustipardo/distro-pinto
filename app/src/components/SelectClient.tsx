import { useEffect, useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getCustomers } from "@/services/getCustomers";

export function SelectClient() { // Error no se puede clickear sobre los items y se deberia agregar un state managemnt para no tener que peticionar a los clientes cada vez que se renderiza un input.
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        const response = await getCustomers();
        setCustomers(response);
    };
    fetchData();

}, []);

    useEffect(() => {
        console.log("value", value);
    }, [value]);

    const handleSelect = () => {
        console.log("customers", customers);
    };

  return (
    <Popover open={open} onOpenChange={setOpen} >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
        {value ? value : "Seleccionar cliente..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar Cliente..." className="h-9" />
          <CommandList>
            <CommandEmpty>Cliente no encontrado.</CommandEmpty> 
            <CommandGroup heading="Clientes">
              {customers.map((customer) => (
                <CommandItem
                  key={customer.id}
                  value={customer.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue)
                    setOpen(false)
                    handleSelect()
                  }}
                >
                  {customer.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === customer.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
