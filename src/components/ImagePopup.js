import React from 'react';


function ImagePopup({ card, onClose }) {

  return (
    <section className={`popup popup_type_increase-card ${Object.keys(card).length > 0 ? "popup_open" : ""
      }`}>
      <div className="popup__container-card">
        <button className="popup__close" type="button" onClick={onClose}></button>
        <img className="popup__img" src={card.link} alt={card.name} />
        <h2 className="popup__title-card">{card.name}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;