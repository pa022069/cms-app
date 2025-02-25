import styled from 'styled-components';
import { settings } from './setting';
import { SIZE, VARIANT, DIRECTION } from './enums';

export type TBoxConfig = {
  size?: SIZE;
  variant?: VARIANT;
  direction?: DIRECTION;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

const StyledBox = styled.div<{
  variant: VARIANT;
  size: SIZE;
  direction: DIRECTION;
}>`
  display: flex;
  ${(props) => settings.direction[props.direction]}
  ${(props) => settings.variant[props.variant]}
  ${(props) => settings.size[props.size]}
`;

export const Box = ({
  size = SIZE.MEDIUM,
  variant = VARIANT.PRIMARY,
  direction = DIRECTION.ROW,
  children,
  ...props
}: TBoxConfig) => {
  return (
    <div>
      <StyledBox variant={variant} size={size} direction={direction} {...props}>
        {children}
      </StyledBox>
    </div>
  );
};

export default Box;
