import React from 'react';
import PopupWithForm from './PopupWithForm.js';

export default function AddPlacePopup(props) {
    const [place, setPlace] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        if (props.isOpen) {
            setPlace('');
            setLink('');
        }
    }, [props.isOpen]);

    function handleAddPlace(e) {
        setPlace(e.target.value);
    }

    function handleAddLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddNewPlace({ name: place, link });
    }

    return (
        <PopupWithForm
            name={'card'}
            title={'Новое место'}
            isOpen={props.isOpen}
            onClose={props.onClose}
            buttonText={"Создать"}
            onSubmit={handleSubmit}
            children={
                <fieldset className="popup__content">
                    <input
                        required=""
                        type="text"
                        className="popup__text popup__input"
                        id="card-name"
                        name="name"
                        placeholder="Название"
                        minLength={2}
                        maxLength={30}
                        autoComplete="off"
                        value={place}
                        onChange={handleAddPlace}
                    />
                    <span className="popup__error" id="card-name_type_error" />
                    <input
                        required=""
                        type="url"
                        className="popup__text popup__input"
                        id="card-pic"
                        name="pic"
                        placeholder="Ссылка на картинку"
                        value={link}
                        onChange={handleAddLink}
                    />
                    <span className="popup__error" id="card-pic_type_error" />
                </fieldset>
            } />
    )
}