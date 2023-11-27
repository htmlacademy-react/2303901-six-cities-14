import {CardOfferNear} from '../card-offer-near/card-offer-near';
import type {OfferCard} from '../../types/type-store';
import type {OfferPage} from '../../types/type-store';
import {DEFAULT_VALUE_NULL, MAX_LENGTH_OFFERS_NEAR} from '../../const';

type OfferNearProps = {
  offersPoint: OfferCard[];
  offerPoint: OfferPage;
}

function OffersListNear ({offersPoint, offerPoint}: OfferNearProps) {
  const threeOffersNear = offersPoint.slice(DEFAULT_VALUE_NULL, MAX_LENGTH_OFFERS_NEAR);
  const offers = threeOffersNear.filter((offer) => offer.id !== offerPoint.id);

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">
           Other places in the {offerPoint.city.name}
        </h2>
        <div className="near-places__list places__list">

          {offers.map((offer) => <CardOfferNear key={offer.id} offer={offer}/>)}

        </div>
      </section>
    </div>
  );
}

export {OffersListNear};
