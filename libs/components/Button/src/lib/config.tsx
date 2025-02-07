import Button from './Button';
import { settings } from './setting';

const getEnums = (key: string) => {
  return {
    [key]: {
      type: 'string',
      enum: !settings[key] ? [] : [...Object.keys(settings[key])].sort(),
    },
  };
};

export const ButtonConfig = {
  name: 'core/button',
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
