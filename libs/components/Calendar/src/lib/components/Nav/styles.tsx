import { FONTSIZE, PADDING, GAP } from '../../base/design-tokens';
import { cn } from '@libs/utils';
import { StyledButtonProps, SizeType } from './types';

export function Button({
  size,
  children,
  onClick,
}: StyledButtonProps & { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'bg-transparent',
        'border-none',
        'cursor-pointer',
        'flex items-center justify-center',
        size === SizeType.FIT ? 'w-fit' : 'w-full',
        'hover:bg-gray-100',
        PADDING['XS'],
        FONTSIZE['LG'],
      )}
    >
      {children}
    </button>
  );
}

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        'flex items-center justify-between',
        FONTSIZE['BASE'],
        GAP['SM'],
      )}
    >
      {children}
    </div>
  );
}
