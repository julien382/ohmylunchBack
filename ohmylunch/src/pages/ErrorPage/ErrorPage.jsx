import './ErrorPage.scss'

import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className='errorPage'>
            <h1 className='errorTitle'>404</h1>
            <p className='errorMessage'>Page non trouvée</p>
            <Link to="/" className='homeLink'>
              <p className='logotexte'>{"Retour à l'accueil"}</p>
            </Link>
        </div>
    )
}

export default ErrorPage