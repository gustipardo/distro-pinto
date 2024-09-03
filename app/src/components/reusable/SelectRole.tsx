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
import { getRoles } from "@/services/getRoles";

interface SelectRolProps {
    onSelectRol: (selectedRol: { id: string; name: string }) => void;
}

export const SelectRol = ({ onSelectRol }: SelectRolProps) => {
    const [open, setOpen] = useState(false);
    const [selectedRol, setSelectedRol] = useState<{ id: string; name: string } | null>(null);
    const [roles, setRoles] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRoles();
            setRoles(response);
        };
        fetchData();
    }, []);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between whitespace-normal "
                >
                    {selectedRol ? selectedRol.name : `Seleccionar Rol...`}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder={`Buscar Rol...`} className="h-9" />
                    <CommandList>
                        <CommandEmpty>Rol no encontrado.</CommandEmpty>
                        <CommandGroup heading="Rol">
                            {roles.map((rol) => (
                                <CommandItem
                                    key={rol.id}
                                    value={rol.id}
                                    onSelect={() => {
                                        const selected = { id: rol.id, name: rol.role_name };
                                        setSelectedRol(selected);
                                        setOpen(false);
                                        onSelectRol(selected);
                                    }}
                                >
                                    {rol.role_name}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            selectedRol?.id === rol.id ? "opacity-100" : "opacity-0"
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
