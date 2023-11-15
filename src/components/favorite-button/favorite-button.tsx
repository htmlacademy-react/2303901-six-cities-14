import type {OfferCard, OfferPage} from '../../types/type-store';
import {offersSlice} from '../../store/slices/offers-slice';
import {useAppDispatch} from '../../hooks/use-store';
import { sendFavoriteOffer } from '../../services/api-actions';

type ButtonProps = {
  offer: OfferCard | OfferPage;
};

function FavoriteButton({offer}: ButtonProps): JSX.Element {
  const dispatch = useAppDispatch();

  const sdf = {
    id: offer.id,
    status: (!offer.isFavorite) ? 1 : 0,
  };

  const onFavoriteButton = (): void => {
    dispatch(offersSlice.actions.changeFavoriteStatus(offer.id));
    dispatch(sendFavoriteOffer(sdf));

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

export {FavoriteButton};
