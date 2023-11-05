// import { offersMock } from '../mock/offers/offer-mocks';
// import type {Offers} from '../mock/offers/offer-mocks';
// import { DEFAULT_CITY } from '../const';
// import { combineReducers, createSlice } from '@reduxjs/toolkit';

// type InitialState = {
//   offers: Offers;
//   currentCity: string;
// }

// const initialState: InitialState = {
//   offers: offersMock,
//   currentCity: DEFAULT_CITY,
// };

// const sliceCity = createSlice({
//   name: 'filter/changeCity',
//   initialState,
//   reducers: {
//     changeCity(state, action) {
//       state.currentCity = action.payload;
//     }
//   }
// });


// const sliceOffers = createSlice({
//   name: 'offers/addOfferList',
//   initialState,
//   reducers: {

//     addOfferList (state, action) {
//       state.offers = action.payload;
//     }
//   },
// });


// const reducer = combineReducers({
//   [sliceCity.name]: sliceCity.reducer,
//   [sliceOffers.name]: sliceOffers.reducer
// });

// export {reducer, sliceCity, sliceOffers};
