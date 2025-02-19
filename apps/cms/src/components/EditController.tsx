/**
 * @component EditController
 * @description 編輯元件的控制器
 * @hooks useComponentStore: 取得/更新目標元件狀態
 * @function registry.getComponent: 取得元件的編輯選項
 */

import { registry } from '@libs-cores/ui-register';
import { useComponentStore } from '@libs-cores/ui-register';

type TKeyValue = [string, { enum: string[] }];

const EditController = () => {
  const { target, updateProps } = useComponentStore();
  const { id, name, config } = target;

  if (!id || !name) return null;
  const schema = registry.getComponent(name)?.options?.schema;

  return (
    <div>
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
