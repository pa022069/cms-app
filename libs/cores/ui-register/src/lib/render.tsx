import React from 'react';
import { registry } from './ui-register';
import { useComponentStore } from '../store/editStore';
import { v4 as uuid } from 'uuid';

export type TRenderProps = {
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
  children?: React.ReactNode;
};

export const RenderComponent: React.FC<TRenderProps> = ({
  id = uuid(),
  name,
  config,
  editable,
  children,
}: TRenderProps) => {
  const { setSelectedComponent } = useComponentStore();
  const componentConfig = registry.getComponent(name);

  if (!componentConfig) {
    return <div>未找到元件 {name}</div>;
  }

  const { component: Component } = componentConfig;

  if (editable) {
    return (
      <Component
        key={id}
        id={id}
        {...config}
        onClick={(event: React.MouseEvent<HTMLDivElement>) => {
          event.stopPropagation();
          setSelectedComponent({
            id,
            name,
            config,
          });
        }}
        children={children}
      />
    );
  }

  return <Component key={id} {...config} children={children} />;
};
