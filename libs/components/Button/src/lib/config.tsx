import Button from './Button';
import { settings } from './setting';

const getEnums = (key: string) => {
  return {
    [key]: {
      type: 'string',
      enum: !settings[key] ? [] : Object.keys(settings[key]),
    },
  };
};

export const buttonConfig = (name?: string) => ({
  name: name || 'core/button',
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
});
