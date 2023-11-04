import {useState} from 'react';
import type {Offer} from '../../mock/offers/offer-mocks';

type ButtonProps = {
  offer: Offer;
}

function FavoriteButton ({offer}: ButtonProps): JSX.Element {

  const [isFavoriteCard, setIsFavoriteCard] = useState(offer.isFavorite);

  const onFavoriteButton = (): void => {
    const updatedIsFavorite = !isFavoriteCard;

    const updatedOffer = {
      ...offer,
      isFavorite: updatedIsFavorite
    };

    setIsFavoriteCard(updatedOffer.isFavorite);
  };

  return (

    <button onClick={onFavoriteButton} className={`place-card__bookmark-button ${isFavoriteCard ? 'place-card__bookmark-button--active' : ''} button`} type="button">
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">In bookmarks</span>
    </button>
  );
}

export default FavoriteButton;
