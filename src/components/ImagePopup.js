function ImagePopup({card, onClose}) {
    return (
    <div className={`popup popup_zoom ${card && 'popup_opened'}`}>
        <div className="popup__container-zoom">
          <img className="popup__pic" src={card && card.link} alt={card && card.name} />
          <h2 className="popup__description">{card && card.name}</h2>
          <button className="popup__close-button" type="button" title="Закрыть" aria-label="close" onClick={onClose}></button>
        </div>
    </div>
    )
  }
  
  export default ImagePopup;