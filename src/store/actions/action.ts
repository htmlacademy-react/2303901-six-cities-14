import {createAction} from '@reduxjs/toolkit';
import type {Offers} from '../../mock/offers/offer-mocks';


const changeCity = createAction('filter/changeCity', (city: string) => ({
  payload: city
}));

const addOfferList = createAction('offers/addOfferList', (offers: Offers) => ({
  payload: offers
}));

export {
  changeCity,
  addOfferList
};
