import { Link} from 'react-router-dom';
import { Offer } from '../../mock/offers/offer-mocks';
import {AppRoute} from '../../const';
import { useEffect } from 'react';

type CardOfferProps = {
  offersPoint: Offer;
}

function CardOfferNear ({offersPoint: offer}: CardOfferProps): JSX.Element {

  useEffect(() => {
    window.scrollTo(0, 0);
  },);

  return (
    <article className="near-places__card place-card" >
      <div className="near-places__image-wrapper place-card__image-wrapper">

        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </Link>

      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: (offer.rating / 5) * 100}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default CardOfferNear;