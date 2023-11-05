import type { Offer } from '../../mock/offers/offer-mocks';
import { useDispatch, useSelector } from 'react-redux';
import { addOfferList } from '../../store/actions/action';
import type { Offers } from '../../mock/offers/offer-mocks';

type StateOffers = {
  offers: Offers;
}

type ButtonProps = {
  offer: Offer;
};

function FavoriteButton({ offer }: ButtonProps): JSX.Element {

  const dispatch = useDispatch();
  const stateOffers = useSelector((state: StateOffers) => state.offers);
  const indexOffer = stateOffers.findIndex((stateOffer) => stateOffer.id === offer.id);
  const updatedStateOffers = [...stateOffers];

  const onFavoriteButton = (): void => {

    const updatedIsFavorite = !offer.isFavorite;

    const updatedOffer = {
      ...offer,
      isFavorite: updatedIsFavorite
    };

    updatedStateOffers[indexOffer] = updatedOffer;
    dispatch(addOfferList(updatedStateOffers));
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
