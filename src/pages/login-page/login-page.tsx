import {useState} from 'react';
import {Logotype} from '../../components/logotype/logotype';
import {useDocumentTitle} from '../../hooks/use-document-title';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';
import {AppRoute, AuthorizationStatus, City, DEFAULT_CITY, SettingLogoHeader} from '../../const';
import {filterCitySlice} from '../../store/slices/filter-city-slice';
import {Link} from 'react-router-dom';
import {loginAction} from '../../services/thunk/login-action';
import {useEffect} from 'react';
import {fetchOffersAction} from '../../services/thunk/fetch-offers';
import '../../pages/login-page/styleLogin.css';
import type {AuthData} from '../../types/types';
import {authStatusSlice} from '../../store/slices/auth-status-slice';
import {checkAuthAction} from '../../services/thunk/check-auth-action';


type LoginPagesProps = {
  title: string;
}

function LoginPage ({title: title} : LoginPagesProps) : JSX.Element | string {
  const [inputPassword, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const checkPassword = /^(?=.*[A-Za-zА-Яа-я])(?=.*\d).+$/.test(inputPassword);
  const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const city = useAppSelector((state) => state.filterCity.city);
  const dispatch = useAppDispatch();
  const cityArray = Object.values(City);
  const error = useAppSelector((state) => state.authorizationStatus.error);
  const authStatus = useAppSelector((state) => state.authorizationStatus.authStatus);

  useEffect(() => {
    const randomCity = cityArray[Math.floor(Math.random() * cityArray.length)];
    dispatch(filterCitySlice.actions.changeCity(randomCity));
    dispatch(authStatusSlice.actions.addErrorStatus(null));
    dispatch(checkAuthAction());
  }, []);

  const authData: AuthData = {
    password: inputPassword,
    login: email
  };

  function handleClickButton (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    evt.preventDefault();

    dispatch(loginAction(authData)).unwrap().then(() => {
      dispatch(filterCitySlice.actions.changeCity(DEFAULT_CITY));
      dispatch(checkAuthAction());
      dispatch(fetchOffersAction());
    });

  }

  function handleInputPassword (evt: React.ChangeEvent<HTMLInputElement>) {
    if (evt.target instanceof HTMLInputElement) {
      const value = evt.target.value;
      setPassword(value);
    }
  }

  function handleInputEmail (evt: React.ChangeEvent<HTMLInputElement>) {
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
              <Logotype className={SettingLogoHeader.ClassName} width={SettingLogoHeader.Width} height={SettingLogoHeader.Height}/>
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
                <input className="login__input form__input" type="email" name="email" placeholder="Email" onChange={handleInputEmail} required/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" onChange={handleInputPassword} required/>
                {error === null ? '' : `${error}`}
              </div>
              <button className="login__submit form__submit button" type="submit" onClick={handleClickButton} disabled={!checkPassword || !checkEmail}>Sign in</button>
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
