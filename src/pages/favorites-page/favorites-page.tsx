import {Logotype} from '../../components/logotype/logotype';
import {useDocumentTitle} from '../../hooks/use-document-title';
import {Profile} from '../../components/profile/profile';
import {FavoriteCardComponents} from '../../components/favorite-cards-component/favorite-cards-component';
import {AppRoute, AuthorizationStatus, SettingLogoFooter, SettingLogoHeader} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';
import {EmptyFavoriteCardsComponent} from '../../components/empty-favorite-cards-component/empty-favorite-cards-component';
import {useEffect} from 'react';
import {fetchOffersFavorite} from '../../services/thunk/fetch-offers-favorite';
import {LoadingComponent} from '../../components/loading-component/loading-component';
import {useNavigate} from 'react-router-dom';

type FavoritePagesProps = {
  title: string;
};

function FavoritesPage({title}: FavoritePagesProps): JSX.Element {
  const offers = useAppSelector((state) => state.offersFavorite.offers);
  const statusOffers = useAppSelector((state) => state.offersFavorite.loading);
  const authStatus = useAppSelector((state) => state.authorizationStatus.authStatus);
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.offersFavorite.error);
  const navigate = useNavigate();
  const className = offers.length ? 'page__main page__main--favorites' : ' page__main page__main--favorites page__main--favorites-empty';

  useEffect(() => {
    dispatch(fetchOffersFavorite());
  },[]);

  useEffect(() => {
    if (authStatus !== AuthorizationStatus.Auth.toString()) {
      navigate(AppRoute.Login);
    }
  }, [authStatus, navigate]);

  useDocumentTitle(title);

  if(statusOffers && !error){

    return <LoadingComponent/>;
  }

  return (
    <div className= {offers.length ? 'page' : 'page page--favorites-empty'} data-testid='favorites-page'>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logotype className={SettingLogoHeader.ClassName} width={SettingLogoHeader.Width} height={SettingLogoHeader.Height}/>
            </div>
            <Profile/>
          </div>
        </div>
      </header>
      <main className={className}>
        {offers.length ? <FavoriteCardComponents offers={offers}/> : <EmptyFavoriteCardsComponent/>}
      </main>
      <footer className="footer container">
        <Logotype className={SettingLogoFooter.ClassName} width={SettingLogoFooter.Width} height={SettingLogoFooter.Height}/>
      </footer>
    </div>
  );
}

export {FavoritesPage};
