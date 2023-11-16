import type {OfferCard} from '../../types/type-store';
import {FavoriteButton} from '../favorite-button/favorite-button';

type FavoriteOfferProps = {
  offer: OfferCard;
}

function FavoriteCardOffer ({offer}: FavoriteOfferProps): JSX.Element {

  return (
    <article className="favorites__card place-card">

      {(offer.isPremium) ? <div className="place-card__mark"><span>Premium</span> </div> : '' }

      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place image"/>
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <FavoriteButton offer={offer}/>

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.round(offer.rating) * 100 / 5}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{offer.title}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default FavoriteCardOffer;
