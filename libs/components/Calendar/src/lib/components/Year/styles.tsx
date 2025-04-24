import { RADIUS, GAP, FONTSIZE, PADDING } from '../../base/design-tokens';
import { cn } from '@libs/utils';

interface ComponentProps {
  children: React.ReactNode;
}

export function Container({ children }: ComponentProps) {
  return <div className={cn('grid grid-cols-4', GAP['BASE'])}>{children}</div>;
}

interface StyledMonthProps {
  isCurrentMonth: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Month({ isCurrentMonth, children, onClick }: StyledMonthProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'aspect-square',
        'cursor-pointer',
        'flex items-center justify-center',
        'border-none outline-none',
        'bg-transparent text-black',
        'hover:bg-[#3b82f6] hover:text-white',
        isCurrentMonth && 'bg-[#3b82f6] text-white',
        FONTSIZE['BASE'],
        RADIUS['FULL'],
        PADDING['SM'],
      )}
    >
      {children}
    </button>
  );
}
