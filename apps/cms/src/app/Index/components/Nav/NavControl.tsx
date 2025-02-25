import { Button } from '@libs-components/Button';
import { TComponentType } from '../../../../types/layer-control';
import { VARIANT, SIZE } from '@libs-components/Button';

type TNavControl = {
  actions: {
    moveComponentInStructure: () => void;
    addCOmponentInStructure: () => void;
  };
  treeData: (TComponentType | null)[];
};

function NavControl({ actions, treeData }: TNavControl) {
  const { moveComponentInStructure, addCOmponentInStructure } = actions;
  return (
    <div className="p-2 flex justify-end gap-4">
      <Button
        variant={VARIANT.SECONDARY}
        size={SIZE.SMALL}
        onClick={moveComponentInStructure}
      >
        Move
      </Button>
      <Button
        variant={VARIANT.SECONDARY}
        size={SIZE.SMALL}
        onClick={addCOmponentInStructure}
      >
        Add
      </Button>
      <Button
        variant={VARIANT.SECONDARY}
        size={SIZE.SMALL}
        onClick={() => console.log(treeData)}
      >
        Save
      </Button>
    </div>
  );
}

export default NavControl;
