import { SHORT_MONTHS } from '../../base/date-format';
import { useCalendar } from '../../stores/useCalendarStore';
import { DateType } from '../../enums';
import { useCallback } from 'react';
import { cn } from '@libs/utils';
import { containerVariants, monthVariants } from './variants';
import { type VariantProps } from 'class-variance-authority';

type YearBaseProps = {
  className?: string;
  style?: React.CSSProperties;
  current?: string;
};

export type TYearConfig = VariantProps<typeof containerVariants> &
  YearBaseProps;

export default function Year({ current, className, ...props }: TYearConfig) {
  const { setMonth, setViewMode, markedDate, currentMonth } = useCalendar();

  const handleClick = useCallback(
    (month: number) => {
      setMonth(month);
      setViewMode(DateType.DAY);
    },
    [setMonth, setViewMode],
  );

  const marked = new Date(markedDate || current || Date.now());
  const markedMonth = marked.getMonth();

  return (
    <div className={cn(containerVariants(), className)} {...props}>
      {SHORT_MONTHS.map((month: string, idx: number) => (
        <button
          key={month}
          onClick={() => handleClick(idx)}
          className={cn(
            monthVariants({
              isCurrentMonth: (markedMonth || currentMonth) === idx,
            }),
          )}
        >
          {month}
        </button>
      ))}
    </div>
  );
}
