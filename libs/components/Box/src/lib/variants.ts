import { SIZE, VARIANT, DIRECTION } from './enums';

type TVariants = {
  [key: string]: {
    [key: string]: string;
  };
};

export const baseStyles = [
  'flex',
  'transition-colors',
].join(' ');

export const variants: TVariants = {
  variant: {
    [VARIANT.PRIMARY]: 'bg-blue-600 text-white hover:bg-blue-700',
    [VARIANT.SECONDARY]: 'bg-gray-600 text-white hover:bg-gray-700',
    [VARIANT.DANGER]: 'bg-red-600 text-white hover:bg-red-700',
  },
  size: {
    [SIZE.SMALL]: 'text-xs p-2',
    [SIZE.MEDIUM]: 'text-sm p-4',
    [SIZE.LARGE]: 'text-base p-6',
  },
  direction: {
    [DIRECTION.ROW]: 'flex-row',
    [DIRECTION.COLUMN]: 'flex-col',
  },
}; 