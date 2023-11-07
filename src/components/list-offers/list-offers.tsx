import type {Offers} from '../../mock/offers/offer-mocks';
import CardOffer from '../card-offers/card';

type ListOffersProps = {
  offers: Offers;
  handleIdOffer: (offerId: number) => void;
  onLeaveMouseOffer: () => void;
}

function ListOffers ({offers, handleIdOffer, onLeaveMouseOffer}: ListOffersProps): JSX.Element {

  return(
    <div className="cities__places-list places__list tabs__content">
      {offers?.map((offer) => <CardOffer key = {offer.id} offer = {offer} handleIdOffer ={handleIdOffer} onLeaveMouseOffer={onLeaveMouseOffer}/>)}
    </div>
  );
}

export default ListOffers;
