import './Footer.scss';
import whiteCat from '../../images/white_cat.png';

function Footer() {
    return (
        <footer className="footer">
            <img className="footer__logo" src={whiteCat} alt="kitty"></img>
            <p className="footer__desc">Copyright © 2001-2023 Flashcards NYA. All rights reserved.</p>
        </footer>
    );
}

export { Footer };
