import './ContainerCity.scss'
import cityIcon from '../../assets/svg/city.svg';

const ContainerCity = () => {

    return (
        <div className='containerCity'>
            <img src={cityIcon} alt="city" />
            <p>Paris, Belleville</p>
        </div>
    )
}

export default ContainerCity