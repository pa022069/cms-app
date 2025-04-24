import Button from './Button';
import { variants } from './variants';

const getEnums = (key: string) => {
  return {
    [key]: {
      type: 'string',
      enum: !variants[key] ? [] : Object.keys(variants[key]),
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
