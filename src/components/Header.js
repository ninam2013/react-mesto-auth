import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom'

function Header({ loggedIn, userEmail, onSignOut }) {
  const [active, setActive] = useState('');
  const [boxActive, setBoxActive] = useState('');
  const [spanActiv, setSpanActiv] = useState('');


  function toggleMobileMenu() {
    setActive(active === "" ? "header__btn-menu_active" : "");
    setBoxActive(active === "" ? "header__box_active" : "");
    setSpanActiv(active === "" ? "header__band_active" : "");
  }



  return (
    <>
      <div className={"header__box " + boxActive} >   {/* мобильное меню */}
        {loggedIn && <p className="text text_email_change-header">{userEmail}</p>}
        <button className="text text_button_change-header" onClick={onSignOut} type="button">Выйти</button>
      </div>

      <header className="header">
        <div className="header__logo"></div>

        <Route path="/sign-up">     {/* Если мы находимся на регистрации при клике на ссылку переходим на войти */}
          <Link to="/sign-in" className="link"><p className="text text_font_change-header">Войти</p></Link>
        </Route>

        <Route path="/sign-in">     {/* Если мы находимся на войти при клике на ссылку переходим на регистрацию */}
          <Link to="/sign-up" className="link"><p className="text text_font_change-header">Регистрация</p></Link>
        </Route>

        <Route exact path="/">
          <div className={"header__btn-menu " + active} onClick={toggleMobileMenu}>        {/* кнопка мобильного меню */}
            <span className={"header__band " + spanActiv}></span>
          </div>
          <div className={"header__container"} >          {/* десктопное меню */}
            {loggedIn && <p className="text text_email_change-header">{userEmail}</p>}    {/* Если loggedIn, то показываем почту */}
            <button className="text text_button_change-header" onClick={onSignOut} type="button">Выйти</button>
          </div>

        </Route>

      </header>
    </>
  );
}

export default Header;