import type {OfferCard, OfferPage} from '../../types/type-store';
import {offersSlice} from '../../store/slices/offers-slice';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';
import {sendFavoriteOffer} from '../../services/api-actions';
import { AppRoute, AuthorizationStatus} from '../../const';
import {Link} from 'react-router-dom';
import {fetchOffersFavorite} from '../../services/thunk/fetch-offers-favorite';

type ButtonProps = {
  offer: OfferCard | OfferPage | null;
  className: string;
  width: number;
  height: number;
};

function FavoriteButton({offer, className, width, height}: ButtonProps): JSX.Element {

  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.authorizationStatus.authStatus);

  const data = {
    id:  offer?.id || '',
    status: (!offer?.isFavorite) ? 1 : 0,
  };

  const onFavoriteButton = (): void => {
    dispatch(offersSlice.actions.changeFavoriteStatus(offer?.id ? offer.id : ''));

    dispatch(sendFavoriteOffer(data)).unwrap().then(() => {

      dispatch(fetchOffersFavorite());
    });
  };

  return (
    (authStatus === AuthorizationStatus.Unknown.toString() || authStatus === AuthorizationStatus.NoAuth.toString()) ? (
      <Link to={AppRoute.Login} className="link">
        <button
          className={`${className} ${offer?.isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
          type="button"
        >
          <svg className="place-card__bookmark-icon" width={width} height={height}>
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">{offer?.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
        </button>
      </Link>
    ) :
      <button
        onClick={onFavoriteButton}
        className={`${className} ${offer?.isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
        type="button"
      >
        <svg className="place-card__bookmark-icon" width={width} height={height}>
          <use xlinkHref="#icon-bookmark"></use>
        </svg>
        <span className="visually-hidden">{offer?.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
      </button>
  );
}

export {FavoriteButton};
