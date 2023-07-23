import "./Header.scss";
import { Link } from "react-router-dom";

import whiteCat from "../../images/white_cat.png";

function Header() {
    return (
        <header className="header">
            <Link to={"/"}>
                <img className="header__logo" src={whiteCat} alt="kitty"></img>
            </Link>
            <nav className="header__nav">
                <Link to={"/"} className="header__link">
                    Home
                </Link>
                <Link to={"/game"} className="header__link">
                    Game
                </Link>
            </nav>
        </header>
    );
}

export { Header };
