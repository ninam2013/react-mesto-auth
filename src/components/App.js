import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import PopupWithForm from '../components/PopupWithForm';
import EditProfilePopup from '../components/EditProfilePopup';
import EditAvatarPopup from '../components/EditAvatarPopup';
import AddPlacePopup from '../components/AddPlacePopup';
import ImagePopup from '../components/ImagePopup';
import api from '../utils/Api'
import { CurrentUserContext } from '../contexts/CurrentUserContext';



function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCard()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => console.log(`${err}`));
  }, []);


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
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


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header />
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
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

          <PopupWithForm name="delete-confirm" title="Вы уверены?" buttonText="Да">
          </PopupWithForm>


          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
