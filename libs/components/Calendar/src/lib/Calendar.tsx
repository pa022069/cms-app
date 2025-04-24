import { SIZE } from './enums';
import Month from './components/Month';
import Year from './components/Year';
import Decade from './components/Decade';
import Nav from './components/Nav';
import { DateType } from './enums';
import { CalendarProvider, useCalendar } from './stores/useCalendarStore';
import { useCallback, useEffect, useMemo } from 'react';
import { cn } from '@libs/utils';
import { calendarVariants } from './variants';
import { type VariantProps } from 'class-variance-authority';

type CalendarBaseProps = {
  className?: string;
  style?: React.CSSProperties;
  current?: string;
  onChange?: (date: string) => void;
  size?: SIZE;
};

export type TCalendarConfig = VariantProps<typeof calendarVariants> &
  CalendarBaseProps;

type StyledCalendarProps = {
  size?: SIZE;
  className?: string;
  children: React.ReactNode;
};

function StyledCalendar({
  size = SIZE.BASE,
  className,
  children,
}: StyledCalendarProps) {
  return (
    <div className={cn(calendarVariants({ size }), className)}>{children}</div>
  );
}

function Calendar({ current, onChange, size = SIZE.BASE }: CalendarBaseProps) {
  const { markedDate, viewMode } = useCalendar();

  const handleDateChange = useCallback(
    (date: string) => {
      if (onChange) {
        const [year, month, day] = date.split('-');
        onChange(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
      }
    },
    [onChange],
  );

  useEffect(() => {
    if (markedDate) {
      handleDateChange(markedDate);
    }
  }, [handleDateChange, markedDate]);

  const CalendarContent = useMemo(() => {
    switch (viewMode) {
      case DateType.DAY:
        return <Month current={current} />;
      case DateType.MONTH:
        return <Year current={current} />;
      default:
        return <Decade current={current} />;
    }
  }, [viewMode, current]);

  return (
    <StyledCalendar size={size}>
      <Nav />
      {CalendarContent}
    </StyledCalendar>
  );
}

export function CalendarContainer({
  current,
  onChange,
  ...props
}: TCalendarConfig) {
  return (
    <CalendarProvider current={current}>
      <Calendar current={current} onChange={onChange} {...props} />
    </CalendarProvider>
  );
}

export default CalendarContainer;
