import NxWelcome from './nx-welcome';
import { Button } from '@libs-components/Button';
import { RenderComponent } from '@libs-cores/ui-register';

export function App() {
  return (
    <div className="flex gap-8">
      <div>Box 1</div>
      <div>Box 2</div>
      <div>Box 3</div>
      <Button variant="primary" size="small">
        Click me
      </Button>
      <RenderComponent
        name="button"
        config={{
          variant: 'danger',
          size: 'small',
          children: 'Click me',
        }}
      />
      <NxWelcome title="cms" />
    </div>
  );
}

export default App;
