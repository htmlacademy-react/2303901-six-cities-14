import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {offersMock} from './mock/offers/offer-mocks';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offerProps = {offersMock} />
  </React.StrictMode>
);
