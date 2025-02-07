import Button from './Button';
import { settings } from './setting';

const getEnums = (key: string) => {
  if (!settings[key]) {
    return {
      [key]: {
        type: 'string',
        enum: [],
        default: '',
      },
    };
  }
  const enums: string[] = Object.keys(settings[key]);
  return {
    [key]: {
      type: 'string',
      enum: [...enums].sort(),
      default: enums[0],
    },
  };
};

export const ButtonConfig = {
  name: 'button',
  component: Button,
  options: {
    schema: {
      type: 'object',
      properties: {
        ...getEnums('size'),
        ...getEnums('variant'),
      },
    },
  },
};
