import React from 'react';
import success from '../images/login.png';
import fail from '../images/error.png';


function InfoTooltip(props) {

    return (
        <section className={`popup ${props.isOpen ? 'popup_opened' : false}`}>
            <div className='popup__container'>
                <img className='popup__result-icon' src={props.successful ? success : fail} alt='Иконка результата' />
                <h2 className='popup__head popup__head_infotooltip'>{props.successful ? 'Вы успешно зарегестрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
                <button onClick={props.onClose} className='popup__close-icon' type='button' aria-label='Закрыть окно' />
            </div>
        </section>
    )
}

export default InfoTooltip;