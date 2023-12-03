import {Link} from 'react-router-dom';
import {useState} from 'react';
import type {OfferCard} from '../../types/type-store';
import {AppRoute, SettingFavoriteButtonCard} from '../../const';
import {FavoriteButton} from '../favorite-button/favorite-button';
import {useAppDispatch} from '../../hooks/use-store';
import {fetchOfferAction} from '../../services/thunk/fetch-offer';
import {getRating} from '../../utils';
import {memo} from 'react';
import {offerSlice} from '../../store/slices/offer-slice';

type CardPagesProps = {
  offer: OfferCard;
  className: string;
  width: number;
  height: number;
}

function CardOfferMemo ({offer, className, width, height}: CardPagesProps) : JSX.Element{
  const dispatch = useAppDispatch();

  const [cardState, setCardState] = useState({
    offerId: offer.id
  });

  function handelPointOffer () {
    dispatch(offerSlice.actions.addLoadOfferCard(offer));
  }

  function handelLeavePointOffer () {
    dispatch(offerSlice.actions.addLoadOfferCard(null));
  }

  function handelClickCard () {
    setCardState({
      ...cardState,
      offerId: offer.id,
    });
    dispatch(fetchOfferAction(offer.id));
  }

  return(
    <article className={`${className}__card place-card`}
      onClick = {handelClickCard}
      onMouseEnter={handelPointOffer}
      onMouseLeave={handelLeavePointOffer}
    >
      {(offer.isPremium) ? <div className="place-card__mark"><span>Premium</span> </div> : '' }
      <div className={`${className}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img className="place-card__image" src= {offer.previewImage} width={width} height={height} alt="Place image"/>
        </Link>
      </div>
      <div className= {`${className === 'cities' ? 'place-card__info' : 'favorites__card-info place-card__info'}`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton offer={offer}
            className={SettingFavoriteButtonCard.className}
            width={SettingFavoriteButtonCard.width}
            height={SettingFavoriteButtonCard.height}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width:  `${getRating(offer.rating)}%`}}></span>
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

const CardOffer = memo(CardOfferMemo);

export {CardOffer};
