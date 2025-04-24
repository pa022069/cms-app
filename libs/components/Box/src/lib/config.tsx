import Box from './Box';
import { variants } from './variants';

const getEnums = (key: string) => {
  return {
    [key]: {
      type: 'string',
      enum: !variants[key] ? [] : Object.keys(variants[key]),
    },
  };
};

export const boxConfig = (name?: string) => ({
  name: name || 'core/box',
  component: Box,
  options: {
    schema: {
      type: 'object',
      properties: {
        ...getEnums('size'),
        ...getEnums('variant'),
        ...getEnums('direction'),
      },
    },
  },
});
