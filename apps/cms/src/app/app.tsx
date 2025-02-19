import { useEffect, useState } from 'react';
import NxWelcome from './nx-welcome';
import { Button } from '@libs-components/Button';
import { RenderComponent, registry } from '@libs-cores/ui-register';
import { useComponentStore } from '@libs-cores/ui-register';
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

function EditController() {
  const { id, name, props, updateProps } = useComponentStore();
  const [values, setValues] = useState<Record<string, any>>({});

  useEffect(() => {
    setValues(props);
  }, [id, name, props]);

  if (!id || !name) return null;
  const schema = registry.getComponent(name)?.options?.schema;

  return (
    <div>
      {Object.entries(schema?.properties || {}).map(([key, value]: any) => (
        <div key={key}>
          <label>{key}：</label>
          <select
            value={values[key]}
            onChange={(e) => {
              setValues({ ...values, [key]: e.target.value });
              updateProps({ [key]: e.target.value });
            }}
          >
            {value.enum.map((option: any) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

const RenderTree = ({ data }: { data: any }) => {
  if (!data) return null;

  return (
    <RenderComponent
      key={data.id}
      name={data.name}
      config={data.config}
      editable
    >
      {Array.isArray(data.children)
        ? data.children.map((child: any) => (
            <RenderTree key={child.id} data={child} />
          ))
        : data.children}
    </RenderComponent>
  );
};

export function App() {
  const { buildTree, flatten } = useLayerControl(mockData);
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4">
        <Button variant="primary" size="small">
          Click me
        </Button>
        <EditController />
        {buildTree(flatten).map((data) => (
          <RenderTree key={data.id} data={data} />
        ))}
      </div>
      <NxWelcome title="cms" />
    </div>
  );
}

export default App;
