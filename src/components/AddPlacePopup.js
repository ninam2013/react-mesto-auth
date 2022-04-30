import React, { useState, useEffect } from 'react';
import PopupWithForm from '../components/PopupWithForm';


function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {             
        setName('');
        setLink('');
      }, [isOpen])

    function handleChangeName(evt) {
        setName(evt.target.value)
    }

    function handleChangeLink(evt) {
        setLink(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace(name, link);
    }


    return (
        <>
            <PopupWithForm name="add-card" title="Новое место" buttonText="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
                <input id="title-input" className="popup__input popup__input_js_card-name" value={name} onChange={handleChangeName} type="text" name="name"
                    placeholder="Название" minLength="2" maxLength="30" required />
                <span className="title-input-error popup__error"></span>
                <input id="link-input" className="popup__input popup__input_js_card-link" value={link} onChange={handleChangeLink} type="url" name="link"
                    placeholder="Ссылка на картинку" required />
                <span className="link-input-error popup__error"></span>
            </PopupWithForm>
        </>

    )
}

export default AddPlacePopup;