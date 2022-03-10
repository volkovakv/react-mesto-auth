import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { Switch, Route, Redirect, useHistory, withRouter } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/Api';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import Register from './Register';
import { register, login, getToken } from '../utils/Auth';
import picSuccess from '../images/success.png';
import picFail from '../images/fail.png'
import ProtectedRoute from './ProtectedRoute';

function App() {  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  
  const [isTooltipOpened, setIsTooltipOpened] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState(null);
  const [MessageImage, setMessageImage] = React.useState('');
  const [MessageText, setMessageText] = React.useState('');

  const history = useHistory();

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, cards]) => {
      setCurrentUser(user);
      setCards(cards);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      return getToken(token)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setEmail(res.data.email);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, []);

  {/* регистрация на сайте */}
  function onRegister(email, password){
    return register(email, password)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setMessageImage(picSuccess);
          setMessageText("Вы успешно зарегистрировались!");
          handleInfoTooltip();
          history.push('/sign-in');
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
        setMessageImage(picFail);
        setMessageText("Что-то пошло не так! Попробуйте ещё раз.");
        handleInfoTooltip();
        history.push('/sign-up');
      });
  };

  {/* вход на сайт */}
  function onLogin(email, password){
    return login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setIsLoggedIn(true);
          history.push('/');
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
        setMessageImage(picFail);
        setMessageText("Что-то пошло не так! Попробуйте ещё раз.");
      });
  }

  React.useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  }, [history, isLoggedIn]);

  {/* лайк карточки */}
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
      if (!isLiked) {
        api
          .addLike(card._id)
          .then((newCard) => {
            setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .deleteLike(card._id)
          .then((newCard) => {
            setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
          })
          .catch((err) => {
            console.log(err);
          });
      }
  }

  {/* удаление карточки */}
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  {/* открыть попап редактирования bio */}
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  {/* открыть попап добавления карточки */}
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  } 

  {/* открыть попап редактирования аватара */}
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  {/* открыть картинку */}
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  {/* редактирование профиля, отправка данных в API */}
  function handleUpdateUser(inputValues) {
    api
      .editProfile(inputValues)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  {/* редактирование автара */}
  function handleUpdateAvatar(inputValues) {
    api
      .updateProfileAvatar(inputValues)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  
  {/* добавление карточки */}
  function handleAddPlaceSubmit(inputValues) {
    api
      .addNewCard(inputValues)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
    })
      .catch((err) => {
      console.error(err);
    });
  }
  
  function handleInfoTooltip() {
    setIsTooltipOpened(true);
  }

  {/* закрытие всех попапов */}
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsTooltipOpened(false);
  }

  {/* выход из аккаунта */}
  function onSignOut() {
    setIsLoggedIn(false);
    setEmail(null);
    history.push('/sign-in');
    localStorage.removeItem("jwt");
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
        <Switch>
          <Route path="/sign-in">
            <>
              <Header 
                title="Регистрация" 
                route="/sign-up"
              />
              <Login 
                onLogin={onLogin} 
              />
            </>
          </Route>

          <Route path="/sign-up">
            <>
              <Header 
                title="Войти" 
                route="/sign-in"
              />
              <Register 
                onRegister={onRegister} 
              />
            </>
          </Route>

          <Route exact path="/">
            <>
              <Header 
                title="Выйти" 
                mail={email} 
                route=""
                onClick={onSignOut}
              />
              <ProtectedRoute
                component={Main}
                isLogged={isLoggedIn}
                onUpdateAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                cards={cards}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
              <Footer />
            </>
          </Route>

          <Route path="*">
            <Redirect to={isLoggedIn ? "/" : "/sign-in"}/>
          </Route>
        </Switch>
      
        {/* попапы */}
        {/* блок: форма редактирования bio */}
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* блок: форма добавления карточки */}
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit}
        />

        {/* блок: форма редактирования аватара */}
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/* блок: открытая картинка */}
        <ImagePopup 
          card={selectedCard}
          onClose={closeAllPopups}
        />

        {/* блок: сообщение */}
        <InfoTooltip 
          image={MessageImage} 
          text={MessageText} 
          isOpen={isTooltipOpened} 
          onClose={closeAllPopups} 
        />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
