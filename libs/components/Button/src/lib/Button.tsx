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

type ButtonBaseProps = {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  children?: React.ReactNode;
};

export type TButtonConfig = VariantProps<typeof buttonVariants> & ButtonBaseProps;

export const Button = ({
  size = SIZE.MEDIUM,
  variant = VARIANT.PRIMARY,
  className,
  children,
  onClick,
  ...props
}: TButtonConfig) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
