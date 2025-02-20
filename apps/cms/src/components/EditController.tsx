/**
 * @component EditController
 * @description 編輯元件的控制器
 * @hooks useComponentStore: 取得/更新目標元件狀態
 * @function registry.getComponent: 取得元件的編輯選項
 */

import { registry } from '@libs-cores/ui-register';
import { useComponentStore } from '@libs-cores/ui-register';

type TKeyValue = [string, { enum: string[] }];

type TEditControllerProps = {
  className?: string;
  style?: React.CSSProperties;
};

const EditController = ({ className, style }: TEditControllerProps) => {
  const { target, updateProps } = useComponentStore();
  const { id, name, config } = target;

  if (!id || !name) return <div className={className}>選擇元件進行編輯</div>;
  const schema = registry.getComponent(name)?.options?.schema;

  return (
    <div className={className} style={style}>
      {Object.entries(schema?.properties || {}).map(
        ([key, value]: TKeyValue) => (
          <div key={key}>
            <label>{key}：</label>
            <select
              value={config ? config[key] : null}
              onChange={(e) => {
                updateProps({ [key]: e.target.value });
              }}
            >
              {value.enum.map((option: string) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )
      )}
    </div>
  );
};

export default EditController;
