import { SettingCardCities } from '../../const';
import type {OfferCard} from '../../types/type-store';
import {CardOffer} from '../card-offers/card';


type ListOffersProps = {
  offers: OfferCard[] | null;
}

function ListOffers ({offers}: ListOffersProps): JSX.Element {

  return(
    <div className="cities__places-list places__list tabs__content">
      {offers?.map((offer) => <CardOffer key={offer.id} offer={offer} className={SettingCardCities.class} width={SettingCardCities.width} height={SettingCardCities.height}/>)}
    </div>
  );
}

export {ListOffers};
