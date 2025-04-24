import { cva } from 'class-variance-authority';
import { SIZE } from './enums';
import { FONTSIZE } from './base/design-tokens';

type TVariants = {
  [key: string]: {
    [key: string]: string;
  };
};

export const baseStyles = 'w-fit min-w-[220px] flex flex-col';

export const variants: TVariants = {
  size: {
    [SIZE.XS]: FONTSIZE[SIZE.XS],
    [SIZE.SMALL]: FONTSIZE[SIZE.SMALL],
    [SIZE.BASE]: FONTSIZE[SIZE.BASE],
    [SIZE.LARGE]: FONTSIZE[SIZE.LARGE],
  },
};

export const calendarVariants = cva(baseStyles, {
  variants,
  defaultVariants: {
    size: FONTSIZE[SIZE.BASE],
  },
});
