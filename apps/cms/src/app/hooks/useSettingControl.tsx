import { useState } from 'react';

export default function useSettingControl({ schema }: any) {
  const [props, setProps] = useState(
    Object.fromEntries(
      Object.entries(schema.properties).map(([key, value]: any) => [
        key,
        value.default,
      ])
    )
  );

  const handleChange = (key: string, value: any) => {
    setProps((prev: any) => ({ ...prev, [key]: value }));
  };

  return {
    props,
    handleChange,
  };
}
