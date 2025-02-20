import styled from 'styled-components';
import { settings } from './setting';

export type TButtonConfig = {
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  [key: string]: any;
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
  children,
  ...props
}: TButtonConfig) => {
  return (
    <div>
      <StyledButton variant={variant} size={size} {...props}>
        {children}
      </StyledButton>
    </div>
  );
};

export default Button;
