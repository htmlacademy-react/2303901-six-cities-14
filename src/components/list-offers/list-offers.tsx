
import type {Offers} from '../../mock/offers/offer-mocks';
import CardOffer from '../card-offers/card';


type ListOffersProps = {
  Offers: Offers;
}

function ListOffers ({Offers: offers}: ListOffersProps): JSX.Element {

  return(
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <CardOffer key = {offer.id} Offer = {offer}/>)};
    </div>
  );
}

export default ListOffers;
