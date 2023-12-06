import type {OfferCard, OfferPage} from '../../types/type-store';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';
import {sendFavoriteOffer} from '../../services/api-actions';
import {AppRoute, AuthorizationStatus, StatusFavoriteToServer} from '../../const';
import {Link} from 'react-router-dom';
import {fetchOffersFavorite} from '../../services/thunk/fetch-offers-favorite';
import {memo, useState} from 'react';

type ButtonProps = {
  offer: OfferCard | OfferPage | null;
  className: string;
  width: number;
  height: number;
};

function FavoriteButtonMemo({offer, className, width, height}: ButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.authorizationStatus.authStatus);
  const [isFavorite, setIsFavorite] = useState(offer?.isFavorite);
  const checkClassName = `${className}  ${isFavorite ? 'place-card__bookmark-button--active' : 'place-card__bookmark-button'} button`;

  const data = {
    id:  offer?.id || '',
    status: (!isFavorite) ? StatusFavoriteToServer.Favorite : StatusFavoriteToServer.NoFavorite,
  };

  const handleFavoriteButton = (): void => {

    if(isFavorite){
      setIsFavorite(false);
    }else{
      setIsFavorite(true);
    }

    dispatch(sendFavoriteOffer(data)).unwrap().then(() => {
      dispatch(fetchOffersFavorite());
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
          <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
        </button>
      </Link>
    ) :
      <button
        onClick={handleFavoriteButton}
        className={checkClassName}
        type="button"
      >
        <svg className="place-card__bookmark-icon" width={width} height={height}>
          <use xlinkHref="#icon-bookmark"></use>
        </svg>
        <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
      </button>
  );
}

const FavoriteButton = memo(FavoriteButtonMemo);

export {FavoriteButton};
