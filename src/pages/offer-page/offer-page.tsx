import FormSendComment from '../../components/form-send-comment/form-send-comment';
import ListReview from '../../components/list-review/list-review';
import Logotype from '../../components/logotype/logotype';
import {MapComponent} from '../../components/map/map';
import OffersListNear from '../../components/offers-list-near/offers-list-near';
import useDocumentTitle from '../../hooks/document-title';
import type {Reviews} from '../../types/types';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';
import {Profile} from '../../components/profile/profile';
import {useParams} from 'react-router-dom';
import {store} from '../../store';
import {fetchOfferAction} from '../../services/api-actions';
import {useEffect} from 'react';
import {offerSlice} from '../../store/slices/offer-slice';


type OfferPagesProps = {
  title: string;
  reviewProps: Reviews;
}

function OfferPage ({title, reviewProps} : OfferPagesProps) : JSX.Element {
  const dispatch = useAppDispatch();
  const stateOffers = useAppSelector((state) => state.offers.offers);
  const stateOffer = useAppSelector((state) => state.loadOffer.offer);
  const id = useParams();

  useEffect(() => {
    store.dispatch(fetchOfferAction(id.offerId));
    return () => {
      dispatch(offerSlice.actions.addLoadOffer(null));
    };
  }, []);


  const getOfferPoints = stateOffers.filter((offer) => {
    const points = offer.city.name === stateOffer?.city.name;

    return points;
  });

  const offersPoint = getOfferPoints.map((point) => {

    const pointsToMap = {
      title: point.city.name,
      lat: point.location.latitude,
      lng: point.location.longitude,
      zoom: point.location.zoom,
      id: point.id
    };

    return pointsToMap;
  }).slice(0, 4);

  useDocumentTitle(title);

  return(
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">

            <Logotype/>
            <Profile/>

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
              ))}

            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">

              <span>{stateOffer?.isPremium ? <div className="offer__mark">Premium </div> : ''}</span>

              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {stateOffer?.description}
                </h1>
                <button className="offer__bookmark-button button" type="button" >
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
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
                  {stateOffer?.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {stateOffer?.maxAdults} adults
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
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{stateOffer?.host.name}</span>
                  <span className="offer__user-status">Pro</span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    A quiet cozy and picturesque that hides behind a a river by the
                    unique lightness of Amsterdam. The building is green and from
                    18th century.
                  </p>
                  <p className="offer__text">
                    An independent House, strategically located between Rembrand
                    Square and National Opera, but where the bustle of the city
                    comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews · <span className="reviews__amount">{reviewProps.length}</span>
                </h2>

                <ListReview reviewProps={reviewProps}/>
                <FormSendComment/>

              </section>
            </div>
          </div>
          <section className="offer__map map" >

            <MapComponent pointsToMap={offersPoint} cityName={stateOffer ?.city.name} />

          </section>
        </section>

        {stateOffer && <OffersListNear offersPoint={getOfferPoints} offerPoint={stateOffer} />}

      </main>
    </div>
  );
}

export {OfferPage};
