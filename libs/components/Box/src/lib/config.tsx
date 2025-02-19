import Box from './Box';
import { settings } from './setting';

const getEnums = (key: string) => {
  return {
    [key]: {
      type: 'string',
      enum: !settings[key] ? [] : Object.keys(settings[key]),
    },
  };
};

export const BoxConfig = {
  name: 'core/box',
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
};
