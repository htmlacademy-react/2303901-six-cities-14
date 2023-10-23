import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {OffersCount} from './const';
import {offersMock} from './mock/offers/offer-mocks';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App CountOffers = {OffersCount.CountOffers} offerProps = {offersMock} />
  </React.StrictMode>
);
