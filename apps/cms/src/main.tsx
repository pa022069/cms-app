import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { registry } from '@libs-cores/ui-register';
import { ButtonConfig } from '@libs-components/Button';
import { BoxConfig } from '@libs-components/Box';

registry.register(ButtonConfig);
registry.register(BoxConfig);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
