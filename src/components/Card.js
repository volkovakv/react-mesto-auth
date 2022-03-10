import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `element__trash ${isOwn ? 'element__trash_active' : ''}`
  );
  
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `element__heart ${isLiked ? 'element__heart_active' : ''}`
  );

  function handleCardClick() {
    onCardClick(card)
  }

  function handleCardLike() {
    onCardLike(card)
  }

  function handleDeleteCard() {
    onCardDelete(card)
  }
  
  return (
    <li className="element">
    <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteCard}></button>
    <img className="element__photo" src={card.link} alt={card.name} onClick={handleCardClick} />
    <div className="element__description">
        <p className="element__text">{card.name}</p>
        <div className="element__likes">
        <button type="button" className={cardLikeButtonClassName} aria-label="like" onClick={handleCardLike}></button>
        <p className="element__likes-amount">{card.likes.length}</p> 
        </div> 
    </div>
    </li>
  )
}


export default Card;