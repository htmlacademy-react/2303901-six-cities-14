import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {offersMock} from './mock/offers/offer-mocks';
import {reviewMocks} from './mock/review-mocks/review-mocks';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offerProps = {offersMock} reviewProps = {reviewMocks}/>
  </React.StrictMode>
);
