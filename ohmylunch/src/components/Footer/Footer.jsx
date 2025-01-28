import './Footer.scss'
import facebookIcon from '../../assets/svg/facebook.svg';
import instagramIcon from '../../assets/svg/instagram.svg';
import mailIcon from '../../assets/svg/mail.svg';
import tripadvisorIcon from '../../assets/svg/tripadvisor.svg';

import { Link } from "react-router-dom";

const Footer = () => {

    return (
        <footer>
            <h1 className='nameLogoFooter'>ohmylunch</h1>
            <div className='containerHoraires'>
                <p className='titleHoraires'>Horaires</p>
                <p className='horaires'>Lundi : 12h00 - 15h00 / 19h00 - 22h00</p>
                <p className='horaires'>Mardi :12h00 - 15h00 / 19h00 - 22h00</p>
                <p className='horaires'>Mercredi : 12h00 - 15h00</p>
                <p className='horaires'>Jeudi : 12h00 - 15h00 / 19h00 - 22h00</p>
                <p className='horaires'>Vendredi : 12h00 - 15h00 / 19h00 - 22h00</p>
                <p className='horaires'>Samedi : 12h00 - 15h00 / 19h00 - 22h00</p>
                <p className='horaires'>Dimanche : Fermé</p>
            </div>
            <div className='containerAdresse'>
                <Link to="https://www.linkedin.com/in/julien-hermain/">
                    <p className='titleAdresse'>Adresse</p>
                    <p className='adresse'>528 Place du Château</p>
                    <p className='adresse'>59500 DOUAI</p>
                </Link>
            </div>
            <div className='containerContact'>
                <Link to="https://www.linkedin.com/in/julien-hermain/">
                    <img src={facebookIcon} alt="Facebook" />
                </Link>
                <Link to="https://www.linkedin.com/in/julien-hermain/">
                    <img src={instagramIcon} alt="Instagram" />
                </Link>
                <Link to="https://www.linkedin.com/in/julien-hermain/">
                    <img src={mailIcon} alt="Mail" />
                </Link>
                <Link to="https://www.linkedin.com/in/julien-hermain/">
                    <img src={tripadvisorIcon} alt="Tripadvisor" />
                </Link>
            </div>
            <div className='containerCopyright'>
                <p className='copyright'>Copyright © 2025 ohmylunch</p>
                <Link to="https://www.linkedin.com/in/julien-hermain/">
                    <p className='copyright'>Site web créé par Julien Hermain</p>
                </Link>
                <p className='copyright'>Mentions légales</p>
            </div>            
        </footer>
    )
}

export default Footer