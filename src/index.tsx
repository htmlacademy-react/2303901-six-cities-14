import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {App} from './components/app/app';
import {store} from './store/index';
import {fetchOffersAction, checkAuthAction} from './services/api-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

root.render(

  <React.StrictMode>
    <Provider store = {store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
