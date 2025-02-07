import NxWelcome from './nx-welcome';
import { Button } from '@libs-components/Button';
import { RenderComponent, registry } from '@libs-cores/ui-register';

export function App() {
  const buttonSchema = registry.getComponent('core/button')?.options?.schema;
  console.log('buttonSchema', buttonSchema);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4">
        <Button variant="primary" size="small">
          Click me
        </Button>
        <RenderComponent
          name="core/button"
          config={{
            variant: 'danger',
            size: 'large',
            children: 'Click me',
            onClick: () => {
              alert('Button clicked');
            },
          }}
        />
      </div>
      <NxWelcome title="cms" />
    </div>
  );
}

export default App;
