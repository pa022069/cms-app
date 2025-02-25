import styled from 'styled-components';
import { settings } from './setting';
import { SIZE, VARIANT } from './enums';

export type TButtonConfig = {
  size?: SIZE;
  variant?: VARIANT;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  [key: string]: any;
};

const StyledButton = styled.button<{
  variant: VARIANT;
  size: SIZE;
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
  size = SIZE.MEDIUM,
  variant = VARIANT.PRIMARY,
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
