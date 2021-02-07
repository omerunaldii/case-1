import App from './App';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import './layout/styles/index.scss';
import { StateProvider } from './store';
import "./i18n/i18nextInit";

ReactDOM.render(
  <Suspense fallback="...">
    <React.StrictMode>
      <StateProvider>
        <App />
      </StateProvider>
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root')
);
