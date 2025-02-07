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

  const { component: Component, options } = componentConfig;
  const mergedProps = {
    ...config,
    style: {
      ...options?.styles?.defaultStyle,
      ...options?.styles?.variant?.[config?.variant || 'default'],
      ...config?.style,
    },
    size: config?.size || options?.attributes?.size || 'default',
    options: config?.options || options?.attributes?.options || [],
  };

  return <Component {...mergedProps} />;
};
