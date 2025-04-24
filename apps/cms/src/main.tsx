import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import Cms from './app/cms';
import Home from './app/home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { registry } from '@libs-cores/ui-register';
import { buttonConfig } from '@libs-components/Button';
import { boxConfig } from '@libs-components/Box';
import { CORE } from './enums/components-library';

registry.register(buttonConfig(CORE.BUTTON));
registry.register(boxConfig(CORE.BOX));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/cms" element={<Cms />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
