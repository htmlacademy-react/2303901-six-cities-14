import CardOfferNear from '../card-offer-near/card-offer-near';
import type { Offers, Offer } from '../../mock/offers/offer-mocks';

type OfferNearProps = {
  offersPoint: Offers;
  offerPoint: Offer;
}

function OffersListNear ({offersPoint: offersPoint, offerPoint: offerPoint }: OfferNearProps) {


  const threeOffersNear = offersPoint.slice(0, 3);

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">
           Other places in the {offerPoint.city.name}
        </h2>
        <div className="near-places__list places__list">

          {threeOffersNear.map((offer) => <CardOfferNear key={offer.id} offersPoint={offer}/>)}

        </div>
      </section>
    </div>
  );
}

export default OffersListNear;
