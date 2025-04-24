import { SIZE, VARIANT } from './enums';

type TVariants = {
  [key: string]: {
    [key: string]: string;
  };
};

export const baseStyles = [
  'inline-flex',
  'items-center',
  'justify-center',
  'rounded-md',
  'font-medium',
  'transition-colors',
  'focus-visible:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-offset-2',
  'disabled:pointer-events-none',
  'disabled:opacity-50',
  'w-fit'
].join(' ');

export const variants: TVariants = {
  variant: {
    [VARIANT.PRIMARY]: 'bg-blue-600 text-white hover:bg-blue-700',
    [VARIANT.SECONDARY]: 'bg-gray-600 text-white hover:bg-gray-700',
    [VARIANT.DANGER]: 'bg-red-600 text-white hover:bg-red-700',
  },
  size: {
    [SIZE.SMALL]: 'h-8 px-3 text-xs',
    [SIZE.MEDIUM]: 'h-10 px-4 text-sm',
    [SIZE.LARGE]: 'h-12 px-6 text-base',
  },
};
