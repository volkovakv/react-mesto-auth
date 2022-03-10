import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const ref = React.useRef('');
  React.useEffect(() => {
    ref.current.value = '';
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: ref.current.value
    });
  }

  return(
    <PopupWithForm 
      isOpen={isOpen}
      onClose={onClose}
      name={'update-avatar'}
      title={'Обновить аватар'}
      text={'Сохранить'}
      onSubmit={handleSubmit}
      children={(
        <>
          <label className="popup__form-field">
            <input ref={ref} type="url" className="popup__text" id="link-input" placeholder="Ссылка на картинку" name="photo" required />
            <span className="popup__text-error link-input-error"></span>
          </label>
        </>
      )}
    />
  )
}

export default EditAvatarPopup;
