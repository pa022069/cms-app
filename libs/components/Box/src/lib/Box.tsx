import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@libs/utils';
import { SIZE, VARIANT, DIRECTION } from './enums';
import { variants, baseStyles } from './variants';

const boxVariants = cva(
  baseStyles,
  {
    variants,
    defaultVariants: {
      variant: VARIANT.PRIMARY,
      size: SIZE.MEDIUM,
      direction: DIRECTION.ROW,
    },
  }
);

export type TBoxConfig = VariantProps<typeof boxVariants> & {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export const Box = ({
  size = SIZE.MEDIUM,
  variant = VARIANT.PRIMARY,
  direction = DIRECTION.ROW,
  className,
  children,
  ...props
}: TBoxConfig) => {
  return (
    <div
      className={cn(boxVariants({ variant, size, direction }), className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Box;
