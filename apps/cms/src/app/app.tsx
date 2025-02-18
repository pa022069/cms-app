import NxWelcome from './nx-welcome';
import { Button } from '@libs-components/Button';
import { RenderComponent, registry } from '@libs-cores/ui-register';
import { useComponentStore } from '@libs-cores/ui-register';
import '../helpers/treeControl';

export function EditController() {
  const { id, name, props } = useComponentStore();
  if (!id || !name) return null;
  const schema = registry.getComponent(name)?.options?.schema;
  return (
    <div>
      {Object.entries(schema?.properties || {}).map(([key, value]: any) => (
        <div key={key}>
          <label>{key}：</label>
          <select defaultValue={props[key]}>
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

export function App() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4">
        <Button variant="primary" size="small">
          Click me
        </Button>
        <EditController />
        <RenderComponent
          name="core/button"
          config={{
            variant: 'danger',
            size: 'large',
            children: 'Click me',
            className: 'text-black',
            onClick: () => {
              alert('Button clicked');
            },
          }}
          editable
        />
      </div>
      <NxWelcome title="cms" />
    </div>
  );
}

export default App;
