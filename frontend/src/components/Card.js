import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const card = props.card
    const { currentUser } = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__trash-button ${isOwn ? '' : 'element__trash-button_hidden'}`
    );
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like ${isLiked ? 'element__like_active' : ''}`
    );

    function handleClick() {
        props.onCardClick(card);
    }

    function handleLikeClick() {
        props.onCardLike(card);
    }

    function handleDeleteClick() {
        props.onCardDelete(card);
    }

    return (
        <div className="element">
            <img className="element__pic"
                alt={card.name}
                src={card.link}
                onClick={handleClick} />
            <button
                className={cardDeleteButtonClassName}
                onClick={handleDeleteClick}
            />
            <div className="element__container">
                <h2 className="element__name">{card.name}</h2>
                <button
                    onClick={handleLikeClick}
                    aria-label="Нравится"
                    className={cardLikeButtonClassName}
                    type="button">
                </button>
                <span className="element__likes-counter">{card.likes.length}</span>
            </div>
        </div>
    )
}
export default Card;