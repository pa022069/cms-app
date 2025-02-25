import StructureRender from '../../components/StructureRender';
import EditController from '../../components/EditController';
import { useLayerControl } from '../../hooks/useLayerControl';
import { useComponentControl } from '../../hooks/useComponentControl';
import { TComponentType } from '../../types/layer-control';
import { mockData } from '../../mock/pageLayer';
import NavControl from './components/Nav/NavControl';

function EditStructure({ data }: { data: TComponentType[] }) {
  const control = useLayerControl(data);
  const actions = useComponentControl(control);
  const { treeData } = control;

  return (
    <div className="flex flex-col w-full">
      <NavControl actions={actions} treeData={treeData} />
      <div className="flex">
        <div className="flex-1">
          <StructureRender pageData={treeData} />
        </div>
        <EditController className="px-4 py-2 flex-[0_0_200px]" />
      </div>
    </div>
  );
}

function App() {
  const isEditMode = true;

  return (
    <div className="flex gap-4">
      {isEditMode ? (
        <EditStructure data={mockData} />
      ) : (
        <StructureRender pageData={mockData} />
      )}
    </div>
  );
}

export default App;
