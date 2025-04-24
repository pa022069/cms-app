import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@libs/utils';
import { SIZE, VARIANT } from './enums';
import { variants, baseStyles } from './variants';

const buttonVariants = cva(
  baseStyles,
  {
    variants,
    defaultVariants: {
      variant: VARIANT.PRIMARY,
      size: SIZE.MEDIUM,
    },
  }
);

export type TButtonConfig = VariantProps<typeof buttonVariants> & {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  children?: React.ReactNode;
  [key: string]: any;
};

export const Button = ({
  size = SIZE.MEDIUM,
  variant = VARIANT.PRIMARY,
  className,
  children,
  ...props
}: TButtonConfig) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
