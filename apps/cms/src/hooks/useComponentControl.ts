import { v4 as uuid } from 'uuid';
import { CORE } from '../enums/components-library';

export const useComponentControl = (control: any) => {
  const { flatten, target, addComponent, moveComponent } = control;

  const addCOmponentInStructure = () => {
    if (typeof target.children === 'string') {
      console.error("Can't add component in this component");
      return;
    }
    addComponent(
      flatten,
      {
        id: uuid(),
        name: CORE.BUTTON,
        config: {
          variant: 'secondary',
          size: 'large',
          onClick: () => {
            alert('Add Button clicked');
          },
        },
        children: 'Add Button',
      },
      !target.id ? 'root' : target.id
    );
  };

  const moveComponentInStructure = () => {
    moveComponent(flatten, '1', '3', 1);
  };

  return {
    addCOmponentInStructure,
    moveComponentInStructure,
  };
};
