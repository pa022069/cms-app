import styled from 'styled-components';
import { settings } from './setting';

type TBoxProps = {
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'danger';
  direction?: 'row' | 'column';
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

const StyledBox = styled.div<{
  variant: keyof typeof settings.variant;
  size: keyof typeof settings.size;
  direction: keyof typeof settings.direction;
}>`
  display: flex;
  ${(props) => settings.direction[props.direction]}
  ${(props) => settings.variant[props.variant]}
  ${(props) => settings.size[props.size]}
`;

export const Box = ({
  size = 'medium',
  variant = 'primary',
  direction = 'row',
  children,
  ...props
}: TBoxProps) => {
  return (
    <div>
      <StyledBox variant={variant} size={size} direction={direction} {...props}>
        {children}
      </StyledBox>
    </div>
  );
};

export default Box;
