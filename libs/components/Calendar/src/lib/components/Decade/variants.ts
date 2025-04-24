import { cva } from 'class-variance-authority';
import { RADIUS, PADDING, FONTSIZE, GAP } from '../../base/design-tokens';

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

export const yearVariants = cva(
  [
    'aspect-square',
    'cursor-pointer',
    'flex items-center justify-center',
    'border-none outline-none',
    'bg-transparent',
    'hover:bg-[#3b82f6] hover:text-white',
    FONTSIZE['BASE'],
    RADIUS['FULL'],
    PADDING['SM'],
  ].join(' '),
  {
    variants: {
      isCurrentDecade: {
        true: 'text-gray-400',
        false: 'text-black',
      },
      isCurrentYear: {
        true: 'bg-[#3b82f6] text-white',
        false: '',
      },
    },
    defaultVariants: {
      isCurrentYear: false,
      isCurrentDecade: false,
    },
  },
);
