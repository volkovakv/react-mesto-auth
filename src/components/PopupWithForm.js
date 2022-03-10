function PopupWithForm({name, title, children, text, isOpen, onClose, onSubmit}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened': " "}`}>
      <div className="popup__container">
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__save-button" type="submit" title="Сохранить">{text}</button>
        </form>
        <button className="popup__close-button" type="button" title="Закрыть" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default PopupWithForm;