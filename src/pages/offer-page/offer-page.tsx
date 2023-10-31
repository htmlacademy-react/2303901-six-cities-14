import {useParams} from 'react-router-dom';
import FormSendComment from '../../components/form-send-comment/form-send-comment';
import ListReview from '../../components/list-review/list-review';
import Logotype from '../../components/logotype/logotype';
import MapComponent from '../../components/map/map';
import OffersListNear from '../../components/offers-list-near/offers-list-near';
import useDocumentTitle from '../../hooks/document-title/document-title';
import type {Offers} from '../../mock/offers/offer-mocks';
import type {Reviews} from '../../types/types';


type OfferPagesProps = {
  title: string;
  offers: Offers;
  reviewProps: Reviews;
}

function OfferPage ({title: title, offers: offers, reviewProps: reviewProps} : OfferPagesProps) : JSX.Element {

  const {offerId} = useParams();
  const offerToRender = offers.find((offer) => offer.id === offerId);

  const getOfferPoints = offers.filter((offer) => {
    const points = offer.city.name === offerToRender?.city.name;

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
  }).slice(0, 3);

  const cityToMap = {
    title: offerToRender?.city.name,
    lat: offerToRender?.city.location.latitude,
    lng: offerToRender?.city.location.longitude,
    zoom: offerToRender?.city.location.zoom,
  };

  useDocumentTitle(title);

  return(
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">

            <Logotype/>

            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">

              {offerToRender?.images.map((image) => (
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

              <span>{offerToRender?.isPremium ? <div className="offer__mark">Premium </div> : ''}</span>

              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offerToRender?.description}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">

                {offerToRender ? (
                  <>
                    <span style={{ width: (offerToRender.rating / 5) * 100 }} />
                    <span className="visually-hidden">Rating</span>
                  </>
                ) : null}

                <span className="offer__rating-value rating__value">{offerToRender?.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{offerToRender?.type}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offerToRender?.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offerToRender?.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{offerToRender?.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What &prime s inside</h2>
                <ul className="offer__inside-list">
                  {offerToRender?.goods.map((good) => (<li key={good} className="offer__inside-item">{good}</li>))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={offerToRender?.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{offerToRender?.host.name}</span>
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

            <MapComponent pointsToMap={offersPoint} cityToMap={cityToMap} />

          </section>
        </section>

        {offerToRender && <OffersListNear offersPoint={getOfferPoints} offerPoint={offerToRender} />}

      </main>
    </div>
  );
}

export default OfferPage;
