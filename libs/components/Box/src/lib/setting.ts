import { css, RuleSet } from 'styled-components';

type TSettings = {
  [key: string]: {
    [key: string]: RuleSet<object>;
  };
};

export const settings: TSettings = {
  size: {
    medium: css`
      font-size: 16px;
      padding: 8px 16px;
    `,
    small: css`
      font-size: 12px;
      padding: 4px 8px;
    `,
    large: css`
      font-size: 20px;
      padding: 12px 24px;
    `,
  },
  variant: {
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
  },
  direction: {
    row: css`
      flex-direction: row;
    `,
    column: css`
      flex-direction: column;
    `,
  },
};
