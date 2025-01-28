import './Header.scss'

import arrowLeft from '../../assets/svg/arrowLeft.svg';
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const showArrow = location.pathname !== "/";

    return (
        <header>
            {showArrow && (
                <Link to="/">
                    <img src={arrowLeft} className='arrowLeft' alt='arrowLeft' />
                </Link>
            )}
            <Link to="/">
                <h1 className='nameLogo'>ohmylunch</h1>
            </Link>
            <Link to="/admin">Admin</Link>
        </header>
    )
}

export default Header