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
import { getEntities } from "@/services/getCustomers";

interface SelectEntitiesProps {
  isCustomer?: boolean;
  onSelectEntity: (selectedEntity: { id: string; name: string }) => void;
}

export const SelectEntities = ({ isCustomer = true, onSelectEntity }: SelectEntitiesProps) => {
  const [open, setOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<{ id: string; name: string } | null>(null);
  const [entities, setEntities] = useState<any[]>([]);

  const EntityType = isCustomer ? "Cliente" : "Proveedor";

  useEffect(() => {
    const fetchData = async () => {
      const response = await getEntities(isCustomer);
      setEntities(response);
    };
    fetchData();
  }, [isCustomer]);

/*   useEffect(() => {
    console.log("Selected Entity:", selectedEntity);
  }, [selectedEntity]); */

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedEntity ? selectedEntity.name : `Seleccionar ${EntityType}...`}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Buscar ${EntityType}...`} className="h-9" />
          <CommandList>
            <CommandEmpty>{EntityType} no encontrado.</CommandEmpty>
            <CommandGroup heading={EntityType}>
              {entities.map((entity) => (
                <CommandItem
                  key={entity.id}
                  value={entity.id}
                  onSelect={() => {
                    const selected = { id: entity.id, name: entity.name };
                    setSelectedEntity(selected);
                    setOpen(false);
                    onSelectEntity(selected);
                  }}
                >
                  {entity.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedEntity?.id === entity.id ? "opacity-100" : "opacity-0"
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
};
