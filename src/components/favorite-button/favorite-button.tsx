import type { Offer } from '../../mock/offers/offer-mocks';
import { useDispatch} from 'react-redux';
import {offersSlice} from '../../store/slices/offers-slice';

type ButtonProps = {
  offer: Offer;
};

function FavoriteButton({offer}: ButtonProps): JSX.Element {
  const dispatch = useDispatch();

  const onFavoriteButton = (): void => {
    dispatch(offersSlice.actions.changeFavoriteStatus(offer.id));
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
