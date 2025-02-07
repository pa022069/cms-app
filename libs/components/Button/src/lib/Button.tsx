import styled, { css } from 'styled-components';

type TButtonProps = {
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

const buttonSize = {
  small: css`
    font-size: 12px;
    padding: 4px 8px;
  `,
  medium: css`
    font-size: 16px;
    padding: 8px 16px;
  `,
  large: css`
    font-size: 20px;
    padding: 12px 24px;
  `,
};

const buttonVariants = {
  primary: css`
    background-color: #007bff;
    color: white;
    &:hover {
      background-color: #0056b3;
    }
  `,
  secondary: css`
    background-color: #6c757d;
    color: white;
    &:hover {
      background-color: #5a6268;
    }
  `,
  danger: css`
    background-color: #dc3545;
    color: white;
    &:hover {
      background-color: #c82333;
    }
  `,
};

const StyledButton = styled.button<{
  variant: keyof typeof buttonVariants;
  size: keyof typeof buttonSize;
}>`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  ${(props) => buttonVariants[props.variant]}
  ${(props) => buttonSize[props.size]}
`;

export const Button = ({
  size = 'medium',
  variant = 'primary',
  style,
  className,
  children,
  ...props
}: TButtonProps) => {
  return (
    <div>
      <StyledButton variant={variant} size={size} style={style} {...props}>
        {children}
      </StyledButton>
    </div>
  );
};

export default Button;
