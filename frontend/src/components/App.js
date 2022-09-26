// В работе использовалась React Router v6

import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import api from '../utils/api';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth.js';

function App() {

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const [infoTooltip, setInfoTooltip] = React.useState({ isOpen: false, successful: false });

  const navigate = useNavigate();

  React.useEffect(() => {
    tokenCheck()
  }, [])

  React.useEffect(() => {
    if (loggedIn === true) {
      navigate('/')
      api.getUser()
        .then(data => {
          setCurrentUser(data);
        })
        .catch(err => {
          console.log(err);
        })

      api.getCards()
        .then((data) => {
          setCards(data)
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [loggedIn])

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      auth.getContent(jwt).then((res) => {
        if (res) {
          setEmail(res.data.email)
          setLoggedIn(true)
        }
      })
    }
  }

  function handleLogged() {
    setLoggedIn(true)
  }

  function handleRegister(password, email) {
    auth.register(password, email)
      .then(data => {
        if (data) {
          navigate('/sign-in')
          handleInfoTooltip(true);
        } else {
          handleInfoTooltip(false);
        }
      })
      .catch(err => {
        console.log(err);
        handleInfoTooltip(false);
      })
  }

  function handleLogin(password, email) {
    auth.login(password, email)
      .then(res => {
        const { token } = res;
        localStorage.setItem('jwt', token)
        setEmail(email);
        handleLogged();
      })
      .catch(err => {
        console.log(err);
        handleInfoTooltip(false);
      })
  }

  function handleInfoTooltip(successful) {
    setInfoTooltip({ isOpen: true, successful });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((likedCard) => {
        setCards((state) =>
          state.map((c) => c._id === card._id ? likedCard : c));
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => c._id !== card._id));
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setSelectedCard(null)
    setInfoTooltip(false)
  }

  function handleUpdateUser(userData) {
    api.addUser(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(avatar) {
    api.changeAvatar({ avatar })
      .then((data) => {
        setCurrentUser({ ...currentUser, avatar: data.avatar });
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleAddNewPlace(card) {
    api.addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleSignOut() {
    localStorage.removeItem('jwt')
    setEmail('');
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className={'page'}>
        <Header
          email={email}
          loggedIn={loggedIn}
          onSignOut={handleSignOut}
        />
        <Routes>
          <Route
            path='/'
            element={<ProtectedRoute
              loggedIn={loggedIn}
              component={Main}
              onCardClick={handleCardClick}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              path='/' />
            }
          />
          <Route path='/sign-in' element={
            loggedIn
              ? <Navigate to='/' />
              : <Login onLogin={handleLogin} />
          } />
          <Route path='/sign-up' element={<Register onRegister={handleRegister} />} />
        </Routes>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={infoTooltip?.isOpen}
          successful={infoTooltip?.successful}
          onClose={closeAllPopups} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddNewPlace={handleAddNewPlace} />

        <PopupWithForm
          name={'confirm'}
          title={'Вы уверены?'}
          buttonText={'Да'}
          children={
            <fieldset className='popup__content'>
            </fieldset>
          } />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
