import { create } from 'zustand';

interface ComponentState {
  id: string | null;
  name: string | null;
  props: Record<string, any>;
  setSelectedComponent: (
    id: string,
    name: string,
    props: Record<string, any>
  ) => void;
  updateProps: (newProps: Record<string, any>) => void;
}

export const useComponentStore = create<ComponentState>((set) => ({
  id: null,
  name: null,
  props: {},
  setSelectedComponent: (id, name, props) => set({ id, name, props }),
  updateProps: (newProps) =>
    set((state) => ({
      props: { ...state.props, ...newProps },
    })),
}));
