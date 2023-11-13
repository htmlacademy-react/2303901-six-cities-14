import {useState} from 'react';
import Logotype from '../../components/logotype/logotype';
import useDocumentTitle from '../../hooks/document-title';
import {loginAction} from '../../services/api-actions';
import {useAppDispatch} from '../../hooks/use-store';

type LoginPagesProps = {
  title: string;
}

function LoginPage ({title: title} : LoginPagesProps) : JSX.Element {

  const [inputPassword, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const checkPassword = inputPassword.trim() === '' || /\s/.test(inputPassword);
  const dispatch = useAppDispatch();
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

    dispatch(loginAction(authData));
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

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">

            <Logotype/>

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
              </div>
              <button className="login__submit form__submit button" type="submit" onClick={onClickButton} disabled={checkPassword}>Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export {LoginPage};
