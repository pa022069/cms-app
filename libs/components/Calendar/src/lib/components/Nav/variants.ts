import { cva } from 'class-variance-authority';
import { FONTSIZE, PADDING, GAP } from '../../base/design-tokens';
import { SizeType } from './types';

export const buttonVariants = cva(
  [
    'bg-transparent',
    'border-none',
    'cursor-pointer',
    'flex items-center justify-center',
    'hover:bg-gray-100',
    PADDING['XS'],
    FONTSIZE['LG'],
  ].join(' '),
  {
    variants: {
      size: {
        [SizeType.FIT]: 'w-fit',
        [SizeType.FULL]: 'w-full',
      },
    },
    defaultVariants: {
      size: SizeType.FIT,
    },
  },
);

export const containerVariants = cva(
  [
    'flex items-center justify-between',
    FONTSIZE['BASE'],
    GAP['SM'],
    PADDING['BASE'],
  ].join(' '),
  {
    variants: {},
    defaultVariants: {},
  },
);
