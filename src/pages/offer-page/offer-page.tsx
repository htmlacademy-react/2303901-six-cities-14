import {FormSendComment} from '../../components/form-send-comment/form-send-comment';
import ListReview from '../../components/list-review/list-review';
import {Logotype} from '../../components/logotype/logotype';
import {MapComponent} from '../../components/map/map';
import OffersListNear from '../../components/offers-list-near/offers-list-near';
import useDocumentTitle from '../../hooks/document-title';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';
import {Profile} from '../../components/profile/profile';
import {useParams} from 'react-router-dom';
import {fetchOffersNear} from '../../services/api-actions';
import {useEffect} from 'react';
import {ErrorMessage} from '../../components/error-message/error-message';
import {AuthorizationStatus, ENDING, SettingFavoriteButtonOfferPage, SettingLogoHeader, TitleDescription} from '../../const';
import {fetchOfferAction} from '../../services/thunk/fetch-offer';
import {FavoriteButton} from '../../components/favorite-button/favorite-button';
import type {OfferCard} from '../../types/type-store';
import type {OfferPage} from '../../types/type-store';
import {fetchComments} from '../../services/thunk/fech-comments';
import { LoadingComponent } from '../../components/loading-component/loading-component';
import { ProfileNotLoggedComponent } from '../../components/profile-not-loggeg/profile-not-logged';
import { fetchOffersFavorite } from '../../services/thunk/fetch-offers-favorite';

type OfferPagesProps = {
  title: string;
}

function OfferPage ({title} : OfferPagesProps) : JSX.Element {

  const dispatch = useAppDispatch();
  const id = useParams<string>();
  const stateOffersNear = useAppSelector((state) => state.OffersNear.offers);
  const stateOffer = useAppSelector((state) => state.loadOffer.offer);
  const stateComments = useAppSelector((state) => state.loadComments.comments);
  const stateError = useAppSelector((state) => state.loadOffer.error);
  const stateAut = useAppSelector((state) => state.authorizationStatus.authStatus);
  const offers = useAppSelector((state) => state.offers.offers);
  const offer = offers?.find((offerItem) => offerItem.id === id.offerId);
  const offerStatus = useAppSelector((state) => state.loadOffer.loading);
  const checkStatus = stateAut === AuthorizationStatus.Auth.toString();

  useEffect(() => {
    dispatch(fetchOfferAction(id.offerId));
    dispatch(fetchComments(id.offerId));
    dispatch(fetchOffersNear(id.offerId));
    dispatch(fetchOffersFavorite());

  },[title]);

  const pointToMap = {
    title: stateOffer?.city.name || '',
    lat: stateOffer?.location.latitude || 0,
    lng: stateOffer?.location.longitude || 0,
    zoom: stateOffer?.location.zoom || 0,
    id: stateOffer?.id || '',
  };

  const points = stateOffersNear.map((point) => {

    const pointMap = {
      title: point.city.name,
      lat: point.location.latitude,
      lng: point.location.longitude,
      zoom: point.location.zoom,
      id: point.id
    };

    return pointMap;
  }).slice(0, 3);

  const pointsToMap = [...points, pointToMap];

  useDocumentTitle(title);

  if(offerStatus){

    return <LoadingComponent/>;
  }

  return stateError !== null ? <ErrorMessage title = {TitleDescription.ErrorPage}/> : (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logotype className={SettingLogoHeader.className} width={SettingLogoHeader.width} height={SettingLogoHeader.height}/>
            </div>
            {checkStatus ? <Profile/> : <ProfileNotLoggedComponent/>}

          </div>
        </div>
      </header>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">

              {stateOffer?.images.map((image) => (
                <div key={image} className='offer__image-wrapper' >
                  <img
                    className='offer__image'
                    src={image}
                    alt='Photo studio'
                  />
                </div>
              )).slice(0, 6)}

            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">

              <span>{stateOffer?.isPremium ? <div className="offer__mark">Premium </div> : ''}</span>

              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {stateOffer?.title}
                </h1>

                <FavoriteButton
                  offer={offer as OfferCard}
                  className={SettingFavoriteButtonOfferPage.className}
                  width={SettingFavoriteButtonOfferPage.width}
                  height={SettingFavoriteButtonOfferPage.height}
                />

              </div>
              <div className="offer__rating rating">
                {stateOffer && (
                  <div className="offer__stars rating__stars">
                    <span style={{ width:  `${Math.round(stateOffer.rating) * 100 / 5}%`}} />
                    <span className="visually-hidden">{stateOffer.rating}</span>
                  </div>
                )}
                <span className="offer__rating-value rating__value">{stateOffer?.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{stateOffer?.type}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {stateOffer?.bedrooms} Bedroom{stateOffer?.bedrooms !== undefined && stateOffer.bedrooms >= ENDING ? 's' : ''}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {stateOffer?.maxAdults} adult{stateOffer?.maxAdults !== undefined && stateOffer.maxAdults >= ENDING ? 's' : ''}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{stateOffer?.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What &prime s inside</h2>
                <ul className="offer__inside-list">
                  {stateOffer?.goods.map((good) => (<li key={good} className="offer__inside-item">{good}</li>))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={stateOffer?.host.avatarUrl}
                      width={74}
                      height={74}
                      alt={stateOffer?.host.name}
                    />
                  </div>
                  <span className="offer__user-name">{stateOffer?.host.name}</span>
                  <span className="offer__user-status">{stateOffer?.host.isPro ? 'Pro' : ''}</span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">{stateOffer?.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  {stateComments && stateComments.length >= ENDING && stateComments.length !== undefined ? 'Reviews ' : 'Review '}
                  <span className="reviews__amount">{stateComments?.length}</span>
                </h2>

                <ListReview/>

                {stateAut === AuthorizationStatus.Auth.toString() ? <FormSendComment id={id.offerId}/> : ''}

              </section>
            </div>
          </div>
          <section className="offer__map map" >

            <MapComponent
              pointsToMap={pointsToMap}

              cityName={stateOffer?.city.name}
            />

          </section>
        </section>

        {stateOffer && <OffersListNear offersPoint={stateOffersNear} offerPoint={stateOffer} />}

      </main>
    </div>
  );
}

export {OfferPage};
