import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory, withRouter } from 'react-router-dom';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import EditProfilePopup from '../components/EditProfilePopup';
import EditAvatarPopup from '../components/EditAvatarPopup';
import AddPlacePopup from '../components/AddPlacePopup';
import ImagePopup from '../components/ImagePopup';
import Register from '../components/Register';
import Login from '../components/Login';
import ProtectedRoute from '../components/ProtectedRoute';
import InfoTooltip from '../components/InfoTooltip'
import api from '../utils/Api'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as auth from '../utils/auth.js';
import Error from '../images/error.png';
import Ok from '../images/ok.png';


function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);        // содержит статус пользователя — вошёл он в систему или нет
  const [img, setImg] = useState('');     // содержит расположение картинки
  const [message, setMessage] = useState('');  // содержит текст сообщения о регистрации 
  const [userEmail, setUserEmail] = useState('');   // содержит текст почты
  const [infoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);    // содержит состояние попапа регистрации

  const history = useHistory();

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {                                           // Если loggedIn, то выполняется загрузка с сервера
      Promise.all([api.getUserInfo(), api.getInitialCard()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => console.log(`${err}`));
    }
  }, [loggedIn]);


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  };

  function handleInfoTooltip() {
    setInfoTooltipPopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setInfoTooltipPopupOpen(false)
    setSelectedCard({})
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }


  function handleUpdateUser(currentUser) {
    api.editProfile(currentUser)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(`${err}`));
  }

  function handleUpdateAvatar(avatar) {
    api.editAvatar(avatar)
      .then((avatarData) => {
        setCurrentUser(avatarData);
        closeAllPopups();
      })
      .catch((err) => console.log(`${err}`));
  }

  function handleAddPlaceSubmit(name, link) {
    api.addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`${err}`));
  }

  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const request = isLiked ?
      api.deleteLike(card._id, !isLiked) :
      api.addLike(card._id, !isLiked)
    request.then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => {
        console.log(`${err}`);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((res) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }
  function handleRegister(email, password) {
    auth
      .register(email, password)

      .then((data) => {
        localStorage.setItem('token', data._id);
        history.push('/sign-in');
        setImg(Ok);
        setMessage('Вы успешно зарегистрировались!');
      })

      .catch(() => {
        setImg(Error);
        setMessage('Что-то пошло не так! Попробуйте ещё раз');
      })

      .finally(() => {
        handleInfoTooltip(true);
      })
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setUserEmail(email);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch(err => console.log(err));
  }

  function hendleOnSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/sign-in')
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            history.push("/");
          }
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header loggedIn={loggedIn} userEmail={userEmail} onSignOut={hendleOnSignOut} />
          <Switch>

            <ProtectedRoute
              exact path="/"
              loggedIn={loggedIn}
            >
              <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                setCards={setCards}
              />
            </ProtectedRoute>
            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>

            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>

            <Route >
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}          {/* проверяем если пользователь авторизован то он переходит на главную страницу /, а неавторизованные пользователи будут перенаправлены на /sign-in */}
            </Route>

          </Switch>

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit} />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups} />

          <InfoTooltip
            isOpen={infoTooltipPopupOpen}
            onClose={closeAllPopups}
            img={img}
            message={message}
          />

          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider >
  );
}

export default withRouter(App);
