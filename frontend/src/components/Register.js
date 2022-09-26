import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

function Register(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    function handleEmail(e) {
        setEmail(e.target.value)
    }

    function handlePasword(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!password || !email) {
            return;
        }
        props.onRegister(password, email);
    }

    return (
        <div className='auth'>
            <p className='auth__head'>
                Регистрация
            </p>
            <form onSubmit={handleSubmit} className='auth__form'>
                <input placeholder='Логин' className='auth__input' required id='email' name='email' type='text' value={email} onChange={handleEmail} />
                <input placeholder='Пароль' className='auth__input' required id='password' name='password' type='password' value={password} onChange={handlePasword} />
                <button className='auth__submit' type='submit' onSubmit={handleSubmit}>Зарегистрироваться</button>
                <div className='auth__redirection-text'>
                    <p>Уже зарегистрированы?
                        <Link to='/sign-in' className='auth__link'> Войти</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Register;