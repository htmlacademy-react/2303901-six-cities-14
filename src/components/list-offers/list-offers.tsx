import {memo} from 'react';
import { SettingCardCities } from '../../const';
import type {OfferCard} from '../../types/type-store';
import {CardOffer} from '../card-offers/card';

type ListOffersProps = {
  offers: OfferCard[] | null;
}

function ListOffersMemo ({offers}: ListOffersProps): JSX.Element {

  return(
    <div className="cities__places-list places__list tabs__content">
      {offers?.map((offer) => <CardOffer key={offer.id} offer={offer} className={SettingCardCities.className} width={SettingCardCities.width} height={SettingCardCities.height}/>)}
    </div>
  );
}

const ListOffers = memo(ListOffersMemo);
export {ListOffers};
