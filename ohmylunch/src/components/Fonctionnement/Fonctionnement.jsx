import PropTypes from 'prop-types';
import './Fonctionnement.scss'

const Fonctionnement = ({icon1, icon2, icon3, text1, text2, text3}) => {

    return (
        <div className='fonctionnement'>

            <h2 className='fonctionnementTitle'>Fonctionnement</h2>

            <div className="fonctionnementCards">
                <div className="fonctionnementCard">
                    <div className="fonctionnementCardNumber">
                        <span>1</span>
                    </div>
                    <img src={icon1} alt="icon1" />
                    <p>{text1}</p>
                </div>

                <div className="fonctionnementCard">
                    <div className="fonctionnementCardNumber">
                        <span>2</span>
                    </div>
                    <img src={icon2} alt="icon2" />
                    <p>{text2}</p>
                </div>

                <div className="fonctionnementCard">
                    <div className="fonctionnementCardNumber">
                        <span>3</span>
                    </div>
                    <img src={icon3} alt="icon3" />
                    <p>{text3}</p>
                </div>


            </div>

        </div>
    )
}

Fonctionnement.propTypes = {
    icon1: PropTypes.string.isRequired,
    icon2: PropTypes.string.isRequired,
    icon3: PropTypes.string.isRequired,
    text1: PropTypes.string.isRequired,
    text2: PropTypes.string.isRequired,
    text3: PropTypes.string.isRequired,
};

export default Fonctionnement