import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useCalendar } from '../../stores/useCalendarStore';
import { MONTHS } from '../../base/date-format';
import { DateType } from '../../enums';
import { ControlButtonProps, DirectionType, SizeType } from './types';
import { YEAR_RANGE_COUNT } from '../../base/unit';
import { useCallback } from 'react';
import { cn } from '@libs/utils';
import { buttonVariants, containerVariants } from './variants';
import { type VariantProps } from 'class-variance-authority';

type NavBaseProps = {
  className?: string;
  style?: React.CSSProperties;
};

export type TNavConfig = VariantProps<typeof containerVariants> & NavBaseProps;

function ControlButton({ direction, onClick }: ControlButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ size: SizeType.FIT }))}
      onClick={onClick}
    >
      {direction === DirectionType.LEFT ? <FaAngleLeft /> : <FaAngleRight />}
    </button>
  );
}

function ControlGroup() {
  const { currentYear, currentMonth, setViewMode, viewMode } = useCalendar();
  const decadeStart = currentYear - (currentYear % YEAR_RANGE_COUNT);
  const decadeEnd = decadeStart + YEAR_RANGE_COUNT - 1;

  const handleClick = useCallback(() => {
    switch (viewMode) {
      case DateType.DAY:
        setViewMode(DateType.MONTH);
        break;
      case DateType.MONTH:
        setViewMode(DateType.YEAR);
        break;
    }
  }, [setViewMode, viewMode]);

  const Title = () => {
    switch (viewMode) {
      case DateType.DAY:
        return `${MONTHS[currentMonth]} ${currentYear}`;
      case DateType.MONTH:
        return `${currentYear}`;
      case DateType.YEAR: {
        return `${decadeStart} - ${decadeEnd}`;
      }
    }
  };

  return (
    <button
      className={cn(buttonVariants({ size: SizeType.FULL }))}
      onClick={handleClick}
    >
      <Title />
    </button>
  );
}

export default function CalendarNav({ className, ...props }: TNavConfig) {
  const {
    nextMonth,
    prevMonth,
    viewMode,
    nextYear,
    prevYear,
    currentYear,
    setYear,
  } = useCalendar();

  const handleNext = useCallback(() => {
    switch (viewMode) {
      case DateType.DAY:
        nextMonth();
        break;
      case DateType.MONTH:
        nextYear();
        break;
      case DateType.YEAR:
        setYear(currentYear + YEAR_RANGE_COUNT);
        break;
    }
  }, [viewMode, currentYear, setYear, nextMonth, nextYear]);

  const handlePrev = useCallback(() => {
    switch (viewMode) {
      case DateType.DAY:
        prevMonth();
        break;
      case DateType.MONTH:
        prevYear();
        break;
      case DateType.YEAR:
        setYear(currentYear - YEAR_RANGE_COUNT);
        break;
    }
  }, [viewMode, currentYear, setYear, prevMonth, prevYear]);

  return (
    <div className={cn(containerVariants(), className)} {...props}>
      <ControlButton direction={DirectionType.LEFT} onClick={handlePrev} />
      <ControlGroup />
      <ControlButton direction={DirectionType.RIGHT} onClick={handleNext} />
    </div>
  );
}
