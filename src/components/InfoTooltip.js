import React from 'react';

function InfoTooltip({ image, text, isOpen, onClose }) {
  return(
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__status">
        <button type="button" className="popup__close-button" onClick={onClose}/>
        <img className="popup__status-image" src={image} alt="К сожалению, изображение не доступно"/>
        <p className="popup__status-text">{text}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;