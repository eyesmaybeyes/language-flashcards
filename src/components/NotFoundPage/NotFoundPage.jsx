import './NotFoundPage.scss';
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div className="container-404">
            <div className="noise"></div>
            <div className="overlay"></div>
            <div className="terminal">
                <h1>
                    Error <span className="errorcode">404</span>
                </h1>
                <p className="output">
                    The page you are looking for might have been removed, had
                    its name changed or is temporarily unavailable.
                </p>
                <p className="output">
                    Please{' '}
                    <Link
                        to={'/language-flashcards'}
                        className="link-404"
                        href="#2"
                    >
                        return to the homepage
                    </Link>
                    .
                </p>
                <p className="output">Good luck.</p>
            </div>
        </div>
    );
}

export { NotFoundPage };
