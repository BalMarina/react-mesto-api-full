import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../images/logo.svg'

function Header(props) {

  const location = useLocation()

  return (
    <header className='header'>
      <img
        className='header__logo'
        src={logo}
        alt='Логотип'
      />
      <div className='header__menu'>
        <p>{props.email}</p>
        {props.loggedIn &&
          (<button
            onClick={() => { props.onSignOut() }}
            className='header__link header__link_logined'>Выйти
          </button>)}
        {!props.loggedIn &&
          (<button className='header__link'>
            {location.pathname === '/sign-in' &&
              (<Link className='header__link' to='/sign-up'>
                Регистрация
              </Link>
              )
            }
            {location.pathname === '/sign-up' &&
              (<Link className='header__link' to='/sign-in'>
                Войти
              </Link>
              )
            }
          </button>)}
      </div>
    </header>

  );
}

export default Header;
