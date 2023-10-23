import {Link} from 'react-router-dom';
import {useState} from 'react';
import type { Offer } from '../../mock/offers/offer-mocks';
import { AppRoute } from '../../const';

type CardPagesProps = {
  offer: Offer;
}


function CardOffer ({offer: offer}: CardPagesProps) : JSX.Element{

  const [cardState, setCardState] = useState({
    offerId: ''
  });

  function onGetIdCard () {
    setCardState({
      ...cardState,
      offerId: offer.id,
    });
  }

  function onChangePage () {
  }

  return(
    <article className="cities__card place-card" onMouseOver = {onGetIdCard} onClick = {onChangePage}>

      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}/${offer.id}`} >
          <img className="place-card__image" src= {offer.previewImage} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: (offer.rating / 5) * 100}}></span>
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

export default CardOffer;
