"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const ALLOWED_DAYS = [1, 3, 5]; // Mon=1, Wed=3, Fri=5
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function isAllowedDay(date: Date): boolean {
  return ALLOWED_DAYS.includes(date.getDay());
}

function formatDateISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getMonthDays(year: number, month: number): Date[] {
  const days: Date[] = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  error?: string;
}

export default function DatePicker({ value, onChange, error }: DatePickerProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewDate, setViewDate] = useState(() => {
    if (value) {
      const d = new Date(value);
      return new Date(d.getFullYear(), d.getMonth(), 1);
    }
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const days = getMonthDays(year, month);
  const firstDayOffset = days[0].getDay();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const selectedDate = value ? new Date(value) : null;

  return (
    <div>
      <div className="border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between bg-gray-50 px-3 py-2">
          <button
            type="button"
            onClick={prevMonth}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="font-semibold text-sm">
            {MONTH_NAMES[month]} {year}
          </span>
          <button
            type="button"
            onClick={nextMonth}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Day labels */}
        <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 border-b">
          {DAY_NAMES.map((d) => (
            <div key={d} className="py-1">{d}</div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 text-center">
          {/* Empty cells for offset */}
          {Array.from({ length: firstDayOffset }).map((_, i) => (
            <div key={`empty-${i}`} className="h-10" />
          ))}

          {days.map((day) => {
            const iso = formatDateISO(day);
            const allowed = isAllowedDay(day);
            const isPast = day < today;
            const isSelected = selectedDate && formatDateISO(selectedDate) === iso;
            const disabled = !allowed || isPast;

            return (
              <button
                key={iso}
                type="button"
                disabled={disabled}
                onClick={() => onChange(iso)}
                className={`h-10 text-sm font-medium transition-colors ${
                  disabled
                    ? "text-gray-300 cursor-not-allowed"
                    : isSelected
                    ? "bg-fuchsia text-white rounded-lg mx-1"
                    : "text-gray-700 hover:bg-fuchsia/10 rounded-lg mx-1"
                }`}
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
        <Calendar size={12} />
        Delivery available on Mondays, Wednesdays & Fridays only
      </p>
    </div>
  );
}
