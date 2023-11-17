import type {OfferCard, OfferPage} from '../../types/type-store';
import {offersSlice} from '../../store/slices/offers-slice';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';
import {fetchOffersFavorite, sendFavoriteOffer} from '../../services/api-actions';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Link } from 'react-router-dom';

type ButtonProps = {
  offer: OfferCard | OfferPage;
};

function FavoriteButton({offer}: ButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.authorizationStatus.authStatus);
  const data = {
    id: offer.id,
    status: (!offer.isFavorite) ? 1 : 0,
  };

  const onFavoriteButton = (): void => {
    dispatch(offersSlice.actions.changeFavoriteStatus(offer.id));
    dispatch(sendFavoriteOffer(data));

    setTimeout(() => {
      dispatch(fetchOffersFavorite());
    }, 500);

  };

  return (
    (authStatus === AuthorizationStatus.Unknown.toString() || authStatus === AuthorizationStatus.NoAuth.toString()) ? (
      <Link to={AppRoute.Login} className="link">
        <button
          className={`place-card__bookmark-button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
          type="button"
        >
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">In bookmarks</span>
        </button>
      </Link>
    ) :
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
