import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { registry } from '@libs-cores/ui-register';
import { ButtonConfig } from '@libs-components/Button';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

registry.register(ButtonConfig);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
