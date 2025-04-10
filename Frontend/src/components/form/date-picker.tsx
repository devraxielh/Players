import { format } from 'date-fns';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { CalendarIcon } from 'lucide-react';

type Props = {
  id: string;
  placeholder?: string;
  onChange: (date: Date | null, formatted: string) => void;
};

export default function DatePicker({ id, placeholder, onChange }: Props) {
  const [selected, setSelected] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);

  const handleSelect = (date?: Date) => {
    setSelected(date);
    const formatted = date ? format(date, 'yyyy-MM-dd') : '';
    onChange(date ?? null, formatted);
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full rounded border px-3 py-2 text-left text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
        id={id}
      >
        <span className="text-gray-700 dark:text-white">
          {selected ? format(selected, 'yyyy-MM-dd') : placeholder || 'Seleccionar fecha'}
        </span>
        <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-300 pointer-events-none" />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 shadow-lg bg-white dark:bg-gray-800 border rounded p-2 dark:border-gray-600">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            fromYear={1950}
            toYear={2030}
            captionLayout="dropdown"
            className="dark:text-white text-gray-800"
          />
        </div>
      )}
    </div>
  );
}
