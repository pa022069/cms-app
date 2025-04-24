import { cva } from 'class-variance-authority';
import { RADIUS, GAP, FONTSIZE, PADDING } from '../../base/design-tokens';

export const containerVariants = cva('grid grid-cols-4', {
  variants: {
    gap: {
      base: GAP['BASE'],
    },
  },
  defaultVariants: {
    gap: 'base',
  },
});

export const monthVariants = cva(
  [
    'aspect-square',
    'cursor-pointer',
    'flex items-center justify-center',
    'border-none outline-none',
    'bg-transparent text-black',
    'hover:bg-[#3b82f6] hover:text-white',
    FONTSIZE['BASE'],
    RADIUS['FULL'],
    PADDING['SM'],
  ].join(' '),
  {
    variants: {
      isCurrentMonth: {
        true: 'bg-[#3b82f6] text-white',
        false: '',
      },
    },
    defaultVariants: {
      isCurrentMonth: false,
    },
  },
);
