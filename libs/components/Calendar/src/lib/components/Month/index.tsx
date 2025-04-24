import { TDate } from '../../types/date';
import { useCalendar } from '../../stores/useCalendarStore';
import { WEEKDAYS } from '../../base/date-format';
import { getMonthDays } from '../../utils/calendar-utils';
import { WeekProps, WeekdayProps } from './types';
import { cn } from '@libs/utils';
import {
  monthsVariants,
  weeksVariants,
  daysVariants,
  headersVariants,
} from './variants';
import { type VariantProps } from 'class-variance-authority';

type MonthBaseProps = {
  className?: string;
  style?: React.CSSProperties;
  current?: string;
};

export type TMonthConfig = VariantProps<typeof monthsVariants> & MonthBaseProps;

function Week({ date }: WeekProps) {
  return (
    <div className={cn(weeksVariants())}>
      {date.map((day: TDate) => (
        <Weekday key={`${day.year}-${day.month}-${day.day}`} date={day} />
      ))}
    </div>
  );
}

function Weekday({ date }: WeekdayProps) {
  const { setMarkDate, setMonth, setYear, currentYear, currentMonth } =
    useCalendar();
  const { day, year, isCurrentMonth, isToday, isSelected, month } = date;

  const handleSelectDate = () => {
    setMarkDate(`${year}-${month}-${day}`);
    if (month !== currentMonth + 1) {
      setMonth(month - 1);
    }
    if (year !== currentYear) {
      setYear(year);
    }
  };

  return (
    <button
      onClick={handleSelectDate}
      className={cn(
        daysVariants({
          isCurrentMonth,
          isToday,
          isSelected,
        }),
      )}
    >
      <span>{day}</span>
    </button>
  );
}

function Header() {
  return (
    <div className={cn(headersVariants())}>
      {WEEKDAYS.map((day: string) => (
        <div key={day}>{day}</div>
      ))}
    </div>
  );
}

export default function Month({ current, className, ...props }: TMonthConfig) {
  const { currentYear, currentMonth, markedDate } = useCalendar();
  const matrix = getMonthDays(
    currentYear,
    currentMonth + 1,
    markedDate || current,
  );
  return (
    <>
      <Header />
      <div className={cn(monthsVariants(), className)} {...props}>
        {matrix.map((week: TDate[], index: number) => (
          <Week key={`${week[1].year}-${week[1].month}-${index}`} date={week} />
        ))}
      </div>
    </>
  );
}
