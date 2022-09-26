import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import '../index.css';
import Card from './Card';

function Main(props) {
  const { currentUser } = React.useContext(CurrentUserContext)

  return (
    <main>
      <section className="profile">
        <div className="profile__changing-avatar">
          <button
            onClick={props.onEditAvatar}
            aria-label="Редактировать аватар"
            className="profile__avatar-button"
            type="button"
          />
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар профиля"
          />
        </div>
        <div className="profile__edit-container">
          <div className="profile__text">
            <div className="profile__name-wrapper">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                onClick={props.onEditProfile}
                aria-label="Редактировать профиль"
                className="profile__edit-button"
                type="button"
              />
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={props.onAddPlace}
          aria-label="Добавить"
          className="profile__add-button"
          type="button"
        />
      </section>
      <section className="elements">
        {props.cards.map((card) => <Card
          key={card._id}
          card={card}
          onCardClick={props.onCardClick}
          onCardLike={props.onCardLike}
          onCardDelete={props.onCardDelete}
        />)}
      </section>
    </main>
  );
}

export default Main;
