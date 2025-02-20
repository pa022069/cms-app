import { useState, useEffect, useCallback } from 'react';
import { useComponentStore } from '@libs-cores/ui-register';
import { ComponentConfigMap } from '../types/components-library';
import { TComponentType, TFlattenTree } from '../types/layer-control';

export const useLayerControl = (initData: TComponentType[]) => {
  const { target } = useComponentStore();
  const [treeData, setTreeData] = useState<(TComponentType | null)[]>(initData);
  const [flatten, setFlatten] = useState<TFlattenTree>({
    components: {},
    hierarchy: {},
  });

  useEffect(() => {
    if (!target.id || !target.config) return;
    editComponent(flatten, target.id, {
      ...flatten.components[target.id],
      config: target.config,
    });
  }, [target]);

  useEffect(() => {
    if (Object.keys(flatten.components).length === 0) return;
    const tranformData = buildTree(flatten);
    setTreeData(tranformData);
  }, [flatten]);

  const flattenTree = useCallback(
    (
      treeData = initData || [],
      result: TFlattenTree = { components: {}, hierarchy: {} },
      parentId: string | null = null
    ) => {
      treeData.forEach((tree) => {
        const { id, name, config, children } = tree;

        if (!id || !name) return;

        result.components[id] = {
          id,
          name,
          config,
          children: Array.isArray(children)
            ? (children as TComponentType[]).map((child) => child.id)
            : children,
        };

        result.hierarchy[id] = parentId;

        if (Array.isArray(children) && children.length) {
          flattenTree(children, result, id);
        }
      });

      return result;
    },
    [initData]
  );

  const removeDuplicate = (arr: string[]) => {
    return Array.from(new Set(arr));
  };

  const buildTree = (state: TFlattenTree, rootId = 'root') => {
    function createNode(componentId: string): TComponentType | null {
      const component = state.components[componentId];
      if (!component) return null;
      return {
        id: component.id,
        name: component.name,
        config: component.config,
        children: Array.isArray(component.children)
          ? component.children.map(createNode)
          : component.children,
      };
    }

    if (!createNode(rootId)) return [];
    return [createNode(rootId)];
  };

  const addComponent = <N extends keyof ComponentConfigMap>(
    state: TFlattenTree,
    newComponent: TComponentType<N>,
    parentId: string
  ) => {
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
          children: removeDuplicate([
            ...(state.components[parentId].children as string[]),
            newId,
          ]),
        },
      },
      hierarchy: {
        ...state.hierarchy,
        [newId]: parentId,
      },
    };

    setFlatten(result);

    return result;
  };

  const editComponent = (
    state: TFlattenTree,
    componentId: string,
    newComponent: TComponentType
  ) => {
    if (!state.components[componentId]) {
      console.error('Component ID not found');
      return state;
    }

    const result = {
      ...state,
      components: {
        ...state.components,
        [componentId]: newComponent,
      },
    };

    setFlatten(result);

    return result;
  };

  const moveComponent = (
    state: TFlattenTree,
    componentId: string,
    newParentId: string,
    index?: number
  ) => {
    const oldParentId = state.hierarchy[componentId];

    if (!oldParentId || !newParentId || oldParentId === newParentId)
      return state;

    // 從舊的父元件移除
    const oldParentChildren = (
      state.components[oldParentId].children as string[]
    ).filter((id) => id !== componentId);

    // 新增到新的父元件
    const newParentChildren = [
      ...(state.components[newParentId].children as string[]),
    ];
    const insertIndex = index ?? newParentChildren.length;

    // 避免重複添加
    if (!newParentChildren.includes(componentId)) {
      newParentChildren.splice(insertIndex, 0, componentId);
    }

    const result = {
      ...state,
      components: {
        ...state.components,
        [oldParentId]: {
          ...state.components[oldParentId],
          children: oldParentChildren,
        },
        [newParentId]: {
          ...state.components[newParentId],
          children: newParentChildren,
        },
      },
      hierarchy: {
        ...state.hierarchy,
        [componentId]: newParentId,
      },
    };

    setFlatten(result);

    return result;
  };

  const deleteComponent = (state: TFlattenTree, componentId: string) => {
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
      const children = (components[componentId]?.children as string[]) || [];
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
      newComponents[parentId].children = removeDuplicate(
        (newComponents[parentId].children as string[]).filter(
          (id) => id !== componentId
        )
      );
    }

    const result = {
      components: newComponents,
      hierarchy: newHierarchy,
    };

    setFlatten(result);

    return result;
  };

  useEffect(() => {
    function flattenTree(
      treeData = initData || [],
      result: TFlattenTree = { components: {}, hierarchy: {} },
      parentId: string | null = null
    ) {
      treeData.forEach((tree) => {
        const { id, name, config, children } = tree;

        if (!id || !name) return;

        result.components[id] = {
          id,
          name,
          config,
          children: Array.isArray(children)
            ? (children as TComponentType[]).map((child) => child.id)
            : children,
        };

        result.hierarchy[id] = parentId;

        if (Array.isArray(children) && children.length) {
          flattenTree(children, result, id);
        }
      });

      return result;
    }

    setFlatten(flattenTree());
  }, [initData]);

  return {
    target,
    treeData,
    flatten,
    addComponent,
    editComponent,
    moveComponent,
    deleteComponent,
    buildTree,
  };
};
