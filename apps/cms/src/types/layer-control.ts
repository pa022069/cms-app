import { ComponentConfigMap } from './components-library';

export type TComponentType<
  Name extends keyof ComponentConfigMap = keyof ComponentConfigMap
> = {
  id: string;
  name: Name;
  config: ComponentConfigMap[Name];
  children: TComponentType[] | unknown;
};

export type TFlattenTree = {
  components: Record<string, TComponentType>;
  hierarchy: Record<string, string | null>;
};
