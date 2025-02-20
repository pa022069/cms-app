import { Button } from '@libs-components/Button';
import StructureRender from '../components/StructureRender';
import EditController from '../components/EditController';
import { useLayerControl } from '../hooks/useLayerControl';
import { useComponentControl } from '../hooks/useComponentControl';
import { TComponentType } from '../types/layer-control';
import { mockData } from '../mock/pageLayer';

function Structure({
  data,
  editable,
}: {
  data: TComponentType[];
  editable: boolean;
}) {
  const control = useLayerControl(data);
  const { addCOmponentInStructure, moveComponentInStructure } =
    useComponentControl(control);
  const { treeData } = control;

  if (!editable) {
    return <StructureRender pageData={data} />;
  }
  return (
    <div className="flex flex-col w-full">
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
      <div className="flex">
        <div className="flex-1">
          <StructureRender
            pageData={editable ? treeData : mockData}
            editable={editable}
          />
        </div>
        {editable && <EditController className="px-4 py-2 flex-[0_0_200px]" />}
      </div>
    </div>
  );
}

function App() {
  const isEditMode = true;

  return (
    <div className="flex gap-4">
      <Structure data={mockData} editable={isEditMode} />
    </div>
  );
}

export default App;
