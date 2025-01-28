import './NavBar.scss'

import { Link } from "react-router-dom";

const NavBar = () => {

    return (
        <div className='navBar'>
            <p className='navBarTitle'>Réservez le menu qui vous convient</p>
            <p className='navBarText'>Faciliter la commande avec votre liste d’envie</p>
            <Link to="/Histoire" className='buttonRestaurant'>
              <p>Le restaurant</p>
            </Link>
        </div>
    )
}

export default NavBar