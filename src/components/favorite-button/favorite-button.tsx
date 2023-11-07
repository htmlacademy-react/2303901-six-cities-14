import type { Offer } from '../../mock/offers/offer-mocks';
import { useDispatch, useSelector } from 'react-redux';
import {offersSlice} from '../../store/slices/offers-slice';
import type { StateOffers } from '../../types/type-store';

type ButtonProps = {
  offer: Offer;
};

function FavoriteButton({offer}: ButtonProps): JSX.Element {
  const dispatch = useDispatch();
  const stateOffers = useSelector((state: StateOffers) => state.offers.offers);
  const indexOffer = stateOffers.findIndex((stateOffer) => stateOffer.id === offer.id);


  const onFavoriteButton = (): void => {
    const updatedStateOffers = [...stateOffers];
    const updatedIsFavorite = !offer.isFavorite;
    const updatedOffer = {
      ...offer,
      isFavorite: updatedIsFavorite
    };

    updatedStateOffers[indexOffer] = updatedOffer;
    dispatch(offersSlice.actions.addOfferList(updatedStateOffers));
  };

  return (
    <button
      onClick={onFavoriteButton}
      className={`place-card__bookmark-button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
      type="button"
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">In bookmarks</span>
    </button>
  );
}

export default FavoriteButton;
