import { css, RuleSet } from 'styled-components';
import { SIZE, VARIANT } from './enums';

type TSettings = {
  [key: string]: {
    [key: string]: RuleSet<object>;
  };
};

export const settings: TSettings = {
  size: {
    [SIZE.MEDIUM]: css`
      font-size: 16px;
      padding: 8px 16px;
    `,
    [SIZE.SMALL]: css`
      font-size: 12px;
      padding: 4px 8px;
    `,
    [SIZE.LARGE]: css`
      font-size: 20px;
      padding: 12px 24px;
    `,
  },
  variant: {
    [VARIANT.PRIMARY]: css`
      background-color: #007bff;
      color: white;
      &:hover {
        background-color: #0056b3;
      }
    `,
    [VARIANT.SECONDARY]: css`
      background-color: #6c757d;
      color: white;
      &:hover {
        background-color: #5a6268;
      }
    `,
    [VARIANT.DANGER]: css`
      background-color: #dc3545;
      color: white;
      &:hover {
        background-color: #c82333;
      }
    `,
  },
};
