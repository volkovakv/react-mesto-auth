import React from 'react';

function Login({onLogin}) {
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
    onLogin(email, password);
  }

  return (
    <section className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input className="login__input" id="login-email" name="email" placeholder="E-mail" value={email} onChange={handleEmailInput} required/>
        <input className="login__input" id="login-password" name="password" placeholder="Пароль" value={password} onChange={handlePasswordInput} required/>
        <button className="login__button" type="submit">Войти</button>
      </form>
    </section>
  );
}

export default Login;
