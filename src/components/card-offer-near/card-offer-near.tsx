import {Link} from 'react-router-dom';
import {OfferCard} from '../../types/type-store';
import {AppRoute} from '../../const';
//import {useEffect} from 'react';
import {FavoriteButton} from '../favorite-button/favorite-button';
import { useAppDispatch } from '../../hooks/use-store';
import { fetchOfferAction, fetchOffersNear } from '../../services/api-actions';


type CardOfferProps = {
  offer: OfferCard;
}

function CardOfferNear ({offer}: CardOfferProps): JSX.Element {

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // },);
  const dispatch = useAppDispatch();

  function onClick () {

    dispatch(fetchOfferAction(offer.id));
    dispatch(fetchOffersNear(offer.id));
  }

  return (
    <article className="near-places__card place-card" onClick={onClick} >
      <div className="near-places__image-wrapper place-card__image-wrapper">

        {(offer.isPremium) ? <div className="place-card__mark"><span>Premium</span> </div> : '' }

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

          <FavoriteButton offer={offer}/>

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width:  `${Math.round(offer.rating) * 100 / 5}%`}} />
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
