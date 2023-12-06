import {memo} from 'react';
import {SettingCardCities } from '../../const';
import {CardOffer } from '../card-offers/card';
import {useAppSelector } from '../../hooks/use-store';

function ListOffersMemo(): JSX.Element {
  const offers = useAppSelector((state) => state.offers.changeOffers);

  return (
    <div
      className="cities__places-list places__list tabs__content"
      data-testid="list offers"
    >
      {offers?.map((offer) => (
        <CardOffer
          key={offer.id}
          offer={offer}
          className={SettingCardCities.ClassName}
          width={SettingCardCities.Width}
          height={SettingCardCities.Height}
        />
      ))}
    </div>
  );
}

const ListOffers = memo(ListOffersMemo);
export { ListOffers };
