import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {App} from './components/app/app';
import {store} from './store/index';
import {checkAuthAction} from './services/thunk/check-auth-action';
import {fetchOffersAction} from './services/thunk/fetch-offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

setTimeout(() => {
  store.dispatch(fetchOffersAction());
}, 500);

store.dispatch(checkAuthAction());

root.render(

  <React.StrictMode>
    <Provider store = {store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
