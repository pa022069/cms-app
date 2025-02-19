/**
 * @component StructureRender
 * @description 結構化元件渲染器
 */

import { memo } from 'react';
import { RenderComponent, TRenderProps } from '@libs-cores/ui-register';

type TRenderTreeProps = Pick<
  TRenderProps,
  'id' | 'name' | 'config' | 'children'
>;

type TStructureRenderProps = {
  pageData: any[];
  editable?: boolean;
};

const RenderTree = ({
  data,
  editable,
}: {
  data: TRenderTreeProps;
  editable?: boolean;
}) => {
  if (!data) return null;
  return (
    <RenderComponent
      key={data.id}
      id={data.id}
      name={data.name}
      config={data.config}
      editable={editable}
    >
      {Array.isArray(data.children)
        ? data.children.map((child: TRenderTreeProps) => (
            <RenderTree key={child.id} data={child} editable={editable} />
          ))
        : data.children}
    </RenderComponent>
  );
};

const StructureRender = memo(
  ({ pageData, editable }: TStructureRenderProps) => {
    return (
      <>
        {pageData.map((child: TRenderTreeProps) => (
          <RenderTree key={child.id} data={child} editable={editable} />
        ))}
      </>
    );
  }
);

export default StructureRender;
