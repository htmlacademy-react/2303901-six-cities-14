import {Logotype} from '../../components/logotype/logotype';
import useDocumentTitle from '../../hooks/document-title';
import {Profile} from '../../components/profile/profile';
import {FavoriteCardComponents} from '../../components/favorite-cards-component/favorite-cards-component';
import {SettingLogoFooter, SettingLogoHeader} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';
import {EmptyFavoriteCardsComponent} from '../../components/empty-favorite-cards-component/empty-favorite-cards-component';
import {useEffect} from 'react';
import {fetchOffersFavorite} from '../../services/thunk/fetch-offers-favorite';
import { LoadingComponent } from '../../components/loading-component/loading-component';

type FavoritePagesProps = {
  title: string;
};

function FavoritesPage({title}: FavoritePagesProps): JSX.Element {

  const offers = useAppSelector((state) => state.offersFavorite.offers);
  const statusOffers = useAppSelector((state) => state.offersFavorite.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersFavorite());
  },[]);

  const className = offers.length ? 'page__main page__main--favorites' : ' page__main page__main--favorites page__main--favorites-empty';

  useDocumentTitle(title);

  if(statusOffers){
    return <LoadingComponent/>;
  }

  return (
    <div className= {offers.length ? 'page' : 'page page--favorites-empty'}>

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logotype className={SettingLogoHeader.className} width={SettingLogoHeader.width} height={SettingLogoHeader.height}/>
            </div>
            <Profile/>

          </div>
        </div>
      </header>

      <main className={className}>
        {offers.length ? <FavoriteCardComponents offers={offers}/> : <EmptyFavoriteCardsComponent/>}
      </main>

      <footer className="footer container">

        <Logotype className={SettingLogoFooter.className} width={SettingLogoFooter.width} height={SettingLogoFooter.height}/>

      </footer>
    </div>
  );
}

export {FavoritesPage};
