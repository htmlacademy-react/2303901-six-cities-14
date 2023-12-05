import {CardOfferNear} from '../card-offer-near/card-offer-near';
import type {OfferCard} from '../../types/type-store';
import type {OfferPage} from '../../types/type-store';
import {DEFAULT_VALUE_NULL, MAX_LENGTH_OFFERS_NEAR} from '../../const';
import {memo} from 'react';

type OfferNearProps = {
  points: OfferCard[];
  point: OfferPage;
}

function OffersListNearMemo ({points, point}: OfferNearProps) {
  const threeOffersNear = points.slice(DEFAULT_VALUE_NULL, MAX_LENGTH_OFFERS_NEAR);
  const offers = threeOffersNear.filter((offer) => offer.id !== point.id);

  return (
    <div className="container" data-testid='Other places in the'>
      <section className="near-places places">
        <h2 className="near-places__title">
           Other places in the {point.city.name}
        </h2>
        <div className="near-places__list places__list">
          {offers.map((offer) => <CardOfferNear key={offer.id} offer={offer}/>)}
        </div>
      </section>
    </div>
  );
}

const OffersListNear = memo(OffersListNearMemo);

export {OffersListNear};
