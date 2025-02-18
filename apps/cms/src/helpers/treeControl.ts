type TConfigType = {
  variant?: string;
  style?: React.CSSProperties;
  size?: string;
  options?: any[];
  [key: string]: any;
};

type TComponentType<T = TComponentType<any>> = {
  id: string;
  name: string;
  config: TConfigType;
  children: T[];
};

type TFlattenTree = {
  components: Record<string, TComponentType<any>>;
  hierarchy: Record<string, string | null>;
};

const mockData: TComponentType<TComponentType>[] = [
  {
    id: 'root',
    name: 'core/box',
    config: {
      variant: 'danger',
      size: 'large',
      children: 'Click me',
      className: 'text-black',
      onClick: () => {
        alert('Button clicked');
      },
    },
    children: [
      {
        id: '1',
        name: 'core/button',
        config: {
          variant: 'primary',
          size: 'small',
          children: 'Click me 1',
        },
        children: [],
      },
      {
        id: '2',
        name: 'core/button',
        config: {
          variant: 'primary',
          size: 'small',
          children: 'Click me 2',
        },
        children: [],
      },
      {
        id: '3',
        name: 'core/button',
        config: {
          variant: 'primary',
          size: 'small',
          children: 'Click me 3',
        },
        children: [],
      },
    ],
  },
];

class treeControl {
  private treeData: TComponentType<TComponentType>[];
  private flattenData: TFlattenTree;

  constructor(init: TComponentType<TComponentType>[]) {
    this.treeData = init;
    this.flattenData = this.flattenTree();
  }

  get getFlatten() {
    return this.flattenData;
  }

  setFlatten(data: TFlattenTree) {
    this.flattenData = data;
  }

  get getTree() {
    return this.buildTree(this.flattenData);
  }

  flattenTree(
    treeData = this.treeData || [],
    result: TFlattenTree = { components: {}, hierarchy: {} },
    parentId: string | null = null
  ) {
    treeData.forEach((tree) => {
      const { id, name, config, children = [] } = tree;

      if (!id || !name) return;

      result.components[id] = {
        id,
        name,
        config,
        children: children.map((child) => child.id),
      };

      result.hierarchy[id] = parentId;

      if (children.length) {
        this.flattenTree(children, result, id);
      }
    });

    return result;
  }

  buildTree(state: TFlattenTree, rootId = 'root') {
    function createNode(componentId: string): TComponentType<TComponentType> {
      const component = state.components[componentId];
      return {
        id: component.id,
        name: component.name,
        config: component.config,
        children: component.children.map(createNode),
      };
    }

    return [createNode(rootId)];
  }

  removeDuplicate(arr: string[]) {
    return Array.from(new Set(arr));
  }

  addComponent(
    state: TFlattenTree,
    newComponent: TComponentType,
    parentId: string
  ) {
    const newId = newComponent.id;

    if (state.components[newId]) {
      console.error('Component ID already exists: ', newId);
      return state;
    }

    const result: TFlattenTree = {
      ...state,
      components: {
        ...state.components,
        [newId]: newComponent,
        [parentId]: {
          ...state.components[parentId],
          children: this.removeDuplicate([
            ...state.components[parentId].children,
            newId,
          ]),
        },
      },
      hierarchy: {
        ...state.hierarchy,
        [newId]: parentId,
      },
    };

    this.setFlatten(result);

    return result;
  }

  moveComponent(state: TFlattenTree, componentId: string, newParentId: string) {
    const oldParentId = state.hierarchy[componentId];

    if (!oldParentId || !newParentId) return state;
    // 從舊的父元件移除
    const oldParentChildren = this.removeDuplicate(
      state.components[oldParentId].children.filter((id) => id !== componentId)
    );

    // 新增到新的父元件
    const newParentChildren = this.removeDuplicate([
      ...state.components[newParentId].children,
      componentId,
    ]);

    const result = {
      ...state,
      components: {
        ...state.components,
        [oldParentId]: {
          ...state.components[oldParentId],
          children: this.removeDuplicate(oldParentChildren),
        },
        [newParentId]: {
          ...state.components[newParentId],
          children: this.removeDuplicate(newParentChildren),
        },
      },
      hierarchy: {
        ...state.hierarchy,
        [componentId]: newParentId,
      },
    };

    this.setFlatten(result);

    return result;
  }

  deleteComponent(state: TFlattenTree, componentId: string) {
    if (!state.components[componentId]) {
      console.error('Component ID not found');
      return state;
    }
    const parentId = state.hierarchy[componentId];

    // 刪除該元件的所有子元件（遞歸）
    function recursiveDelete(
      componentId: string,
      components: TFlattenTree['components'],
      hierarchy: TFlattenTree['hierarchy']
    ) {
      const children = components[componentId]?.children || [];
      children.forEach((childId) => {
        const { newComponents, newHierarchy } = recursiveDelete(
          childId,
          components,
          hierarchy
        );
        components = newComponents;
        hierarchy = newHierarchy;
      });

      delete components[componentId];
      delete hierarchy[componentId];

      return { newComponents: components, newHierarchy: hierarchy };
    }

    const { newComponents, newHierarchy } = recursiveDelete(
      componentId,
      state.components,
      state.hierarchy
    );

    // 從父元件移除
    if (parentId) {
      newComponents[parentId].children = this.removeDuplicate(
        newComponents[parentId].children.filter((id) => id !== componentId)
      );
    }

    const result = {
      components: newComponents,
      hierarchy: newHierarchy,
    };

    this.setFlatten(result);

    return result;
  }
}

const tree = new treeControl(mockData);

const addComponent = tree.addComponent(
  tree.getFlatten,
  {
    id: '10',
    name: 'core/button',
    config: {
      variant: 'primary',
      size: 'small',
      children: 'Click me 10',
    },
    children: [],
  },
  '2'
);

const addComponent2 = tree.addComponent(
  tree.getFlatten,
  {
    id: '10',
    name: 'core/button',
    config: {
      variant: 'primary',
      size: 'small',
      children: 'Click me 10',
    },
    children: [],
  },
  '2'
);

console.log('add', addComponent);
console.log('add2', addComponent2);
console.log('flatten', tree.getFlatten);
