import React from 'react';



function InfoTooltip({ isOpen, onClose, img, message }) {
    return (
        <>
            <section className={`popup popup_type-tooltip ${isOpen ? "popup_open" : ""}`}>
                <div className="popup__container popup__container_infoTooltip">
                    <button className="popup__close" type="button" onClick={onClose}></button>
                    <img alt='картинка' src={img} />
                    <h2 className="popup__title popup__title_infoTooltip">{message}</h2>
                </div>
            </section>
        </>
    )
}

export default InfoTooltip;