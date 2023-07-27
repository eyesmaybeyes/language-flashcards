import './Footer.scss';
import neko from '../../images/neko.png';

function Footer() {
    return (
        <footer className="footer">
            <img className="footer__logo" src={neko} alt="kitty"></img>
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
