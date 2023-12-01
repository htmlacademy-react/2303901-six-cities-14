import {createApi} from '../../api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {Action} from 'redux';
import {State} from '../../../types/type-store';
import {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {ApiRoute} from '../../../const';
import {checkAuthAction} from '../check-auth-action';
import {offersMock} from '../../../mock/offers/offer-mocks';
import {fetchOffersAction} from '../fetch-offers';
import {fetchOfferAction} from '../fetch-offer';
import {offer} from '../../../mock/offer/offer';
import { fetchComments } from '../fech-comments';
import { mockComments } from '../../../mock/comments/comment';

type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createApi>, Action>

const extractActionsTypes = (actions: Action<string>[]) => actions.map(({type}) => type);

describe('Async actions', () => {
  const axios = createApi();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({});
  });

  it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
    mockAxiosAdapter.onGet(ApiRoute.Login).reply(200);

    await store.dispatch(checkAuthAction());
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type,
    ]);
  });


  it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async() => {
    mockAxiosAdapter.onGet(ApiRoute.Login).reply(400);

    await store.dispatch(checkAuthAction());
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.rejected.type,
    ]);
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending", when server response 200', async() => {

      const mockOffers = [offersMock];

      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(fetchOffersActionFulfilled.payload)
        .toEqual(mockOffers);
    });

    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(400, []);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });

  describe('fetchOfferAction', () => {
    it('should dispatch "fetchOfferAction.pending", when server response 200', async() => {

      const mockOffer = offer;

      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${mockOffer.id}`).reply(200, mockOffer);

      await store.dispatch(fetchOfferAction(mockOffer.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOfferAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([

        fetchOfferAction.pending.type,
        fetchOfferAction.fulfilled.type,

      ]);

      expect(fetchOfferActionFulfilled.payload)
        .toEqual(mockOffer);
    });

    it('should dispatch "fetchOfferAction.pending", "fetchOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${offer.id}`).reply(400, []);

      await store.dispatch(fetchOfferAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.rejected.type,
      ]);
    });
  });

  describe('fetchCommentsAction', () => {
    it('should dispatch "fetchCommentsAction.pending", when server response 200', async() => {

      const comments = mockComments;

      mockAxiosAdapter.onGet(`${ApiRoute.Comments}/${offer.id}`).reply(200, comments);

      await store.dispatch(fetchComments(offer.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCommentsActionFulfilled = emittedActions[1] as ReturnType<typeof fetchComments.fulfilled>;

      expect(extractedActionsTypes).toEqual([

        fetchComments.pending.type,
        fetchComments.fulfilled.type,
      ]);

      expect(fetchCommentsActionFulfilled.payload)
        .toEqual(comments);
    });

    it('should dispatch "fetchOfferAction.pending", "fetchOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Comments}/${offer.id}`).reply(400, []);

      await store.dispatch(fetchComments(offer.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchComments.pending.type,
        fetchComments.rejected.type,
      ]);
    });
  });
});


