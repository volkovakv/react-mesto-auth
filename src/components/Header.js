import { Link } from 'react-router-dom';
import logo from '../images/header-logo.svg'

function Header({title, route, mail, onClick}) {
  return (
        <header className="header">
          <img src={logo} className="header__logo" alt="К сожалению, изображение не доступно" />
          <nav className="header__data">
            <p className="header__text">{mail}</p>
            <Link to={route} className="header__link" type="button" onClick={onClick}>{title}</Link>
          </nav>
        </header>
  );
}

export default Header;