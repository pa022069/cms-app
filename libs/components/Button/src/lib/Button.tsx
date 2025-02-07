import styled from 'styled-components';
import { settings } from './setting';

type TButtonProps = {
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

const StyledButton = styled.button<{
  variant: keyof typeof settings.variant;
  size: keyof typeof settings.size;
}>`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  ${(props) => settings.variant[props.variant]}
  ${(props) => settings.size[props.size]}
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
