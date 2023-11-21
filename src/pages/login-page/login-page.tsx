import {useState} from 'react';
import {Logotype} from '../../components/logotype/logotype';
import useDocumentTitle from '../../hooks/document-title';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';
import {AppRoute, AuthorizationStatus, Cities, DEFAULT_CITY, SettingLogoHeader} from '../../const';
import {filterCitySlice} from '../../store/slices/filter-city-slice';
import {Link} from 'react-router-dom';
import {loginAction} from '../../services/thunk/login-action';
import {useEffect} from 'react';
import {fetchOffersAction} from '../../services/thunk/fetch-offers';
import '../../pages/login-page/styleLogin.css';

type LoginPagesProps = {
  title: string;
}

function LoginPage ({title: title} : LoginPagesProps) : JSX.Element | string {

  const [inputPassword, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const checkPassword = /^(?=.*[A-Za-zА-Яа-я])(?=.*\d).+$/.test(inputPassword);
  const city = useAppSelector((state) => state.filterCity.city);
  const dispatch = useAppDispatch();
  const cityArray = Object.values(Cities);
  const error = useAppSelector((state) => state.authorizationStatus.error);
  const authStatus = useAppSelector((state) => state.authorizationStatus.authStatus);

  useEffect(() => {
    const randomCity = cityArray[Math.floor(Math.random() * cityArray.length)];
    dispatch(filterCitySlice.actions.changeCity(randomCity));
  }, []);


  type AuthData = {
    password: string ;
    login: string;
  }

  const authData: AuthData = {
    password: inputPassword,
    login: email
  };

  function onClickButton (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    evt.preventDefault();

    dispatch(loginAction(authData)).unwrap().then(() => {
      dispatch(fetchOffersAction());
    });
    dispatch(filterCitySlice.actions.changeCity(DEFAULT_CITY));
  }

  function onInputPassword (evt: React.ChangeEvent<HTMLInputElement>) {
    if (evt.target instanceof HTMLInputElement) {
      const value = evt.target.value;
      setPassword(value);
    }
  }

  function onInputEmail (evt: React.ChangeEvent<HTMLInputElement>) {
    if (evt.target instanceof HTMLInputElement) {
      const value = evt.target.value;
      setEmail(value);
    }
  }

  useDocumentTitle(title);

  return authStatus === AuthorizationStatus.NoAuth.toString() ? (
    <div className= "page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">

              <Logotype className={SettingLogoHeader.className} width={SettingLogoHeader.width} height={SettingLogoHeader.height}/>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" onChange={onInputEmail} required/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" onChange={onInputPassword} required/>
                {error === null ? '' : `${error}`}
              </div>
              <button className="login__submit form__submit button" type="submit" onClick={onClickButton} disabled={!checkPassword}>Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to={AppRoute.Main} className="locations__item-link">
                <span>{city}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  ) : '';
}

export {LoginPage};
