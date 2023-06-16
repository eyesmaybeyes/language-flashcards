import './Header.scss';
import whiteCat from '../../images/white_cat.png';

function Header() {
    return (
        <header className="header">
            <a href="#"><img className="header__logo" src={whiteCat} alt="kitty"></img></a>
            <nav className="header__nav">
                <a className="header__link" href="#">
                    Log In
                </a>
                <a className="header__link" href="#">
                    Sign Up
                </a>
            </nav>
        </header>
    );
}

export { Header };
