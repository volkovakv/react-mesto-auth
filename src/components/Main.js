import React from 'react';
import Card from './Card';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function Main({onUpdateAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  
  return (
    <main className="content">
      <section className="profile">
        <button type="button" className="profile__avatar-edit" aria-label="avatar-edit" onClick={onUpdateAvatar}>
          <img src={`${currentUser.avatar}`} className="profile__avatar" alt="К сожалению, изображение не доступно" onClick={onUpdateAvatar} />
        </button>  
        <div className="profile__bio">             
          <h1 className="profile__info-name"> {currentUser.name}</h1>
          <button type="button" className="profile__info-edit-button" onClick={onEditProfile}></button>
          <h2 className="profile__info-job">{currentUser.about}</h2>
        </div>
        <button type="button" className="profile__add-button" aria-label="add-photo" onClick={onAddPlace}></button>
      </section> 
        
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))}          
        </ul>
    </section> 
    </main>
  );
}

export default Main;




