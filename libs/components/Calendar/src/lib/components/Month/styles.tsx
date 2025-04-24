import { RADIUS, FONTSIZE, GAP, PADDING } from '../../base/design-tokens';
import { cn } from '@libs/utils';
import { StyleDayProps } from './types';

export function Months({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn('grid grid-rows-6', GAP.SM, FONTSIZE.BASE)}>
      {children}
    </div>
  );
}

export function Weeks({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn('grid grid-cols-7', 'text-center', GAP.SM, FONTSIZE.BASE)}
    >
      {children}
    </div>
  );
}

export function Days({
  isCurrentMonth,
  isToday,
  isSelected,
  children,
  onClick,
}: StyleDayProps & { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'aspect-square',
        'cursor-pointer',
        'flex items-center justify-center',
        'border-none outline-none',
        'bg-transparent',
        isCurrentMonth ? 'text-black' : 'text-gray-400',
        isToday && 'font-bold text-[#3b82f6]',
        isSelected && 'bg-[#3b82f6] text-white',
        'hover:bg-[#3b82f6] hover:text-white',
        FONTSIZE['BASE'],
        RADIUS['FULL'],
        PADDING['XS'],
      )}
    >
      {children}
    </button>
  );
}

export function Headers({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        'grid grid-cols-7',
        'text-center',
        'font-bold',
        GAP['SM'],
        FONTSIZE['BASE'],
      )}
    >
      {children}
    </div>
  );
}
