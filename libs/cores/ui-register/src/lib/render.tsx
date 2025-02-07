import React from 'react';
import { registry } from './ui-register';

type RenderProps = {
  name: string;
  config?: {
    variant?: string;
    style?: React.CSSProperties;
    size?: string;
    options?: any[];
    [key: string]: any;
  };
};

export const RenderComponent: React.FC<RenderProps> = ({
  name,
  config,
}: RenderProps) => {
  const componentConfig = registry.getComponent(name);
  if (!componentConfig) {
    return <div>未找到元件 {name}</div>;
  }

  const { component: Component } = componentConfig;
  const mergedProps = {
    ...config,
    style: {
      ...config?.style,
    },
    size: config?.size || 'default',
    options: config?.options || [],
  };

  return <Component {...mergedProps} />;
};
