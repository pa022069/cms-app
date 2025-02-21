import { Button } from '@libs-components/Button';
import { TComponentType } from '../../../../types/layer-control';

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
        variant="secondary"
        size="small"
        onClick={moveComponentInStructure}
      >
        Move
      </Button>
      <Button
        variant="secondary"
        size="small"
        onClick={addCOmponentInStructure}
      >
        Add
      </Button>
      <Button
        variant="secondary"
        size="small"
        onClick={() => console.log(treeData)}
      >
        Save
      </Button>
    </div>
  );
}

export default NavControl;
