import './Footer.scss';
import whiteCat from '../../images/white_cat.png';

function Footer() {
    return (
        <footer className="footer">
            <img className="footer__logo" src={whiteCat} alt="kitty"></img>
            <p className="footer__desc">
                Designed &amp; Developed by{' '}
                <a
                    className="footer__link"
                    href="https://github.com/eyesmaybeyes"
                >
                    eyesmaybeyes
                </a>
            </p>
        </footer>
    );
}

export { Footer };
