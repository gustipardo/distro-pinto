import { useState } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "../ui/calendar";

interface CalendarPickerProps {
  onDateChange: (date: Date | undefined) => void;
}

export function CalendarPicker({ onDateChange }: CalendarPickerProps) {
  const [dateSelected, setDateSelected] = useState<Date | undefined>(new Date());

  const handleDateSelect = (date: Date | undefined) => {
    setDateSelected(date);
    onDateChange(date);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full pl-3 text-left font-normal">
          {dateSelected ? (
            new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium' }).format(dateSelected)
          ) : (
            <span>Selecciona una fecha</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={dateSelected}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
