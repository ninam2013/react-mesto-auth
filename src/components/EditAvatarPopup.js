import React, { useRef, useEffect } from 'react';
import PopupWithForm from '../components/PopupWithForm';


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.value = '';
  }, [isOpen])

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }

  return (
    <>
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit} >
        <input id="link-input-image" className="popup__input popup__input_js_card-link" ref={inputRef} type="url" name="link"
          placeholder="Ссылка на картинку" required />
        <span className="link-input-image-error popup__error"></span>
      </PopupWithForm>
    </>
  )
}

export default EditAvatarPopup;