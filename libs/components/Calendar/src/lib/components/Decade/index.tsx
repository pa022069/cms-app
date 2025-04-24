import { useCalendar } from '../../stores/useCalendarStore';
import { DateType } from '../../enums';
import { YEAR_RANGE_COUNT } from '../../base/unit';
import { useCallback } from 'react';
import { cn } from '@libs/utils';
import { containerVariants, yearVariants } from './variants';
import { type VariantProps } from 'class-variance-authority';

type DecadeBaseProps = {
  className?: string;
  style?: React.CSSProperties;
  current?: string;
};

export type TDecadeConfig = VariantProps<typeof containerVariants> &
  DecadeBaseProps;

export default function Decade({
  current,
  className,
  ...props
}: TDecadeConfig) {
  const { markedDate, setViewMode, setYear, currentYear } = useCalendar();

  const handleClick = useCallback(
    (year: number) => {
      setYear(year);
      setViewMode(DateType.MONTH);
    },
    [setYear, setViewMode],
  );

  const marked = new Date(markedDate || current || Date.now());
  const markedYear = marked.getFullYear();
  const decadeStart = currentYear - (currentYear % YEAR_RANGE_COUNT) - 1;
  const years = Array.from(
    { length: YEAR_RANGE_COUNT + 2 },
    (_, i) => decadeStart + i,
  );

  return (
    <div className={cn(containerVariants(), className)} {...props}>
      {years.map((year, idx) => (
        <button
          key={year}
          onClick={() => handleClick(year)}
          className={cn(
            yearVariants({
              isCurrentYear: (markedYear || currentYear) === year,
              isCurrentDecade: idx === 0 || idx === years.length - 1,
            }),
          )}
        >
          <span>{year}</span>
        </button>
      ))}
    </div>
  );
}
