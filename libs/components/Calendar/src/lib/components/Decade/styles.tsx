import { GAP } from '../../base/design-tokens';
import { cn } from '@libs/utils';

export function Container({ children }: { children: React.ReactNode }) {
  return <div className={cn('grid grid-cols-4', GAP['BASE'])}>{children}</div>;
}
