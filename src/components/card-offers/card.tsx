import {Link} from 'react-router-dom';
import {useState} from 'react';
import type {Offer} from '../../mock/offers/offer-mocks';
import {AppRoute} from '../../const';


type CardPagesProps = {
  offer: Offer;
  handleIdOffer: (offerId: number) => void;
  onLeaveMouseOffer: () => void;
}


function CardOffer ({offer, handleIdOffer, onLeaveMouseOffer}: CardPagesProps) : JSX.Element{

  const [isFavoriteCard, setIsFavoriteCard] = useState(offer.isFavorite);
  const [cardState, setCardState] = useState({
    offerId: offer.id
  });

  const onFavoriteButton = (): void => {
    const updatedIsFavorite = !isFavoriteCard;
    setIsFavoriteCard(updatedIsFavorite);
    offer.isFavorite = updatedIsFavorite;
  };

  function onGetIdCard () {
    setCardState({
      ...cardState,
      offerId: offer.id,
    });
  }

  function onGetPointOffer () {

    handleIdOffer(offer?.id);
  }

  function onLeavePointOffer () {
    onLeaveMouseOffer();
  }

  return(
    <article className="cities__card place-card"
      onMouseOver = {onGetIdCard}
      onMouseEnter={onGetPointOffer}
      onMouseLeave={onLeavePointOffer}
    >
      <div className="cities__image-wrapper place-card__image-wrapper">

        {(offer.isPremium) ? <div className="place-card__mark"><span>Premium</span> </div> : '' }

        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img className="place-card__image" src= {offer.previewImage} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button onClick={onFavoriteButton} className={`place-card__bookmark-button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width:  `${Math.round(offer.rating) * 100 / 5}%`}}></span>
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

export default CardOffer;
