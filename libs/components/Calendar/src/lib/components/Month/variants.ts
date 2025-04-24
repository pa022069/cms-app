import { cva } from 'class-variance-authority';
import { RADIUS, FONTSIZE, GAP, PADDING } from '../../base/design-tokens';

export const monthsVariants = cva('grid grid-rows-6', {
  variants: {
    gap: {
      sm: GAP.SM,
    },
    fontSize: {
      base: FONTSIZE.BASE,
    },
  },
  defaultVariants: {
    gap: 'sm',
    fontSize: 'base',
  },
});

export const weeksVariants = cva('grid grid-cols-7 text-center', {
  variants: {
    gap: {
      sm: GAP.SM,
    },
    fontSize: {
      base: FONTSIZE.BASE,
    },
  },
  defaultVariants: {
    gap: 'sm',
    fontSize: 'base',
  },
});

export const daysVariants = cva(
  [
    'aspect-square',
    'cursor-pointer',
    'flex items-center justify-center',
    'border-none outline-none',
    'bg-transparent',
    'hover:bg-[#3b82f6] hover:text-white',
    FONTSIZE['BASE'],
    RADIUS['FULL'],
    PADDING['XS'],
  ].join(' '),
  {
    variants: {
      isCurrentMonth: {
        true: 'text-black',
        false: 'text-gray-400',
      },
      isToday: {
        true: 'font-bold text-[#3b82f6]',
        false: '',
      },
      isSelected: {
        true: 'bg-[#3b82f6] text-white',
        false: '',
      },
    },
    defaultVariants: {
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
    },
  },
);

export const headersVariants = cva('grid grid-cols-7 text-center font-bold', {
  variants: {
    gap: {
      sm: GAP['SM'],
    },
    fontSize: {
      base: FONTSIZE['BASE'],
    },
  },
  defaultVariants: {
    gap: 'sm',
    fontSize: 'base',
  },
});
