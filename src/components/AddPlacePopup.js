import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup( {isOpen, onClose, onAddPlace} ) {
  const [name, setCardName] = React.useState('');
  const [link, setCardLink] = React.useState('');

  function handleNameChange(e) {
    setCardName(e.target.value);
  }

  function handleLinkChange(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link
    });
  }

  React.useEffect(() => {
      setCardName('');
      setCardLink('');
  }, [isOpen]);

  return(
    <PopupWithForm 
      isOpen={isOpen}
      onClose={onClose}
      name={'photo'}
      title={'Новое место'}
      text={'Создать'}
      onSubmit={handleSubmit}
      children={(
        <>
          <label className="popup__form-field">
            <input type="text" className="popup__text" id="place-input" placeholder="Название" name="place" minLength="2" maxLength="30" value={name ? name : ''} onChange={handleNameChange} required />
            <span className="popup__text-error place-input-error" ></span>
          </label>
          <label className="popup__form-field">
            <input type="url" className="popup__text" id="link-input" placeholder="Ссылка на картинку" name="photo" value={link ? link : ''} onChange={handleLinkChange} required />
            <span className="popup__text-error link-input-error"></span>
          </label>
        </>
      )}
    />          
  )
}

export default AddPlacePopup;