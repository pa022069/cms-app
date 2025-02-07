import NxWelcome from './nx-welcome';
import { Button } from '@libs-components/Button';
import { RenderComponent, registry } from '@libs-cores/ui-register';
import useSettingControl from './hooks/useSettingControl';

export function App() {
  const buttonConfig = registry.getComponent('button');
  const buttonSchema = buttonConfig?.options?.schema;

  const { props: buttonProps, handleChange: handleButtonChange } =
    useSettingControl({
      schema: buttonSchema,
    });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4">
        <Button variant="primary" size="small">
          Click me
        </Button>
        <RenderComponent
          name="button"
          config={{
            variant: 'danger',
            size: 'small',
            children: 'Click me',
            onClick: () => {
              alert('Button clicked');
            },
            ...buttonProps,
          }}
        />
      </div>
      <div>
        {Object.entries(buttonSchema.properties).map(([key, value]: any) => (
          <div key={key}>
            <label>{key}：</label>
            <select
              value={buttonProps[key]}
              onChange={(e) => handleButtonChange(key, e.target.value)}
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
      <NxWelcome title="cms" />
    </div>
  );
}

export default App;
