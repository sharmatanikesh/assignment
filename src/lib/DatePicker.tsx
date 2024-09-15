
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { useState } from "react";

interface DatePickerProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date) => void;
}

export function DatePicker({ selectedDate, onDateChange }: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onDateChange(date);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className=" absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
        >
          <CalendarIcon className="w-5 h-5 text-gray-600" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-2 w-auto z-50"> 
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          initialFocus={open} 
        />
      </PopoverContent>
    </Popover>
  );
}
