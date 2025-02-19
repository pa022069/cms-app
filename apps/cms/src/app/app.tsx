import { useMemo } from 'react';
import NxWelcome from './nx-welcome';
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

  return (
    <>
      {editable && <EditController />}
      <StructureRender
        pageData={editable ? pageTree : mockData}
        editable={editable}
      />
    </>
  );
}

export function App() {
  const isEditMode = true;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4">
        <Button variant="primary" size="small">
          Click me
        </Button>
        <Structure editable={isEditMode} />
      </div>
      <NxWelcome title="cms" />
    </div>
  );
}

export default App;
