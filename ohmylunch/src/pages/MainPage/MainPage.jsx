import ContainerCity from '../../components/ContainerCity/ContainerCity'
import Fonctionnement from '../../components/Fonctionnement/Fonctionnement'
import LaCarte from '../../components/LaCarte/LaCarte'
import NavBar from '../../components/NavBar/NavBar'
import './MainPage.scss'

import listeIcon from '../../assets/svg/liste.svg';
import portableIcon from '../../assets/svg/portable.svg';
import shopIcon from '../../assets/svg/shop.svg';

const MainPage = () => {

    return (
        <div>
            <ContainerCity />
            <NavBar />
            <Fonctionnement 
                icon1={listeIcon} 
                icon2={portableIcon} 
                icon3={shopIcon} 
                text1={"Composez votre menu"} 
                text2={"Présenter la liste au serveur"} 
                text3={"Dégustez au restaurant"} />
            <LaCarte />
        </div>
    )
}

export default MainPage