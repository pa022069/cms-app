import { create } from 'zustand';

interface ComponentState {
  target: {
    id: string | null;
    name: string | null;
    config: Record<string, any>;
    children: any[] | string;
  };
  setSelectedComponent: (target: {
    id: string;
    name: string;
    config: Record<string, any>;
    children: any[] | string;
  }) => void;
  updateProps: (newProps: Record<string, any>) => void;
}

export const useComponentStore = create<ComponentState>((set) => ({
  target: {
    id: null,
    name: null,
    config: {},
    children: [],
  },
  setSelectedComponent: (target) => set({ target }),
  updateProps: (newProps) =>
    set((state) => ({
      target: {
        ...state.target,
        config: { ...state.target.config, ...newProps },
      },
    })),
}));
