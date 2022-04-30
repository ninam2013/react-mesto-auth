import React, { useContext } from  'react';
import Card from '../components/Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">

      <section className="profile">
        <div className="profile__info">
          <button className="profile__button-avatar" onClick={onEditAvatar}></button>
          {currentUser.avatar && (<img className="profile__image" src={currentUser.avatar} alt="аватар" />)}
          <div className="profile__desc">
            <div className="profile__name">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button className="profile__button" type="button" onClick={onEditProfile}></button>
            </div>
            <p className="profile__text">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>

      <section className="places">
        <ul className="places__container">

          {
            cards.map(item => (
              <Card key={item._id}
                name={item.name}
                link={item.link}
                likes={item.likes}
                card={item}
                onCardClick={onCardClick}
                currentUser={currentUser}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))
          }

        </ul>
      </section>
    </main>
  );
}

export default Main;