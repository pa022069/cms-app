import { TButtonConfig as CoreButton } from '@libs-components/Button';
import { TBoxConfig as CoreBox } from '@libs-components/Box';
import { CORE } from '../enums/components-library';

export type ComponentConfigMap = {
  [CORE.BUTTON]: CoreButton;
  [CORE.BOX]: CoreBox;
};
