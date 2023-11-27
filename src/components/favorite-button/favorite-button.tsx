import type {OfferCard, OfferPage} from '../../types/type-store';
import {offersSlice} from '../../store/slices/offers-slice';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';
import {sendFavoriteOffer} from '../../services/api-actions';
import { AppRoute, AuthorizationStatus, SettingFavoriteButtonOfferPage, statusFavoriteToServer} from '../../const';
import {Link} from 'react-router-dom';
import {offersFavoriteSlice} from '../../store/slices/load-offers-favorite';
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
  const favoriteStatus = offer?.isFavorite;
  const checkClassName = `${className}${favoriteStatus && className === SettingFavoriteButtonOfferPage.className ?
    '--active' : ''}  ${offer?.isFavorite ?
    'place-card__bookmark-button--active' : 'place-card__bookmark-button'} button`;

  const data = {
    id:  offer?.id || '',
    status: (!offer?.isFavorite) ? statusFavoriteToServer.favorite : statusFavoriteToServer.noFavorite,
  };

  const onFavoriteButton = (): void => {
    dispatch(offersSlice.actions.changeFavoriteStatus(offer?.id ? offer.id : ''));
    dispatch(offersFavoriteSlice.actions.deleteFavoriteOffer(offer?.id ? offer.id : ''));
    dispatch(sendFavoriteOffer(data)).unwrap().then(() => {
      if(className === SettingFavoriteButtonOfferPage.className){

        dispatch(fetchOffersFavorite());
      }
    });
  };

  return (
    (authStatus === AuthorizationStatus.Unknown.toString() || authStatus === AuthorizationStatus.NoAuth.toString()) ? (
      <Link to={AppRoute.Login} className="link">
        <button
          className={checkClassName}
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
        className={checkClassName}
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
