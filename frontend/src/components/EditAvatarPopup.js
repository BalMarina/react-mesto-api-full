import React from 'react';
import PopupWithForm from './PopupWithForm.js';

export default function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(avatarRef.current.value);
    }

    React.useEffect(() => {
        if (props.isOpen) {
            avatarRef.current.value = ''
        }
    }, [props.isOpen]);

    return (
        <PopupWithForm
            name={'avatar'}
            title={'Обновить аватар'}
            buttonText={"Обновить"}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            children={
                <fieldset className="popup__content">
                    <input
                        ref={avatarRef}
                        required=""
                        type="url"
                        className="popup__text popup__input"
                        defaultValue=""
                        id="avatar"
                        name="avatar"
                        placeholder="Ссылка на картинку"
                    />
                    <span className="popup__error" id="avatar_type_error" />
                </fieldset>
            } />
    )
}