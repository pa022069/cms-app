import { createContext, useContext, useState } from 'react';
import { DateType } from '../enums';

type CalendarContextType = {
  currentYear: number;
  currentMonth: number;
  markedDate: string;
  viewMode: DateType;
  nextMonth: () => void;
  prevMonth: () => void;
  nextYear: () => void;
  prevYear: () => void;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  setViewMode: React.Dispatch<React.SetStateAction<DateType>>;
  setMarkDate: React.Dispatch<React.SetStateAction<string>>;
};

const CalendarContext = createContext<CalendarContextType | null>(null);

export const CalendarProvider = ({
  children,
  current,
}: {
  children: React.ReactNode;
  current?: string;
}) => {
  const today = new Date(current || Date.now());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [markedDate, setMarkedDate] = useState('');
  const [viewMode, setViewMode] = useState(DateType.DAY);

  const nextMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = prev + 1;
      if (newMonth > 11) {
        setCurrentYear((year) => year + 1);
        return 0;
      }
      return newMonth;
    });
  };

  const prevMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = prev - 1;
      if (newMonth < 0) {
        setCurrentYear((year) => year - 1);
        return 11;
      }
      return newMonth;
    });
  };

  const nextYear = () => setCurrentYear((year) => year + 1);
  const prevYear = () => setCurrentYear((year) => year - 1);

  return (
    <CalendarContext.Provider
      value={{
        currentYear,
        currentMonth,
        markedDate,
        viewMode,
        nextMonth,
        prevMonth,
        nextYear,
        prevYear,
        setMonth: setCurrentMonth,
        setYear: setCurrentYear,
        setViewMode,
        setMarkDate: setMarkedDate,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};
