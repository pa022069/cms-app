import React from 'react';
import { registry } from './ui-register';
import { useComponentStore } from '../store/editStore';
import { v4 as uuid } from 'uuid';

type RenderProps = {
  id?: string;
  name: string;
  config?: {
    variant?: string;
    style?: React.CSSProperties;
    size?: string;
    options?: any[];
    [key: string]: any;
  };
  editable?: boolean;
};

export const RenderComponent: React.FC<RenderProps> = ({
  id = uuid(),
  name,
  config,
  editable,
}: RenderProps) => {
  const { setSelectedComponent } = useComponentStore();
  const componentConfig = registry.getComponent(name);

  if (!componentConfig) {
    return <div>未找到元件 {name}</div>;
  }

  const { component: Component } = componentConfig;

  if (editable) {
    return (
      <Component
        id={id}
        {...config}
        onClick={() => {
          setSelectedComponent(id, name, config || {});
        }}
      />
    );
  }

  return <Component {...config} />;
};
