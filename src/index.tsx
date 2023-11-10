import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {reviewMocks} from './mock/review-mocks/review-mocks';
import {store} from './store/index';
import {fetchOffersAction} from './services/api-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchOffersAction());

root.render(

  <React.StrictMode>
    <Provider store = {store}>
      <App reviewProps = {reviewMocks}/>
    </Provider>
  </React.StrictMode>
);
