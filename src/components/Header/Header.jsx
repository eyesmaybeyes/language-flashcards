import './Header.scss';
import { Link } from 'react-router-dom';

import cat from '../../images/cat.png';

function Header() {
    return (
        <header className="header">
            <Link to={'/language-flashcards'} className="header__logo">
                <img className="header__img" src={cat} alt="cat"></img>
                <p>Language Flashcards</p>
            </Link>
            <nav className="header__nav">
                <Link to={'/language-flashcards'} className="header__link">
                    Home
                </Link>
                <Link to={'/language-flashcards/game'} className="header__link">
                    Game
                </Link>
            </nav>
        </header>
    );
}

export { Header };
