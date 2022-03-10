import React from 'react';
import { Link } from "react-router-dom";

function Register({onRegister}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailInput(e) {
    setEmail(e.target.value);
  }

  function handlePasswordInput(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <section className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input className="login__input" type="email" placeholder="Email" value={email} onChange={handleEmailInput} required/>
        <input className="login__input" type="password" placeholder="Пароль" value={password} autoComplete="on" onChange={handlePasswordInput} required/>
        <button className="login__button" type="submit" onSubmit={handleSubmit}>Зарегистрироваться</button>
      </form>
      <p className="login__text">Уже зарегистрированы? <Link to="/sign-in" className="login__link">Войти</Link></p>
    </section>
  );
}

export default Register;
