import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function EditProfilePopup(props) {
    const { currentUser } = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name || '');
        setDescription(currentUser.about || '');
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({ name, about: description });
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    return (
        <PopupWithForm
            name={'profile'}
            title={'Редактировать профиль'}
            buttonText={"Сохранить"}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            children={
                <fieldset className="popup__content">
                    <input
                        required=""
                        type="text"
                        className="popup__text popup__input"
                        id="popup-name"
                        name="popup-name"
                        placeholder="Имя"
                        minLength={2}
                        maxLength={30}
                        autoComplete="off"
                        value={name}
                        onChange={handleChangeName}
                    />
                    <span className="popup__error" id="popup-name_type_error" />
                    <input
                        required=""
                        type="text"
                        className="popup__text popup__input"
                        id="popup-job"
                        name="popup-job"
                        placeholder="О себе"
                        minLength={2}
                        maxLength={200}
                        autoComplete="off"
                        value={description}
                        onChange={handleChangeDescription}
                    />
                    <span className="popup__error" id="popup-job_type_error" />
                </fieldset>
            } />
    );
}