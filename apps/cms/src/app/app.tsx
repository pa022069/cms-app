import { useMemo } from 'react';
import { Button } from '@libs-components/Button';
import StructureRender from '../components/StructureRender';
import EditController from '../components/EditController';
import { useLayerControl, TComponentType } from '../hooks/useLayerControl';

const mockData: TComponentType[] = [
  {
    id: 'root',
    name: 'core/box',
    config: {
      direction: 'column',
    },
    children: [
      {
        id: '1',
        name: 'core/button',
        config: {
          variant: 'danger',
          size: 'large',
          className: 'text-black',
          onClick: () => {
            alert('Button clicked');
          },
        },
        children: 'Click Me',
      },
      {
        id: '2',
        name: 'core/button',
        config: {
          variant: 'secondary',
          size: 'medium',
          className: 'text-black',
          onClick: () => {
            alert('Button clicked');
          },
        },
        children: 'Click Me',
      },
      {
        id: '3',
        name: 'core/box',
        config: {
          direction: 'row',
        },
        children: [
          {
            id: '3-1',
            name: 'core/button',
            config: {
              variant: 'danger',
              size: 'large',
              className: 'text-black',
              onClick: () => {
                alert('Button clicked');
              },
            },
            children: 'Click Me',
          },
          {
            id: '3-2',
            name: 'core/button',
            config: {
              variant: 'secondary',
              size: 'medium',
              className: 'text-black',
              onClick: () => {
                alert('Button clicked');
              },
            },
            children: 'Click Me',
          },
        ],
      },
    ],
  },
];

function Structure({ editable }: { editable: boolean }) {
  const { buildTree, flatten } = useLayerControl(mockData);
  const pageTree = useMemo(() => buildTree(flatten), [flatten, buildTree]);

  if (!editable) {
    return <StructureRender pageData={mockData} editable={editable} />;
  }
  return (
    <div className="flex flex-col w-full">
      <div className="p-2 flex justify-end">
        <Button
          variant="secondary"
          size="small"
          onClick={() => console.log(pageTree)}
        >
          Save
        </Button>
      </div>
      <div className="flex">
        <div className="flex-1">
          <StructureRender
            pageData={editable ? pageTree : mockData}
            editable={editable}
          />
        </div>
        {editable && <EditController className="px-4 py-2 flex-[0_0_200px]" />}
      </div>
    </div>
  );
}

export function App() {
  const isEditMode = true;

  return (
    <div className="flex gap-4">
      <Structure editable={isEditMode} />
    </div>
  );
}

export default App;
