import type {Offers} from '../../mock/offers/offer-mocks';
import CardOffer from '../card-offers/card';

type ListOffersProps = {
  offers: Offers;
  handleIdOffer: (offerId: string) => void;
}

function ListOffers ({offers: offers, handleIdOffer: handleIdOffer}: ListOffersProps): JSX.Element {


  return(
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <CardOffer key = {offer.id} offer = {offer} handleIdOffer ={handleIdOffer}/>)};
    </div>
  );
}

export default ListOffers;
