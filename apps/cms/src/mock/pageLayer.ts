import { TComponentType } from '../types/layer-control';
import { CORE } from '../enums/components-library';
export const mockData: TComponentType[] = [
  {
    id: 'root',
    name: CORE.BOX,
    config: {
      direction: 'column',
    },
    children: [
      {
        id: '1',
        name: CORE.BUTTON,
        config: {
          variant: 'danger',
          size: 'large',
          className: 'text-black',
          onClick: () => {
            alert('Button clicked');
          },
        },
        children: 'Click Me 1',
      },
      {
        id: '2',
        name: CORE.BUTTON,
        config: {
          variant: 'secondary',
          size: 'medium',
          className: 'text-black',
          onClick: () => {
            alert('Button clicked');
          },
        },
        children: 'Click Me 2',
      },
      {
        id: '3',
        name: CORE.BOX,
        config: {
          direction: 'row',
        },
        children: [
          {
            id: '3-1',
            name: CORE.BUTTON,
            config: {
              variant: 'danger',
              size: 'large',
              className: 'text-black',
              onClick: () => {
                alert('Button clicked');
              },
            },
            children: 'Click Me 3-1',
          },
          {
            id: '3-2',
            name: CORE.BUTTON,
            config: {
              variant: 'secondary',
              size: 'medium',
              className: 'text-black',
              onClick: () => {
                alert('Button clicked');
              },
            },
            children: 'Click Me 3-2',
          },
        ],
      },
    ],
  },
];
