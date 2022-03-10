import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleUserName(e) {
    setName(e.target.value);
  }

  function handleUserDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen, currentUser]); 

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name={'bio'}
      title={'Редактировать профиль'}
      text={'Сохранить'}
      onSubmit={handleSubmit}
      children={(
        <>
          <label className="popup__form-field">
            <input type="text" className="popup__text name-input" id="name-input" placeholder="Имя" value={name ? name : ''} name="name" minLength="2" maxLength="40" onChange={handleUserName} required />
            <span className="popup__text-error name-input-error" ></span>
          </label>
          <label className="popup__form-field">
            <input type="text" className="popup__text about-input" id="about-input"  placeholder="Профессиональная деятельность" value={description ? description : ''} name="job" minLength="2" maxLength="200" onChange={handleUserDescription} required />
            <span className="popup__text-error about-input-error"></span>
          </label>
        </>
      )}
    />
  )
}

export default EditProfilePopup;
