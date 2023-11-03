import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {offersMock} from './mock/offers/offer-mocks';
import {reviewMocks} from './mock/review-mocks/review-mocks';
import store from './store/indexes';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App offerProps = {offersMock} reviewProps = {reviewMocks}/>
    </Provider>
  </React.StrictMode>
);
