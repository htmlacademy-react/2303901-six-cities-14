import {createApi} from '../api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {Action} from 'redux';
import {State} from '../../types/type-store';
import {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {ApiRoute} from '../../const';
import {checkAuthAction} from '../thunk/check-auth-action';
import {offersMock} from '../../mock/offers/offer-mocks';
import {fetchOffersAction} from '../thunk/fetch-offers';
import {fetchOfferAction} from '../thunk/fetch-offer';
import {offer} from '../../mock/offer/offer';
import {fetchComments} from '../thunk/fetch-comments';
import {commentMock, mockComments} from '../../mock/comments/comment';
import {sendComment} from '../thunk/send-comment';
import {fetchOffersFavorite} from '../thunk/fetch-offers-favorite';
import {fetchOffersNear, sendFavoriteOffer} from '../api-actions';

type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createApi>, Action>

const extractActionsTypes = (actions: Action<string>[]) => actions.map(({type}) => type);

describe('Async actions', () => {
  const axios = createApi();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;
  const comment = commentMock;

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


  describe('postCommentAction', () => {
    it('should dispatch "sendCommentAction.pending", when server response 200', async() => {

      mockAxiosAdapter.onPost(`${ApiRoute.Comments}/${offer.id}`, {comment: comment.comment, rating: comment.rating}).reply(200, comment);

      await store.dispatch(sendComment({id: offer.id, comment: comment.comment, rating: comment.rating}));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const sendCommentActionFulfilled = emittedActions[1] as ReturnType<typeof sendComment.fulfilled>;

      expect(extractedActionsTypes).toEqual([

        sendComment.pending.type,
        sendComment.fulfilled.type,
      ]);

      expect(sendCommentActionFulfilled.payload)
        .toEqual(comment);
    });

    it('should dispatch "sendCommentAction.pending", "sendCommentAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(`${ApiRoute.Comments}/${offer.id}`, {comment: comment.comment, rating: comment.rating}).reply(400, []);

      await store.dispatch(sendComment({id: offer.id, comment: comment.comment, rating: comment.rating}));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        sendComment.pending.type,
        sendComment.rejected.type,
      ]);
    });
  });

  describe('fetchOffersFavoriteAction', () => {
    it('should dispatch "fetchOffersFavoriteAction.pending", when server response 200', async() => {

      const mockOffers = [offersMock];

      mockAxiosAdapter.onGet(ApiRoute.OffersFavorite).reply(200, mockOffers);

      await store.dispatch(fetchOffersFavorite());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersFavoriteActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersFavorite.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffersFavorite.pending.type,
        fetchOffersFavorite.fulfilled.type,
      ]);

      expect(fetchOffersFavoriteActionFulfilled.payload)
        .toEqual(mockOffers);
    });

    it('should dispatch "fetchOffersFavoriteAction.pending", "fetchOffersFavoriteAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.OffersFavorite).reply(400, []);

      await store.dispatch(fetchOffersFavorite());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersFavorite.pending.type,
        fetchOffersFavorite.rejected.type,
      ]);
    });
  });

  describe('postOfferFavoriteAction', () => {
    //   it('should dispatch "postOfferFavoriteAction.pending", when server response 201', async() => {

    //     mockAxiosAdapter.onPost(`${ApiRoute.OffersFavorite}/${offer.id}/${0}`).reply(201, offersMock[1]);

    //     await store.dispatch(sendFavoriteOffer({id: offersMock[1].id, status: 0}));

    //     const emittedActions = store.getActions();
    //     const extractedActionsTypes = extractActionsTypes(emittedActions);
    //     const send = emittedActions[1] as ReturnType<typeof sendFavoriteOffer.fulfilled>;

    //     expect(extractedActionsTypes).toEqual([

    //       sendFavoriteOffer.pending.type,
    //       sendFavoriteOffer.fulfilled.type,
    //     ]);

    //     expect(send.payload)
    //       .toEqual([offersMock[1]]);
    //   });

    it('should dispatch "postOfferFavoriteAction.pending", "postOfferFavoriteAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(`${ApiRoute.OffersFavorite}/${offer.id}/${1}`).reply(400, []);

      await store.dispatch(sendFavoriteOffer({id: offersMock[0].id, status: 1}));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        sendFavoriteOffer.pending.type,
        sendFavoriteOffer.rejected.type,
      ]);
    });
  });

  describe('fetchOffersNearAction', () => {
    it('should dispatch "fetchOffersNearAction.pending", when server response 200', async() => {

      const mockOffers = offersMock;

      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${offer.id}/nearby`).reply(200, mockOffers);

      await store.dispatch(fetchOffersNear(offer.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersNearActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersNear.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffersNear.pending.type,
        fetchOffersNear.fulfilled.type,
      ]);

      expect(fetchOffersNearActionFulfilled.payload)
        .toEqual(mockOffers);
    });

    it('should dispatch "fetchOffersNearAction.pending", "fetchOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(400, []);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });
});


