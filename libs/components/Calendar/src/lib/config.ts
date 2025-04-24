import Calendar from './Calendar';
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
  name: name || 'core/calendar',
  component: Calendar,
  options: {
    schema: {
      type: 'object',
      properties: {
        ...getEnums('size'),
      },
    },
  },
});
