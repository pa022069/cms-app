export enum DirectionType {
  LEFT = "left",
  RIGHT = "right",
}

export enum SizeType {
  FIT = "fit",
  FULL = "full",
}

export type StyledButtonProps = {
  size?: SizeType;
};

export type ControlButtonProps = {
  direction: DirectionType;
  onClick?: () => void;
};
